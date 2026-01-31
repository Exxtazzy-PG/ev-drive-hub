import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, X, Clock, Heart, Star, TrendingUp, MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CarCard } from '@/components/cars/CarCard';
import { ChargingStationCard } from '@/components/charging/ChargingStationCard';
import { cars } from '@/data/cars';
import { chargingStations } from '@/data/charging';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const recentSearches = ['Tesla Model Y', 'Charging near me', 'EV Tires', 'KIA EV6'];

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('nearby');

  const filteredCars = cars.filter(car => 
    car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    car.brand.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredStations = chargingStations.filter(station =>
    station.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    station.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const favoriteCars = cars.filter(car => car.isFavorite);

  return (
    <div className="min-h-screen bg-background">
      {/* Search Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-lg border-b border-border">
        <div className="container py-4">
          <div className="flex items-center gap-3">
            <Link to="/" className="md:hidden">
              <Button variant="ghost" size="icon">
                <X className="w-5 h-5" />
              </Button>
            </Link>
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input 
                placeholder="I am looking for..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 text-base bg-muted/50 border-0 rounded-xl"
                autoFocus
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                >
                  <X className="w-4 h-4 text-muted-foreground" />
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="container py-6">
        {searchQuery ? (
          /* Search Results */
          <div className="space-y-8">
            {/* Cars Results */}
            {filteredCars.length > 0 && (
              <section>
                <h2 className="font-semibold mb-4">Cars ({filteredCars.length})</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredCars.map((car) => (
                    <CarCard key={car.id} car={car} />
                  ))}
                </div>
              </section>
            )}

            {/* Stations Results */}
            {filteredStations.length > 0 && (
              <section>
                <h2 className="font-semibold mb-4">Charging Stations ({filteredStations.length})</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredStations.map((station) => (
                    <ChargingStationCard key={station.id} station={station} compact />
                  ))}
                </div>
              </section>
            )}

            {filteredCars.length === 0 && filteredStations.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No results found for "{searchQuery}"</p>
              </div>
            )}
          </div>
        ) : (
          /* Default Search View */
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full justify-start bg-transparent p-0 mb-6 border-b border-border rounded-none h-auto">
              <TabsTrigger 
                value="nearby"
                className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none px-4 py-3"
              >
                <MapPin className="w-4 h-4 mr-2" />
                Nearby
              </TabsTrigger>
              <TabsTrigger 
                value="recommended"
                className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none px-4 py-3"
              >
                <TrendingUp className="w-4 h-4 mr-2" />
                Recommended
              </TabsTrigger>
              <TabsTrigger 
                value="recent"
                className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none px-4 py-3"
              >
                <Clock className="w-4 h-4 mr-2" />
                Recent
              </TabsTrigger>
              <TabsTrigger 
                value="favorites"
                className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none px-4 py-3"
              >
                <Heart className="w-4 h-4 mr-2" />
                Favorites
              </TabsTrigger>
            </TabsList>

            <TabsContent value="nearby" className="mt-0">
              <section className="mb-8">
                <h3 className="font-semibold mb-4">Nearby Charging Stations</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {chargingStations.slice(0, 4).map((station) => (
                    <ChargingStationCard key={station.id} station={station} compact />
                  ))}
                </div>
              </section>
              
              <section>
                <h3 className="font-semibold mb-4">Featured Cars Near You</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {cars.slice(0, 3).map((car) => (
                    <CarCard key={car.id} car={car} />
                  ))}
                </div>
              </section>
            </TabsContent>

            <TabsContent value="recommended" className="mt-0">
              <section>
                <h3 className="font-semibold mb-4">Recommended for You</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {cars.map((car) => (
                    <CarCard key={car.id} car={car} />
                  ))}
                </div>
              </section>
            </TabsContent>

            <TabsContent value="recent" className="mt-0">
              <section className="mb-8">
                <h3 className="font-semibold mb-4">Recent Searches</h3>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((search) => (
                    <button
                      key={search}
                      onClick={() => setSearchQuery(search)}
                      className="px-4 py-2 bg-muted rounded-full text-sm hover:bg-muted/80 transition-colors flex items-center gap-2"
                    >
                      <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                      {search}
                    </button>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="font-semibold mb-4">Recently Viewed</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {cars.slice(0, 2).map((car) => (
                    <CarCard key={car.id} car={car} />
                  ))}
                </div>
              </section>
            </TabsContent>

            <TabsContent value="favorites" className="mt-0">
              {favoriteCars.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {favoriteCars.map((car) => (
                    <CarCard key={car.id} car={car} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Heart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No favorites yet</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Start adding cars to your favorites!
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
}
