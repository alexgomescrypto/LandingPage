export interface Signal {
  id: string;
  symbol: string;
  action: 'BUY' | 'SELL' | 'CLOSE';
  entryPrice: number;
  targetPrice: number;
  stopLossPrice: number;
  entryTime: string;
  closeTime: string | null;
  closePrice: number | null;
}
