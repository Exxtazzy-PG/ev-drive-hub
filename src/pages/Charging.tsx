import { useState } from 'react';
import { Search, MapPin, Filter, Zap, Star, Clock, Navigation } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ChargingStationCard } from '@/components/charging/ChargingStationCard';
import { chargingStations, connectorTypes } from '@/data/charging';
import { cn } from '@/lib/utils';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

export default function Charging() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedConnectors, setSelectedConnectors] = useState<string[]>([]);
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);
  const [view, setView] = useState<'list' | 'map'>('list');

  const filteredStations = chargingStations.filter(station => {
    const matchesSearch = station.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      station.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesConnector = selectedConnectors.length === 0 || 
      station.connectorTypes.some(c => selectedConnectors.includes(c));
    const matchesAvailability = !showAvailableOnly || station.availableSlots > 0;
    
    return matchesSearch && matchesConnector && matchesAvailability;
  });

  const toggleConnector = (connector: string) => {
    setSelectedConnectors(prev => 
      prev.includes(connector) ? prev.filter(c => c !== connector) : [...prev, connector]
    );
  };

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Connector Types */}
      <div>
        <h3 className="font-semibold mb-3">Connector Type</h3>
        <div className="space-y-2">
          {connectorTypes.map((type) => (
            <label key={type} className="flex items-center gap-3 cursor-pointer">
              <Checkbox 
                checked={selectedConnectors.includes(type)}
                onCheckedChange={() => toggleConnector(type)}
              />
              <span className="text-sm">{type}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Availability */}
      <div>
        <h3 className="font-semibold mb-3">Availability</h3>
        <label className="flex items-center gap-3 cursor-pointer">
          <Checkbox 
            checked={showAvailableOnly}
            onCheckedChange={() => setShowAvailableOnly(!showAvailableOnly)}
          />
          <span className="text-sm">Show available only</span>
        </label>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-lg border-b border-border md:hidden">
        <div className="px-4 py-3">
          <h1 className="font-display font-bold text-xl">Charging Stations</h1>
        </div>
        <div className="px-4 pb-3 flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search stations..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="shrink-0">
                <Filter className="w-4 h-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
              </SheetHeader>
              <div className="mt-6">
                <FilterContent />
              </div>
            </SheetContent>
          </Sheet>
        </div>
        
        {/* View Toggle */}
        <div className="px-4 pb-3 flex gap-2">
          <Button
            variant={view === 'list' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setView('list')}
            className="flex-1"
          >
            List View
          </Button>
          <Button
            variant={view === 'map' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setView('map')}
            className="flex-1"
          >
            Map View
          </Button>
        </div>
      </div>

      <div className="container py-6">
        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden md:block w-64 shrink-0">
            <div className="sticky top-24">
              <h2 className="font-display font-semibold text-lg mb-6">Filters</h2>
              <FilterContent />
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Desktop Search & View Toggle */}
            <div className="hidden md:flex items-center justify-between mb-6">
              <div className="relative w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  placeholder="Search stations..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant={view === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setView('list')}
                >
                  List View
                </Button>
                <Button
                  variant={view === 'map' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setView('map')}
                >
                  Map View
                </Button>
              </div>
            </div>

            {view === 'map' ? (
              /* Map View */
              <div className="map-container h-[60vh] md:h-[70vh] relative bg-gradient-to-br from-accent/10 to-muted">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <Navigation className="w-16 h-16 text-accent mx-auto" />
                    <div>
                      <h3 className="font-semibold">Interactive Map</h3>
                      <p className="text-sm text-muted-foreground">
                        Find charging stations near you
                      </p>
                    </div>
                    <Button className="btn-accent">
                      <MapPin className="w-4 h-4 mr-2" />
                      Use My Location
                    </Button>
                  </div>
                </div>
                
                {/* Station Markers */}
                {filteredStations.map((station, i) => (
                  <div
                    key={station.id}
                    className="absolute"
                    style={{
                      top: `${20 + (i * 15)}%`,
                      left: `${15 + (i * 20)}%`,
                    }}
                  >
                    <div className={cn(
                      'w-8 h-8 rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-transform',
                      station.availableSlots > 0 ? 'bg-accent' : 'bg-muted-foreground'
                    )}>
                      <Zap className="w-4 h-4 text-white" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* List View */
              <>
                <p className="text-sm text-muted-foreground mb-4">
                  {filteredStations.length} stations found
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredStations.map((station) => (
                    <ChargingStationCard key={station.id} station={station} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
