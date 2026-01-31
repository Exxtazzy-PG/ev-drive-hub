import { Link } from 'react-router-dom';
import { 
  User, 
  Heart, 
  ShoppingBag, 
  Calendar, 
  Settings, 
  CreditCard, 
  HelpCircle, 
  LogOut,
  ChevronRight,
  Bell,
  Shield,
  Car
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';

const menuItems = [
  { icon: ShoppingBag, label: 'My Orders', href: '/profile/orders', badge: '2' },
  { icon: Calendar, label: 'Test Drive Bookings', href: '/profile/bookings' },
  { icon: Heart, label: 'Favorites', href: '/profile/favorites', badge: '4' },
  { icon: Car, label: 'My Vehicles', href: '/profile/vehicles' },
  { icon: CreditCard, label: 'Payment Methods', href: '/profile/payments' },
];

const settingsItems = [
  { icon: Bell, label: 'Notifications', href: '/profile/notifications' },
  { icon: Shield, label: 'Privacy & Security', href: '/profile/privacy' },
  { icon: Settings, label: 'App Settings', href: '/profile/settings' },
  { icon: HelpCircle, label: 'Help & Support', href: '/profile/help' },
];

export default function Profile() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-brand">
        <div className="container py-8 md:py-12">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white/30">
              <User className="w-10 h-10 text-white" />
            </div>
            <div className="text-white">
              <h1 className="font-display font-bold text-2xl">Alex Johnson</h1>
              <p className="text-white/80 text-sm">alex.johnson@email.com</p>
              <Link to="/profile/edit">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-2 bg-white/10 border-white/30 text-white hover:bg-white/20"
                >
                  Edit Profile
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-6 space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="card-premium p-4 text-center">
            <p className="text-2xl font-bold text-primary">2</p>
            <p className="text-xs text-muted-foreground">Orders</p>
          </div>
          <div className="card-premium p-4 text-center">
            <p className="text-2xl font-bold text-accent">4</p>
            <p className="text-xs text-muted-foreground">Favorites</p>
          </div>
          <div className="card-premium p-4 text-center">
            <p className="text-2xl font-bold text-foreground">1</p>
            <p className="text-xs text-muted-foreground">Test Drives</p>
          </div>
        </div>

        {/* Menu Items */}
        <div className="card-premium divide-y divide-border">
          {menuItems.map((item) => (
            <Link 
              key={item.href}
              to={item.href}
              className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-foreground" />
                </div>
                <span className="font-medium">{item.label}</span>
              </div>
              <div className="flex items-center gap-2">
                {item.badge && (
                  <span className="px-2 py-0.5 bg-primary text-primary-foreground text-xs rounded-full">
                    {item.badge}
                  </span>
                )}
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </div>
            </Link>
          ))}
        </div>

        {/* Settings */}
        <div>
          <h2 className="font-semibold mb-3 text-sm text-muted-foreground uppercase tracking-wider">
            Settings
          </h2>
          <div className="card-premium divide-y divide-border">
            {settingsItems.map((item) => (
              <Link 
                key={item.href}
                to={item.href}
                className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <item.icon className="w-5 h-5 text-muted-foreground" />
                  <span>{item.label}</span>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </Link>
            ))}
          </div>
        </div>

        {/* Preferences */}
        <div className="card-premium p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Push Notifications</p>
              <p className="text-sm text-muted-foreground">Receive updates about orders</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Email Updates</p>
              <p className="text-sm text-muted-foreground">Promotions and new arrivals</p>
            </div>
            <Switch />
          </div>
        </div>

        {/* Logout */}
        <Button variant="outline" className="w-full text-destructive hover:text-destructive hover:bg-destructive/10">
          <LogOut className="w-4 h-4 mr-2" />
          Log Out
        </Button>

        {/* App Version */}
        <p className="text-center text-xs text-muted-foreground">
          EV Cars v1.0.0
        </p>
      </div>
    </div>
  );
}
