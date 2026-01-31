import { NavLink, useLocation } from 'react-router-dom';
import { Home, Car, Zap, ShoppingBag, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/cars', label: 'Cars', icon: Car },
  { path: '/charging', label: 'Charging', icon: Zap },
  { path: '/marketplace', label: 'Market', icon: ShoppingBag },
  { path: '/profile', label: 'Profile', icon: User },
];

export function BottomNav() {
  const location = useLocation();

  return (
    <nav className="bottom-nav md:hidden z-50">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path || 
          (item.path !== '/' && location.pathname.startsWith(item.path));
        
        return (
          <NavLink
            key={item.path}
            to={item.path}
            className={cn(
              'nav-item flex-1',
              isActive && 'active'
            )}
          >
            <item.icon 
              className={cn(
                'w-6 h-6 transition-colors',
                isActive ? 'text-primary' : 'text-muted-foreground'
              )} 
            />
            <span className={cn(
              'text-[10px] font-medium',
              isActive ? 'text-primary' : 'text-muted-foreground'
            )}>
              {item.label}
            </span>
          </NavLink>
        );
      })}
    </nav>
  );
}
