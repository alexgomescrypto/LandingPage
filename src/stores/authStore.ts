import { create } from 'zustand';

export interface User {
  id: string;
  email: string;
  subscriptionTier: 'basic' | 'pro' | 'premium';
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  initialized: boolean;
  
  initAuth: () => void;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateSubscription: (tier: 'basic' | 'pro' | 'premium') => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  initialized: false,
  
  // Initialize auth state from localStorage
  initAuth: () => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      set({ user, isAuthenticated: true, initialized: true });
    } else {
      set({ initialized: true });
    }
  },
  
  // Mock login function
  login: async (email: string, password: string) => {
    // Simulate API call
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        // Demo authentication - would normally validate against a backend
        if (email && password.length >= 6) {
          const user: User = {
            id: `user_${Math.random().toString(36).substring(2, 9)}`,
            email,
            subscriptionTier: 'basic',
          };
          
          localStorage.setItem('user', JSON.stringify(user));
          set({ user, isAuthenticated: true });
          resolve();
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 1000);
    });
  },
  
  // Mock register function
  register: async (email: string, password: string) => {
    // Simulate API call
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        // Demo registration - would normally send to a backend
        if (email && password.length >= 6) {
          const user: User = {
            id: `user_${Math.random().toString(36).substring(2, 9)}`,
            email,
            subscriptionTier: 'basic',
          };
          
          localStorage.setItem('user', JSON.stringify(user));
          set({ user, isAuthenticated: true });
          resolve();
        } else {
          reject(new Error('Invalid details'));
        }
      }, 1000);
    });
  },
  
  // Logout
  logout: () => {
    localStorage.removeItem('user');
    set({ user: null, isAuthenticated: false });
  },
  
  // Update subscription
  updateSubscription: (tier) => {
    set((state) => {
      if (!state.user) return state;
      
      const updatedUser = {
        ...state.user,
        subscriptionTier: tier,
      };
      
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      return {
        user: updatedUser,
      };
    });
  },
}));
