import { useState } from 'react';
import { Bell, Volume2, VolumeX } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import { useNotificationStore } from '../stores/notificationStore';

export function Settings() {
  const { user } = useAuthStore();
  const { settings, updateSettings } = useNotificationStore();
  const [email, setEmail] = useState(user?.email || '');
  
  const handleSoundToggle = () => {
    updateSettings({ ...settings, soundEnabled: !settings.soundEnabled });
    
    // Play a test sound if enabling
    if (!settings.soundEnabled) {
      const sound = document.getElementById('notification-sound') as HTMLAudioElement;
      if (sound) {
        sound.play().catch(e => console.error('Error playing sound:', e));
      }
    }
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Settings</h1>
      </div>
      
      <div className="space-y-6">
        {/* Profile Settings */}
        <div className="card p-6">
          <h2 className="text-xl font-bold mb-4">Profile Settings</h2>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input w-full max-w-md"
                disabled
              />
              <p className="text-xs text-gray-400 mt-1">
                Your email address cannot be changed. Contact support for assistance.
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Subscription Plan
              </label>
              <div className="flex items-center">
                <span className="text-white">
                  {user?.subscriptionTier.charAt(0).toUpperCase() + user?.subscriptionTier.slice(1)} Plan
                </span>
                <span className="ml-2 badge badge-neutral">
                  {user?.subscriptionTier === 'basic' ? '3' : user?.subscriptionTier === 'pro' ? '5' : '8+'} pairs
                </span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Notification Settings */}
        <div className="card p-6">
          <h2 className="text-xl font-bold mb-4">Notification Settings</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Bell className="h-5 w-5 text-accent mr-3" />
                <div>
                  <p className="font-medium">Browser Notifications</p>
                  <p className="text-sm text-gray-400">
                    Receive notifications when new signals arrive
                  </p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={settings.browserNotificationsEnabled}
                  onChange={() => updateSettings({
                    ...settings,
                    browserNotificationsEnabled: !settings.browserNotificationsEnabled
                  })}
                />
                <div className="w-11 h-6 bg-hover peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-border after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {settings.soundEnabled ? (
                  <Volume2 className="h-5 w-5 text-accent mr-3" />
                ) : (
                  <VolumeX className="h-5 w-5 text-gray-400 mr-3" />
                )}
                <div>
                  <p className="font-medium">Sound Alerts</p>
                  <p className="text-sm text-gray-400">
                    Play a sound when new signals arrive
                  </p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={settings.soundEnabled}
                  onChange={handleSoundToggle}
                />
                <div className="w-11 h-6 bg-hover peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-border after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
              </label>
            </div>
          </div>
        </div>
        
        {/* Webhook Integration */}
        <div className="card p-6">
          <h2 className="text-xl font-bold mb-4">Webhook Integration</h2>
          
          <p className="text-sm text-gray-400 mb-4">
            Use this webhook URL to send signals from TradingView to your account.
            Copy this URL and add it to your TradingView alerts.
          </p>
          
          <div className="bg-background p-3 rounded border border-border mb-4 overflow-hidden">
            <code className="text-accent text-sm break-all font-mono">
              https://yourdomain.com/api/webhook/tradingview/{'{your-api-key}'}
            </code>
          </div>
          
          <div className="bg-card border border-border rounded-lg p-4">
            <h3 className="font-medium mb-2">TradingView Alert Format</h3>
            <pre className="bg-background p-3 rounded text-sm font-mono overflow-x-auto">
{`{
  "msg": "SINAL {{ticker}}",
  "signal": "{{strategy.order.action}}, ALVO:{{strategy.order.price_limit}},STOPLOSS:{{strategy.order.stop_price}}",
  "price": {{close}},
  "symbol": "{{ticker}}"
}`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
