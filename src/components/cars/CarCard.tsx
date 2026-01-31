import { Link } from 'react-router-dom';
import { Heart, Star, Zap, Battery, Gauge } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Car } from '@/data/cars';
import { useState } from 'react';

interface CarCardProps {
  car: Car;
  className?: string;
}

export function CarCard({ car, className }: CarCardProps) {
  const [isFavorite, setIsFavorite] = useState(car.isFavorite);

  return (
    <Link 
      to={`/cars/${car.id}`}
      className={cn('card-premium group block overflow-hidden', className)}
    >
      {/* Image Container */}
      <div className="relative aspect-car bg-gradient-to-br from-muted to-muted/50 overflow-hidden">
        <img 
          src={car.image} 
          alt={car.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {car.isNew && (
            <span className="badge-new">NEW</span>
          )}
        </div>

        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsFavorite(!isFavorite);
          }}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center shadow-lg transition-transform hover:scale-110"
        >
          <Heart 
            className={cn(
              'w-5 h-5 transition-colors',
              isFavorite ? 'fill-primary text-primary' : 'text-muted-foreground'
            )} 
          />
        </button>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Brand & Name */}
        <div>
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            {car.brand}
          </p>
          <h3 className="font-display font-semibold text-lg text-foreground">
            {car.name}
          </h3>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-brand-gold text-brand-gold" />
            <span className="font-medium text-sm">{car.rating}</span>
          </div>
          <span className="text-xs text-muted-foreground">
            ({car.reviews} reviews)
          </span>
        </div>

        {/* Quick Specs */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Battery className="w-3.5 h-3.5" />
            <span>{car.range} km</span>
          </div>
          <div className="flex items-center gap-1">
            <Zap className="w-3.5 h-3.5" />
            <span>{car.power}</span>
          </div>
          <div className="flex items-center gap-1">
            <Gauge className="w-3.5 h-3.5" />
            <span>{car.acceleration}</span>
          </div>
        </div>

        {/* Price */}
        <div className="pt-2 border-t border-border">
          <p className="text-xs text-muted-foreground">Starting from</p>
          <p className="price-tag">${car.price.toLocaleString()}</p>
        </div>
      </div>
    </Link>
  );
}
