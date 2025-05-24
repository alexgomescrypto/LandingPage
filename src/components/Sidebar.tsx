import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Signal, 
  CreditCard, 
  Settings, 
  LogOut, 
  TrendingUp
} from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import { cn } from '../utils/cn';

export function Sidebar() {
  const location = useLocation();
  const { logout } = useAuthStore();
  
  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Signals', path: '/signals', icon: Signal },
    { name: 'Subscription', path: '/subscription', icon: CreditCard },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <aside className="w-16 md:w-64 h-screen sticky top-0 bg-card border-r border-border flex flex-col transition-all">
      <div className="p-4 flex items-center justify-center md:justify-start space-x-2">
        <TrendingUp className="h-8 w-8 text-accent" />
        <span className="text-xl font-bold hidden md:block">CryptoSignals</span>
      </div>
      
      <nav className="flex-1 mt-8">
        <ul className="space-y-2 px-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            
            return (
              <li key={item.path}>
                <Link 
                  to={item.path}
                  className={cn(
                    "flex items-center p-3 rounded-md transition-colors",
                    isActive 
                      ? "bg-hover text-white" 
                      : "text-gray-300 hover:bg-hover hover:text-white"
                  )}
                >
                  <Icon className="h-5 w-5 min-w-5" />
                  <span className="ml-4 hidden md:block">{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-border">
        <button 
          onClick={logout}
          className="flex items-center p-3 w-full rounded-md text-gray-300 hover:bg-hover hover:text-white transition-colors"
        >
          <LogOut className="h-5 w-5 min-w-5" />
          <span className="ml-4 hidden md:block">Log Out</span>
        </button>
      </div>
    </aside>
  );
}
