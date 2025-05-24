import { Check } from 'lucide-react';
import { cn } from '../utils/cn';

interface SubscriptionCardProps {
  tier: 'basic' | 'pro' | 'premium';
  price: number;
  cryptoCount: number;
  isActive?: boolean;
  onSubscribe: () => void;
}

export function SubscriptionCard({
  tier,
  price,
  cryptoCount,
  isActive = false,
  onSubscribe
}: SubscriptionCardProps) {
  return (
    <div 
      className={cn(
        "card p-6 hover:transform hover:-translate-y-1 transition-all duration-300",
        isActive && "border-accent"
      )}
    >
      <div className="mb-4">
        <h3 className={cn(
          "text-xl font-bold mb-1",
          tier === 'basic' ? "text-white" : 
          tier === 'pro' ? "text-accent" : 
          "text-profit"
        )}>
          {tier === 'basic' ? 'Basic' : tier === 'pro' ? 'Pro' : 'Premium'} Plan
        </h3>
        <div className="flex items-baseline">
          <span className="text-3xl font-bold">${price}</span>
          <span className="text-gray-400 ml-1">/month</span>
        </div>
      </div>
      
      <div className="border-t border-border my-4 pt-4">
        <ul className="space-y-3">
          <li className="flex items-start">
            <div className="mr-3 mt-0.5">
              <Check size={16} className="text-accent" />
            </div>
            <span>
              <span className="font-medium">{cryptoCount} cryptocurrencies</span>
              <span className="text-gray-400 block text-sm">
                Access to {tier === 'basic' ? 'major' : tier === 'pro' ? 'popular' : 'all'} crypto signals
              </span>
            </span>
          </li>
          
          <li className="flex items-start">
            <div className="mr-3 mt-0.5">
              <Check size={16} className="text-accent" />
            </div>
            <span>
              <span className="font-medium">Priority real-time updates</span>
              <span className="text-gray-400 block text-sm">
                Get signals as soon as they're generated
              </span>
            </span>
          </li>
          
          <li className="flex items-start">
            <div className="mr-3 mt-0.5">
              <Check size={16} className="text-accent" />
            </div>
            <span>
              <span className="font-medium">Priority alerts</span>
              <span className="text-gray-400 block text-sm">
                Never miss an important signal
              </span>
            </span>
          </li>
          
          <li className="flex items-start">
            <div className="mr-3 mt-0.5">
              <Check size={16} className="text-accent" />
            </div>
            <span>
              <span className="font-medium">24/7 support</span>
              <span className="text-gray-400 block text-sm">
                Help whenever you need it
              </span>
            </span>
          </li>
        </ul>
      </div>
      
      <button 
        onClick={onSubscribe}
        className={cn(
          "btn w-full",
          isActive 
            ? "bg-hover text-white border border-accent" 
            : "btn-primary"
        )}
      >
        {isActive ? 'Current Plan' : 'Subscribe'}
      </button>
    </div>
  );
}
