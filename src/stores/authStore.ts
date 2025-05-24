import { create } from 'zustand';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  subscriptionTier: 'basic' | 'pro' | 'premium';
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  initialized: boolean;
  
  initAuth: () => void;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, phone: string, password: string) => Promise<void>;
  logout: () => void;
  updateSubscription: (tier: 'basic' | 'pro' | 'premium') => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  initialized: false,
  
  initAuth: () => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      set({ user, isAuthenticated: true, initialized: true });
    } else {
      set({ initialized: true });
    }
  },
  
  login: async (email: string, password: string) => {
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        if (email && password.length >= 6) {
          const storedUser = localStorage.getItem('user');
          if (storedUser) {
            const user = JSON.parse(storedUser);
            if (user.email === email) {
              set({ user, isAuthenticated: true });
              resolve();
              return;
            }
          }
          reject(new Error('Invalid credentials'));
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 1000);
    });
  },
  
  register: async (name: string, email: string, phone: string, password: string) => {
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        if (name && email && phone && password.length >= 6) {
          const user: User = {
            id: `user_${Math.random().toString(36).substring(2, 9)}`,
            name,
            email,
            phone,
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
  
  logout: () => {
    localStorage.removeItem('user');
    set({ user: null, isAuthenticated: false });
  },
  
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