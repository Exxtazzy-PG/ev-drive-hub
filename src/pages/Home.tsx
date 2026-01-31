import { Link } from 'react-router-dom';
import { Search, Bell, Car, Zap, ShoppingBag, Scale, MapPin, ChevronRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CategoryIcon } from '@/components/ui/CategoryIcon';
import { CarCard } from '@/components/cars/CarCard';
import { ChargingStationCard } from '@/components/charging/ChargingStationCard';
import { cars } from '@/data/cars';
import { chargingStations } from '@/data/charging';
import ev6Red from '@/assets/cars/ev6-red.jpg';

const categories = [
  { icon: Car, label: 'Cars', href: '/cars', color: '#DC2626' },
  { icon: Zap, label: 'Charging Stations', href: '/charging', color: '#14B8A6' },
  { icon: ShoppingBag, label: 'Accessories', href: '/marketplace', color: '#F59E0B' },
  { icon: Scale, label: 'Compare', href: '/compare', color: '#8B5CF6' },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-lg border-b border-border md:hidden">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-gradient-brand rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm font-display">EV</span>
            </div>
            <span className="font-display font-bold text-lg">EV Cars</span>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/search">
              <Button variant="ghost" size="icon">
                <Search className="w-5 h-5" />
              </Button>
            </Link>
            <Button variant="ghost" size="icon">
              <Bell className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="pb-6">
        {/* Hero Banner */}
        <section className="relative bg-gradient-to-br from-brand-dark via-brand-charcoal to-brand-dark overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(220,38,38,0.15),transparent_50%)]" />
          <div className="container py-6 md:py-12">
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12">
              <div className="flex-1 text-center md:text-left z-10">
                <span className="inline-block badge-new mb-3">NEW LAUNCH</span>
                <h1 className="text-3xl md:text-5xl font-display font-bold text-white leading-tight">
                  KIA EV6
                </h1>
                <p className="text-white/70 mt-3 text-sm md:text-base max-w-md">
                  Experience the future of electric mobility. 528 km range, 18-minute fast charging, and stunning design.
                </p>
                <div className="flex flex-col sm:flex-row items-center gap-3 mt-6 justify-center md:justify-start">
                  <Link to="/cars/kia-ev6">
                    <Button className="btn-primary">
                      Explore Now
                    </Button>
                  </Link>
                  <Link to="/cars/kia-ev6">
                    <Button className="btn-outline-light">
                      Book Test Drive
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex-1 relative">
                <div className="absolute inset-0 bg-gradient-radial from-primary/20 to-transparent blur-3xl" />
                <img 
                  src={ev6Red}
                  alt="KIA EV6"
                  className="relative z-10 w-full max-w-lg mx-auto drop-shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Search Bar - Mobile Only */}
        <section className="px-4 -mt-5 relative z-20 md:hidden">
          <Link to="/search" className="block">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input 
                placeholder="Search cars, stations..." 
                className="pl-12 h-12 bg-card shadow-lg border-0 rounded-xl"
                readOnly
              />
            </div>
          </Link>
        </section>

        {/* Explore Categories */}
        <section className="container mt-8">
          <h2 className="text-lg font-display font-semibold mb-4">Explore</h2>
          <div className="grid grid-cols-4 gap-3">
            {categories.map((cat) => (
              <CategoryIcon
                key={cat.href}
                icon={cat.icon}
                label={cat.label}
                href={cat.href}
                color={cat.color}
              />
            ))}
          </div>
        </section>

        {/* Nearby Charging Stations */}
        <section className="container mt-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-display font-semibold">Nearby Charging</h2>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>{chargingStations[0].availableSlots} stations nearby</span>
              </p>
            </div>
            <Link to="/charging" className="text-primary text-sm font-medium flex items-center gap-1">
              View all <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          
          {/* Mini Map Preview */}
          <div className="map-container h-32 mb-4 relative bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center">
            <div className="absolute inset-0 opacity-20">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <path d="M10 50 Q 30 20, 50 50 T 90 50" stroke="currentColor" fill="none" strokeWidth="0.5" className="text-accent" />
                <path d="M20 30 L 80 30 L 80 70 L 20 70 Z" stroke="currentColor" fill="none" strokeWidth="0.3" className="text-muted-foreground" />
              </svg>
            </div>
            <Link to="/charging" className="relative z-10">
              <Button variant="secondary" size="sm" className="gap-2">
                <MapPin className="w-4 h-4" />
                Open Map
              </Button>
            </Link>
            {/* Station Markers */}
            <div className="absolute top-6 left-8 w-3 h-3 bg-accent rounded-full animate-pulse" />
            <div className="absolute top-12 right-12 w-3 h-3 bg-accent rounded-full" />
            <div className="absolute bottom-8 left-1/3 w-3 h-3 bg-warning rounded-full" />
          </div>

          <div className="space-y-3">
            {chargingStations.slice(0, 2).map((station) => (
              <ChargingStationCard key={station.id} station={station} compact />
            ))}
          </div>
        </section>

        {/* Featured EVs */}
        <section className="container mt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-display font-semibold">Featured EVs</h2>
            <Link to="/cars" className="text-primary text-sm font-medium flex items-center gap-1">
              View all <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {cars.slice(0, 4).map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        </section>

        {/* EV Club / Community */}
        <section className="container mt-8">
          <h2 className="text-lg font-display font-semibold mb-4">Explore EV Club</h2>
          <div className="grid grid-cols-2 gap-4">
            <Link to="/community" className="card-premium overflow-hidden group">
              <div className="aspect-video bg-gradient-to-br from-brand-dark to-brand-charcoal relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxjaXJjbGUgY3g9IjIwIiBjeT0iMjAiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIvPjwvZz48L3N2Zz4=')] opacity-50" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Sparkles className="w-12 h-12 text-primary/60 group-hover:scale-110 transition-transform" />
                </div>
              </div>
              <div className="p-3">
                <h3 className="font-semibold text-sm">The Electrifying</h3>
                <p className="text-xs text-muted-foreground">New EV Community</p>
              </div>
            </Link>
            
            <Link to="/events" className="card-premium overflow-hidden group">
              <div className="aspect-video bg-gradient-to-br from-accent/20 to-accent/5 relative overflow-hidden flex items-center justify-center">
                <span className="text-4xl font-display font-bold text-accent/40 group-hover:scale-110 transition-transform">
                  2026
                </span>
              </div>
              <div className="p-3">
                <h3 className="font-semibold text-sm">Spotlight Review</h3>
                <p className="text-xs text-muted-foreground">Latest EV News</p>
              </div>
            </Link>
          </div>
        </section>

        {/* Monthly Offers */}
        <section className="container mt-8">
          <h2 className="text-lg font-display font-semibold mb-4">January Offers</h2>
          <div className="card-premium p-0 overflow-hidden bg-gradient-to-r from-brand-dark via-brand-charcoal to-brand-dark">
            <div className="p-6 flex items-center gap-6">
              <div className="flex-1">
                <h3 className="text-white font-display font-bold text-xl">DRIVE YOUR DREAMS</h3>
                <p className="text-white/60 text-sm mt-2">
                  Get up to $5,000 off on selected EV models. Limited time offer.
                </p>
                <Link to="/cars">
                  <Button className="btn-accent mt-4">
                    Shop Now
                  </Button>
                </Link>
              </div>
              <div className="hidden sm:block w-32 h-24 relative">
                <img 
                  src={ev6Red}
                  alt="Offer"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
