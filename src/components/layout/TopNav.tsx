import { NavLink, useLocation } from 'react-router-dom';
import { Search, Heart, Bell, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/cars', label: 'Cars' },
  { path: '/charging', label: 'Charging Stations' },
  { path: '/marketplace', label: 'Marketplace' },
];

export function TopNav() {
  const location = useLocation();

  return (
    <header className="top-nav hidden md:block">
      <div className="container flex items-center justify-between gap-8">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2 shrink-0">
          <div className="w-10 h-10 bg-gradient-brand rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg font-display">EV</span>
          </div>
          <span className="font-display font-bold text-xl text-foreground">EV Cars</span>
        </NavLink>

        {/* Navigation Links */}
        <nav className="flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || 
              (item.path !== '/' && location.pathname.startsWith(item.path));
            
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                  isActive 
                    ? 'bg-primary/10 text-primary' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                )}
              >
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        {/* Search Bar */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search cars, stations, products..." 
              className="pl-10 bg-muted/50 border-transparent focus:border-primary"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
            <Heart className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
            <Bell className="w-5 h-5" />
          </Button>
          <NavLink to="/profile">
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
              <User className="w-5 h-5" />
            </Button>
          </NavLink>
        </div>
      </div>
    </header>
  );
}
