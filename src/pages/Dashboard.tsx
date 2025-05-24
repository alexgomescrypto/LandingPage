import { useState, useEffect } from 'react';
import { LineChart, BarChart, ArrowUp, ArrowDown, Rocket } from 'lucide-react';
import { PerformanceCard } from '../components/PerformanceCard';
import { SignalCard } from '../components/SignalCard';
import { useSignalStore } from '../stores/signalStore';
import { useCryptoStore } from '../stores/cryptoStore';
import { useAuthStore } from '../stores/authStore';

export function Dashboard() {
  const { signals } = useSignalStore();
  const { prices, fetchPrices } = useCryptoStore();
  const { user } = useAuthStore();
  
  // Get top performing cryptos
  const [topPerformers, setTopPerformers] = useState<any[]>([]);
  
  // Get latest signals
  const latestSignals = signals.slice(0, 5);
  
  // Count stats
  const openSignals = signals.filter(s => !s.closeTime).length;
  const closedSignals = signals.filter(s => s.closeTime).length;
  const profitableSignals = signals.filter(s => 
    s.closeTime && s.closePrice && 
    ((s.action === 'BUY' && s.closePrice > s.entryPrice) || 
     (s.action === 'SELL' && s.closePrice < s.entryPrice))
  ).length;
  
  const winRate = closedSignals > 0 
    ? Math.round((profitableSignals / closedSignals) * 100) 
    : 0;
  
  useEffect(() => {
    // Calculate performance metrics for each symbol
    const symbolPerformance: Record<string, any> = {};
    
    signals.forEach(signal => {
      if (!signal.closeTime || !signal.closePrice) return;
      
      const { symbol, entryPrice, closePrice, action } = signal;
      
      if (!symbolPerformance[symbol]) {
        symbolPerformance[symbol] = {
          symbol,
          totalSignals: 0,
          wins: 0,
          totalProfit: 0,
        };
      }
      
      symbolPerformance[symbol].totalSignals += 1;
      
      const isProfit = action === 'BUY' 
        ? closePrice > entryPrice 
        : closePrice < entryPrice;
        
      if (isProfit) {
        symbolPerformance[symbol].wins += 1;
      }
      
      const profitAmount = action === 'BUY'
        ? closePrice - entryPrice
        : entryPrice - closePrice;
        
      symbolPerformance[symbol].totalProfit += profitAmount;
    });
    
    // Convert to array and calculate derived metrics
    const performanceArray = Object.values(symbolPerformance).map((perf: any) => ({
      ...perf,
      winRate: perf.totalSignals > 0 
        ? Math.round((perf.wins / perf.totalSignals) * 100) 
        : 0,
      averageProfitPercentage: perf.totalSignals > 0 
        ? (perf.totalProfit / perf.totalSignals) * 100 
        : 0
    }));
    
    // Sort by total profit and take top 10
    const sorted = performanceArray.sort((a, b) => b.totalProfit - a.totalProfit).slice(0, 10);
    setTopPerformers(sorted);
    
    // Fetch prices for all symbols
    const symbols = [...new Set(signals.map(s => s.symbol))];
    fetchPrices(symbols);
    
    // Set up interval to refresh prices
    const interval = setInterval(() => {
      fetchPrices(symbols);
    }, 60000); // Every minute
    
    return () => clearInterval(interval);
  }, [signals, fetchPrices]);
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        
        <div className="flex items-center space-x-2">
          <div className="text-sm text-gray-400">
            <span className="font-medium text-white">{user?.subscriptionTier.charAt(0).toUpperCase() + user?.subscriptionTier.slice(1)}</span> Plan
          </div>
          <div className="bg-accent px-3 py-1 rounded text-sm font-medium">
            {user?.subscriptionTier === 'basic' ? '3' : user?.subscriptionTier === 'pro' ? '5' : '8+'} Pairs
          </div>
        </div>
      </div>
      
      {/* Stats overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Open Signals</p>
              <p className="text-2xl font-bold">{openSignals}</p>
            </div>
            <div className="p-3 bg-accent/10 rounded-full">
              <LineChart className="h-6 w-6 text-accent" />
            </div>
          </div>
        </div>
        
        <div className="card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Closed Signals</p>
              <p className="text-2xl font-bold">{closedSignals}</p>
            </div>
            <div className="p-3 bg-accent/10 rounded-full">
              <BarChart className="h-6 w-6 text-accent" />
            </div>
          </div>
        </div>
        
        <div className="card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Win Rate</p>
              <p className="text-2xl font-bold">{winRate}%</p>
            </div>
            <div className="p-3 bg-profit/10 rounded-full">
              <ArrowUp className="h-6 w-6 text-profit" />
            </div>
          </div>
        </div>
        
        <div className="card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Loss Rate</p>
              <p className="text-2xl font-bold">{closedSignals > 0 ? 100 - winRate : 0}%</p>
            </div>
            <div className="p-3 bg-loss/10 rounded-full">
              <ArrowDown className="h-6 w-6 text-loss" />
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top performing cryptos */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Top Performing Cryptocurrencies</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {topPerformers.length > 0 ? (
              topPerformers.slice(0, 4).map((performer) => (
                <PerformanceCard 
                  key={performer.symbol}
                  symbol={performer.symbol}
                  totalSignals={performer.totalSignals}
                  winRate={performer.winRate}
                  totalProfit={performer.totalProfit}
                  averageProfitPercentage={performer.averageProfitPercentage}
                />
              ))
            ) : (
              <div className="col-span-2 card p-6 flex flex-col items-center justify-center">
                <Rocket className="h-10 w-10 text-accent mb-2" />
                <p className="text-center text-gray-400">
                  No performance data yet. Start trading with our signals to see performance metrics!
                </p>
              </div>
            )}
          </div>
        </div>
        
        {/* Latest signals */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Latest Signals</h2>
          </div>
          
          <div className="space-y-4">
            {latestSignals.length > 0 ? (
              latestSignals.map((signal) => (
                <SignalCard 
                  key={signal.id}
                  signal={signal}
                  currentPrice={prices[signal.symbol]}
                />
              ))
            ) : (
              <div className="card p-6 flex flex-col items-center justify-center">
                <Rocket className="h-10 w-10 text-accent mb-2" />
                <p className="text-center text-gray-400">
                  No signals yet. Signals will appear here as they come in!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
