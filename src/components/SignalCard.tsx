import { useState, useEffect } from 'react';
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  CheckCircle, 
  AlertCircle,
  Clock
} from 'lucide-react';
import { formatDistance } from 'date-fns';
import { Signal } from '../types';
import { cn } from '../utils/cn';

interface SignalCardProps {
  signal: Signal;
  currentPrice?: number;
  isNew?: boolean;
}

export function SignalCard({ signal, currentPrice, isNew = false }: SignalCardProps) {
  const [isHighlighted, setIsHighlighted] = useState(isNew);
  
  useEffect(() => {
    if (isNew) {
      setIsHighlighted(true);
      const timer = setTimeout(() => {
        setIsHighlighted(false);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [isNew]);

  const isOpen = !signal.closeTime;
  const isBuy = signal.action === 'BUY';
  
  // Calculate percentages
  const entryPrice = signal.entryPrice;
  const targetPrice = signal.targetPrice;
  const stopLossPrice = signal.stopLossPrice;
  
  const targetPercentage = isBuy
    ? ((targetPrice - entryPrice) / entryPrice) * 100
    : ((entryPrice - targetPrice) / entryPrice) * 100;
    
  const stopLossPercentage = isBuy
    ? ((entryPrice - stopLossPrice) / entryPrice) * 100
    : ((stopLossPrice - entryPrice) / entryPrice) * 100;
  
  // Calculate current profit/loss if signal is open and we have current price
  let currentProfitLoss = 0;
  let currentProfitLossPercentage = 0;
  
  if (isOpen && currentPrice) {
    currentProfitLoss = isBuy 
      ? currentPrice - entryPrice 
      : entryPrice - currentPrice;
    
    currentProfitLossPercentage = (currentProfitLoss / entryPrice) * 100;
  }
  
  // Calculate final profit/loss if signal is closed
  let finalProfitLoss = 0;
  let finalProfitLossPercentage = 0;
  
  if (!isOpen && signal.closePrice) {
    finalProfitLoss = isBuy 
      ? signal.closePrice - entryPrice 
      : entryPrice - signal.closePrice;
    
    finalProfitLossPercentage = (finalProfitLoss / entryPrice) * 100;
  }
  
  return (
    <div 
      className={cn(
        "card p-4 transition-all duration-300",
        isHighlighted && "animate-pulse-once border-accent",
        isOpen ? "border-l-4 border-l-accent" : finalProfitLossPercentage >= 0 
          ? "border-l-4 border-l-profit" 
          : "border-l-4 border-l-loss"
      )}
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center">
          <h3 className="text-lg font-bold">{signal.symbol}</h3>
          <span 
            className={cn(
              "ml-2 badge",
              isBuy ? "badge-profit" : "badge-loss"
            )}
          >
            {isBuy ? 'LONG' : 'SHORT'}
          </span>
        </div>
        <div 
          className={cn(
            "flex items-center",
            isOpen ? "text-accent" : finalProfitLossPercentage >= 0 
              ? "text-profit" 
              : "text-loss"
          )}
        >
          {isOpen ? (
            <>
              <Clock size={16} className="mr-1" />
              <span className="text-sm font-medium">Active</span>
            </>
          ) : finalProfitLossPercentage >= 0 ? (
            <>
              <CheckCircle size={16} className="mr-1" />
              <span className="text-sm font-medium">Profit</span>
            </>
          ) : (
            <>
              <AlertCircle size={16} className="mr-1" />
              <span className="text-sm font-medium">Loss</span>
            </>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-2 mb-3">
        <div className="flex flex-col">
          <span className="text-xs text-gray-400">Entry</span>
          <span className="font-medium">${entryPrice.toFixed(4)}</span>
        </div>
        
        <div className="flex flex-col">
          <span className="text-xs text-gray-400">Time</span>
          <span className="font-medium">
            {formatDistance(new Date(signal.entryTime), new Date(), { addSuffix: true })}
          </span>
        </div>
        
        <div className="flex flex-col">
          <span className="text-xs text-gray-400">Target</span>
          <div className="flex items-center">
            <span className="font-medium">${targetPrice.toFixed(4)}</span>
            <span className="ml-2 text-xs text-profit-light">+{targetPercentage.toFixed(2)}%</span>
          </div>
        </div>
        
        <div className="flex flex-col">
          <span className="text-xs text-gray-400">Stop Loss</span>
          <div className="flex items-center">
            <span className="font-medium">${stopLossPrice.toFixed(4)}</span>
            <span className="ml-2 text-xs text-loss-light">-{stopLossPercentage.toFixed(2)}%</span>
          </div>
        </div>
      </div>
      
      {/* Show current price and PnL if open */}
      {isOpen && currentPrice ? (
        <div className="border-t border-border mt-2 pt-2">
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <span className="text-xs text-gray-400">Current</span>
              <span className="font-medium">${currentPrice.toFixed(4)}</span>
            </div>
            
            <div className="flex items-center">
              {currentProfitLossPercentage >= 0 ? (
                <div className="flex items-center text-profit">
                  <ArrowUpRight size={16} />
                  <span className="font-medium ml-1">+{currentProfitLossPercentage.toFixed(2)}%</span>
                </div>
              ) : (
                <div className="flex items-center text-loss">
                  <ArrowDownRight size={16} />
                  <span className="font-medium ml-1">{currentProfitLossPercentage.toFixed(2)}%</span>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : !isOpen && signal.closePrice ? (
        <div className="border-t border-border mt-2 pt-2">
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <span className="text-xs text-gray-400">Closed at</span>
              <span className="font-medium">${signal.closePrice.toFixed(4)}</span>
            </div>
            
            <div className="flex items-center">
              {finalProfitLossPercentage >= 0 ? (
                <div className="flex items-center text-profit">
                  <ArrowUpRight size={16} />
                  <span className="font-medium ml-1">+{finalProfitLossPercentage.toFixed(2)}%</span>
                </div>
              ) : (
                <div className="flex items-center text-loss">
                  <ArrowDownRight size={16} />
                  <span className="font-medium ml-1">{finalProfitLossPercentage.toFixed(2)}%</span>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
