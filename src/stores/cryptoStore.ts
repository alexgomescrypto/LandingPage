import { create } from 'zustand';

interface CryptoState {
  prices: Record<string, number>;
  isLoading: boolean;
  
  fetchPrices: (symbols: string[]) => Promise<void>;
}

export const useCryptoStore = create<CryptoState>((set) => ({
  prices: {},
  isLoading: false,
  
  // Fetch prices from CoinGecko API
  fetchPrices: async (symbols) => {
    if (symbols.length === 0) return;
    
    set({ isLoading: true });
    
    try {
      // Use CoinGecko API to get current prices
      // For demo purposes, we'll generate mock data
      const mockPrices: Record<string, number> = {};
      
      // Add some sample prices
      const basePrices: Record<string, number> = {
        BTCUSDT: 60342.12,
        ETHUSDT: 3312.54,
        SOLUSDT: 169.87,
        ARBUSDT: 0.3123,
        DOGEUSDT: 0.1489,
        AVAXUSDT: 35.23,
        BNBUSDT: 592.76,
        ADAUSDT: 0.54,
        LINKUSDT: 16.78,
        DOTUSDT: 7.89,
      };
      
      symbols.forEach(symbol => {
        const basePrice = basePrices[symbol] || 10 + Math.random() * 100;
        
        // Add a small random variation to simulate price movement
        const variation = basePrice * (Math.random() * 0.02 - 0.01); // +/- 1%
        mockPrices[symbol] = basePrice + variation;
      });
      
      set({ prices: mockPrices, isLoading: false });
    } catch (error) {
      console.error('Error fetching prices:', error);
      set({ isLoading: false });
    }
  },
}));
