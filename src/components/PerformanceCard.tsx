import { ArrowUpRight, ArrowDownRight, CandlestickChart } from 'lucide-react';
import { cn } from '../utils/cn';

interface PerformanceCardProps {
  symbol: string;
  totalSignals: number;
  winRate: number;
  totalProfit: number;
  averageProfitPercentage: number;
}

export function PerformanceCard({
  symbol,
  totalSignals,
  winRate,
  totalProfit,
  averageProfitPercentage
}: PerformanceCardProps) {
  const isProfit = totalProfit >= 0;
  
  return (
    <div className="card p-4 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center">
          <CandlestickChart size={20} className="text-accent mr-2" />
          <h3 className="font-bold">{symbol}</h3>
        </div>
        <div 
          className={cn(
            "badge",
            isProfit ? "badge-profit" : "badge-loss"
          )}
        >
          {isProfit ? 'Profitable' : 'Loss'}
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-2">
        <div>
          <p className="text-sm text-gray-400">Total Signals</p>
          <p className="text-lg font-medium">{totalSignals}</p>
        </div>
        
        <div>
          <p className="text-sm text-gray-400">Win Rate</p>
          <p className="text-lg font-medium">{winRate}%</p>
        </div>
      </div>
      
      <div className="mt-4 pt-3 border-t border-border">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-400">Total PnL</p>
            <p className={cn(
              "text-lg font-medium flex items-center",
              isProfit ? "text-profit" : "text-loss"
            )}>
              {isProfit ? (
                <>
                  <ArrowUpRight size={16} className="mr-1" />
                  +${totalProfit.toFixed(2)}
                </>
              ) : (
                <>
                  <ArrowDownRight size={16} className="mr-1" />
                  -${Math.abs(totalProfit).toFixed(2)}
                </>
              )}
            </p>
          </div>
          
          <div className="text-right">
            <p className="text-sm text-gray-400">Avg. Return</p>
            <p className={cn(
              "text-lg font-medium",
              isProfit ? "text-profit" : "text-loss"
            )}>
              {isProfit ? '+' : ''}{averageProfitPercentage.toFixed(2)}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
