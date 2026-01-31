import { Link } from 'react-router-dom';
import { MapPin, Zap, Clock, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ChargingStation } from '@/data/charging';

interface ChargingStationCardProps {
  station: ChargingStation;
  compact?: boolean;
  className?: string;
}

export function ChargingStationCard({ station, compact = false, className }: ChargingStationCardProps) {
  const availabilityColor = station.availableSlots > 2 
    ? 'text-success' 
    : station.availableSlots > 0 
      ? 'text-warning' 
      : 'text-destructive';

  if (compact) {
    return (
      <Link 
        to={`/charging/${station.id}`}
        className={cn('card-premium p-3 flex gap-3', className)}
      >
        <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0">
          <img src={station.image} alt={station.name} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-sm truncate">{station.name}</h4>
          <p className="text-xs text-muted-foreground truncate">{station.address}</p>
          <div className="flex items-center gap-3 mt-1 text-xs">
            <span className={availabilityColor}>
              {station.availableSlots}/{station.totalSlots} available
            </span>
            <span className="text-muted-foreground">{station.distance} km</span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link 
      to={`/charging/${station.id}`}
      className={cn('card-premium block overflow-hidden', className)}
    >
      <div className="aspect-video bg-muted overflow-hidden">
        <img 
          src={station.image} 
          alt={station.name}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-semibold text-foreground">{station.name}</h3>
            <div className="flex items-center gap-1 text-sm text-muted-foreground mt-0.5">
              <MapPin className="w-3.5 h-3.5" />
              <span>{station.address}</span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-brand-gold text-brand-gold" />
            <span className="text-sm font-medium">{station.rating}</span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-accent" />
            <span>{station.power}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span>{station.hours}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-border">
          <div>
            <span className="text-lg font-bold text-accent">${station.pricePerKwh}</span>
            <span className="text-sm text-muted-foreground">/kWh</span>
          </div>
          <div className={cn('font-medium', availabilityColor)}>
            {station.availableSlots} of {station.totalSlots} available
          </div>
        </div>
      </div>
    </Link>
  );
}
