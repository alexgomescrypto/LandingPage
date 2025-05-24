import { create } from 'zustand';
import { supabase } from '../lib/supabase';

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
  
  initAuth: async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
          
        if (profile) {
          set({
            user: {
              id: profile.id,
              name: profile.name,
              email: profile.email,
              phone: profile.phone,
              subscriptionTier: profile.subscription_tier,
            },
            isAuthenticated: true,
          });
        }
      }
    } catch (error) {
      console.error('Error initializing auth:', error);
    } finally {
      set({ initialized: true });
    }
  },
  
  login: async (email: string, password: string) => {
    const { data: { user }, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) throw error;
    
    if (user) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
        
      if (profile) {
        set({
          user: {
            id: profile.id,
            name: profile.name,
            email: profile.email,
            phone: profile.phone,
            subscriptionTier: profile.subscription_tier,
          },
          isAuthenticated: true,
        });
      }
    }
  },
  
  register: async (name: string, email: string, phone: string, password: string) => {
    const { data: { user }, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });
    
    if (signUpError) throw signUpError;
    
    if (user) {
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([
          {
            id: user.id,
            name,
            email,
            phone,
            subscription_tier: 'basic',
          }
        ]);
        
      if (profileError) throw profileError;
      
      set({
        user: {
          id: user.id,
          name,
          email,
          phone,
          subscriptionTier: 'basic',
        },
        isAuthenticated: true,
      });
    }
  },
  
  logout: async () => {
    await supabase.auth.signOut();
    set({ user: null, isAuthenticated: false });
  },
  
  updateSubscription: async (tier) => {
    const { user } = useAuthStore.getState();
    if (!user) return;
    
    const { error } = await supabase
      .from('profiles')
      .update({ subscription_tier: tier })
      .eq('id', user.id);
      
    if (error) throw error;
    
    set((state) => ({
      user: state.user ? { ...state.user, subscriptionTier: tier } : null,
    }));
  },
}));