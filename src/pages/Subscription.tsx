import { useState } from 'react';
import { CreditCard } from 'lucide-react';
import { SubscriptionCard } from '../components/SubscriptionCard';
import { useAuthStore } from '../stores/authStore';

export function Subscription() {
  const { user, updateSubscription } = useAuthStore();
  const [isProcessing, setIsProcessing] = useState(false);
  
  const handleSubscribe = (tier: 'basic' | 'pro' | 'premium') => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      updateSubscription(tier);
      setIsProcessing(false);
    }, 1500);
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Subscription Plans</h1>
      </div>
      
      <div className="bg-card rounded-lg border border-border p-6 mb-8">
        <div className="flex items-center">
          <CreditCard className="h-8 w-8 text-accent mr-4" />
          <div>
            <h2 className="text-xl font-bold">Current Plan</h2>
            <p className="text-gray-400">
              You are currently on the <span className="text-white font-medium">
                {user?.subscriptionTier.charAt(0).toUpperCase() + user?.subscriptionTier.slice(1)}
              </span> plan
            </p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SubscriptionCard
          tier="basic"
          price={29}
          cryptoCount={3}
          isActive={user?.subscriptionTier === 'basic'}
          onSubscribe={() => handleSubscribe('basic')}
        />
        
        <SubscriptionCard
          tier="pro"
          price={49}
          cryptoCount={5}
          isActive={user?.subscriptionTier === 'pro'}
          onSubscribe={() => handleSubscribe('pro')}
        />
        
        <SubscriptionCard
          tier="premium"
          price={79}
          cryptoCount={8}
          isActive={user?.subscriptionTier === 'premium'}
          onSubscribe={() => handleSubscribe('premium')}
        />
      </div>
      
      {isProcessing && (
        <div className="fixed inset-0 bg-background/80 flex items-center justify-center z-50">
          <div className="card p-8 max-w-md text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-accent border-t-transparent mx-auto mb-4"></div>
            <h3 className="text-xl font-bold mb-2">Processing Your Subscription</h3>
            <p className="text-gray-400">Please wait while we process your payment...</p>
          </div>
        </div>
      )}
    </div>
  );
}
