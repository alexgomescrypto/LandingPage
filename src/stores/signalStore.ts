import { create } from 'zustand';
import { Signal } from '../types';
import { useNotificationStore } from './notificationStore';

interface SignalState {
  signals: Signal[];
  isLoading: boolean;
  
  addSignal: (signal: Signal) => void;
  closeSignal: (symbol: string, closePrice: number) => void;
  fetchSignals: () => Promise<void>;
}

// Sample data for demo purposes
const sampleSignals: Signal[] = [
  {
    id: 'signal_1',
    symbol: 'BTCUSDT',
    action: 'BUY',
    entryPrice: 59872.34,
    targetPrice: 62000.00,
    stopLossPrice: 58500.00,
    entryTime: new Date(Date.now() - 26 * 60 * 60 * 1000).toISOString(),
    closeTime: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    closePrice: 61950.45,
  },
  {
    id: 'signal_2',
    symbol: 'ETHUSDT',
    action: 'BUY',
    entryPrice: 3245.67,
    targetPrice: 3400.00,
    stopLossPrice: 3100.00,
    entryTime: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
    closeTime: new Date(Date.now() - 42 * 60 * 60 * 1000).toISOString(),
    closePrice: 3389.78,
  },
  {
    id: 'signal_3',
    symbol: 'SOLUSDT',
    action: 'SELL',
    entryPrice: 175.45,
    targetPrice: 160.00,
    stopLossPrice: 185.00,
    entryTime: new Date(Date.now() - 35 * 60 * 60 * 1000).toISOString(),
    closeTime: new Date(Date.now() - 30 * 60 * 60 * 1000).toISOString(),
    closePrice: 182.56,
  },
  {
    id: 'signal_4',
    symbol: 'ARBUSDT',
    action: 'BUY',
    entryPrice: 0.2972,
    targetPrice: 0.3045,
    stopLossPrice: 0.2845,
    entryTime: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(),
    closeTime: null,
    closePrice: null,
  },
  {
    id: 'signal_5',
    symbol: 'DOGEUSDT',
    action: 'BUY',
    entryPrice: 0.1467,
    targetPrice: 0.1550,
    stopLossPrice: 0.1420,
    entryTime: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    closeTime: null,
    closePrice: null,
  },
  {
    id: 'signal_6',
    symbol: 'AVAXUSDT',
    action: 'BUY',
    entryPrice: 34.87,
    targetPrice: 36.50,
    stopLossPrice: 33.80,
    entryTime: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    closeTime: null,
    closePrice: null,
  },
  {
    id: 'signal_7',
    symbol: 'BNBUSDT',
    action: 'SELL',
    entryPrice: 598.43,
    targetPrice: 580.00,
    stopLossPrice: 610.00,
    entryTime: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    closeTime: null,
    closePrice: null,
  }
];

export const useSignalStore = create<SignalState>((set, get) => ({
  signals: [],
  isLoading: false,
  
  // Add a new signal
  addSignal: (signal) => {
    const notificationStore = useNotificationStore.getState();
    
    set((state) => {
      // Check if it's a close signal
      if (signal.action === 'CLOSE') {
        const updatedSignals = state.signals.map(s => {
          if (s.symbol === signal.symbol && !s.closeTime) {
            // Play notification sound
            if (notificationStore.settings.soundEnabled) {
              const sound = document.getElementById('notification-sound') as HTMLAudioElement;
              if (sound) {
                sound.play().catch(e => console.error('Error playing sound:', e));
              }
            }
            
            return {
              ...s,
              closeTime: new Date().toISOString(),
              closePrice: signal.entryPrice, // Use the current price as close price
            };
          }
          return s;
        });
        
        return { signals: updatedSignals };
      }
      
      // Check if this is a new signal or an update
      const existingSignalIndex = state.signals.findIndex(
        s => s.symbol === signal.symbol && !s.closeTime
      );
      
      if (existingSignalIndex !== -1) {
        // Update existing open signal
        const updatedSignals = [...state.signals];
        updatedSignals[existingSignalIndex] = {
          ...updatedSignals[existingSignalIndex],
          ...signal,
        };
        return { signals: updatedSignals };
      }
      
      // Play notification sound for new signals
      if (notificationStore.settings.soundEnabled) {
        const sound = document.getElementById('notification-sound') as HTMLAudioElement;
        if (sound) {
          sound.play().catch(e => console.error('Error playing sound:', e));
        }
      }
      
      // Add new signal
      return { signals: [signal, ...state.signals] };
    });
  },
  
  // Close a signal
  closeSignal: (symbol, closePrice) => {
    set((state) => {
      const updatedSignals = state.signals.map(signal => {
        if (signal.symbol === symbol && !signal.closeTime) {
          return {
            ...signal,
            closeTime: new Date().toISOString(),
            closePrice,
          };
        }
        return signal;
      });
      
      return { signals: updatedSignals };
    });
  },
  
  // Fetch signals (mock implementation)
  fetchSignals: async () => {
    set({ isLoading: true });
    
    // Simulate API call
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        set({ signals: sampleSignals, isLoading: false });
        resolve();
      }, 1000);
    });
  },
}));

// Initialize data
setTimeout(() => {
  useSignalStore.getState().fetchSignals();
}, 0);
