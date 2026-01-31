import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, MapPin, Zap, Clock, Star, Phone, Navigation, Check, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RatingStars } from '@/components/ui/RatingStars';
import { chargingStations } from '@/data/charging';
import { cn } from '@/lib/utils';

export default function ChargingDetail() {
  const { id } = useParams();
  const station = chargingStations.find(s => s.id === id) || chargingStations[0];
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);

  const availabilityColor = station.availableSlots > 2 
    ? 'text-success' 
    : station.availableSlots > 0 
      ? 'text-warning' 
      : 'text-destructive';

  return (
    <div className="min-h-screen bg-background pb-32">
      {/* Mobile Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-lg border-b border-border md:hidden">
        <div className="px-4 py-3 flex items-center">
          <Link to="/charging" className="p-2 -ml-2">
            <ChevronLeft className="w-6 h-6" />
          </Link>
          <span className="font-semibold ml-2">Station Details</span>
        </div>
      </header>

      {/* Hero Image */}
      <section className="relative">
        <div className="aspect-video md:aspect-[21/9] overflow-hidden">
          <img 
            src={station.image}
            alt={station.name}
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      <div className="container py-6 space-y-6">
        {/* Station Info */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div>
            <h1 className="font-display font-bold text-2xl md:text-3xl">{station.name}</h1>
            <div className="flex items-center gap-1 text-muted-foreground mt-2">
              <MapPin className="w-4 h-4" />
              <span>{station.address}, {station.city}</span>
            </div>
            <div className="flex items-center gap-4 mt-3">
              <RatingStars rating={station.rating} showValue />
              <span className="text-sm text-muted-foreground">•</span>
              <span className="text-sm text-muted-foreground">{station.distance} km away</span>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Phone className="w-4 h-4 mr-2" />
              Call
            </Button>
            <Button variant="outline" size="sm">
              <Navigation className="w-4 h-4 mr-2" />
              Directions
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="card-premium p-4 text-center">
            <Zap className="w-6 h-6 text-accent mx-auto mb-2" />
            <p className="font-bold text-lg">{station.power}</p>
            <p className="text-xs text-muted-foreground">Max Power</p>
          </div>
          <div className="card-premium p-4 text-center">
            <div className="text-accent text-2xl font-bold mb-1">${station.pricePerKwh}</div>
            <p className="text-xs text-muted-foreground">Per kWh</p>
          </div>
          <div className="card-premium p-4 text-center">
            <div className={cn('text-2xl font-bold mb-1', availabilityColor)}>
              {station.availableSlots}/{station.totalSlots}
            </div>
            <p className="text-xs text-muted-foreground">Available</p>
          </div>
          <div className="card-premium p-4 text-center">
            <Clock className="w-6 h-6 text-muted-foreground mx-auto mb-2" />
            <p className="font-medium text-sm">{station.hours}</p>
            <p className="text-xs text-muted-foreground">Hours</p>
          </div>
        </div>

        {/* Connector Types */}
        <div className="card-premium p-4">
          <h2 className="font-semibold mb-3">Connector Types</h2>
          <div className="flex flex-wrap gap-2">
            {station.connectorTypes.map((type) => (
              <span key={type} className="px-3 py-1.5 bg-muted rounded-full text-sm font-medium">
                {type}
              </span>
            ))}
          </div>
        </div>

        {/* Available Slots */}
        <div className="card-premium p-4">
          <h2 className="font-semibold mb-3">Select Charging Slot</h2>
          <div className="grid grid-cols-4 gap-3">
            {Array.from({ length: station.totalSlots }).map((_, i) => {
              const isAvailable = i < station.availableSlots;
              return (
                <button
                  key={i}
                  onClick={() => isAvailable && setSelectedSlot(i)}
                  disabled={!isAvailable}
                  className={cn(
                    'aspect-square rounded-xl flex flex-col items-center justify-center transition-all',
                    isAvailable 
                      ? selectedSlot === i 
                        ? 'bg-accent text-white ring-2 ring-accent ring-offset-2'
                        : 'bg-accent/10 text-accent hover:bg-accent/20'
                      : 'bg-muted text-muted-foreground cursor-not-allowed'
                  )}
                >
                  <Zap className="w-5 h-5 mb-1" />
                  <span className="text-xs font-medium">Slot {i + 1}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Amenities */}
        <div className="card-premium p-4">
          <h2 className="font-semibold mb-3">Amenities</h2>
          <div className="grid grid-cols-2 gap-2">
            {station.amenities.map((amenity) => (
              <div key={amenity} className="flex items-center gap-2">
                <Check className="w-4 h-4 text-accent" />
                <span className="text-sm">{amenity}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Info */}
        <div className="card-premium p-4">
          <h2 className="font-semibold mb-3">Pricing</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Energy Cost</span>
              <span className="font-medium">${station.pricePerKwh}/kWh</span>
            </div>
            {station.parkingFee > 0 && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Parking Fee</span>
                <span className="font-medium">${station.parkingFee.toFixed(2)}/hour</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sticky CTA */}
      <div className="sticky-cta">
        <div className="container">
          <Button 
            className="w-full btn-accent h-12"
            disabled={selectedSlot === null}
          >
            <Calendar className="w-4 h-4 mr-2" />
            {selectedSlot !== null 
              ? `Book Slot ${selectedSlot + 1}` 
              : 'Select a Slot to Book'
            }
          </Button>
        </div>
      </div>
    </div>
  );
}
