import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, Heart, Share2, Star, Battery, Zap, Gauge, Clock, Users, ChevronDown, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ColorSelector } from '@/components/ui/ColorSelector';
import { RatingStars } from '@/components/ui/RatingStars';
import { cars } from '@/data/cars';
import { cn } from '@/lib/utils';

export default function CarDetail() {
  const { id } = useParams();
  const car = cars.find(c => c.id === id) || cars[0];
  
  const [selectedColor, setSelectedColor] = useState(car.colors[0].hex);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [isFavorite, setIsFavorite] = useState(car.isFavorite);
  const [expandedVariant, setExpandedVariant] = useState<number | null>(null);

  const specs = [
    { icon: Battery, label: 'Range', value: `${car.range} km` },
    { icon: Zap, label: 'Battery', value: car.battery },
    { icon: Gauge, label: '0-100 km/h', value: car.acceleration },
    { icon: Clock, label: 'Charging', value: car.chargingTime },
    { icon: Users, label: 'Seats', value: `${car.seats} seats` },
    { icon: Zap, label: 'Power', value: car.power },
  ];

  return (
    <div className="min-h-screen bg-background pb-32">
      {/* Mobile Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-lg border-b border-border md:hidden">
        <div className="px-4 py-3 flex items-center justify-between">
          <Link to="/cars" className="p-2 -ml-2">
            <ChevronLeft className="w-6 h-6" />
          </Link>
          <span className="font-semibold">{car.brand}</span>
          <div className="flex items-center gap-2">
            <button className="p-2">
              <Share2 className="w-5 h-5" />
            </button>
            <button 
              className="p-2"
              onClick={() => setIsFavorite(!isFavorite)}
            >
              <Heart className={cn(
                'w-5 h-5',
                isFavorite ? 'fill-primary text-primary' : ''
              )} />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Image */}
      <section className="relative bg-gradient-to-br from-muted to-muted/50">
        <div className="container py-6 md:py-12">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Image Gallery */}
            <div className="flex-1">
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-gradient-to-br from-muted to-card">
                <img 
                  src={car.image}
                  alt={car.name}
                  className="w-full h-full object-cover"
                />
                {car.isNew && (
                  <span className="absolute top-4 left-4 badge-new">NEW LAUNCH</span>
                )}
              </div>
              
              {/* Thumbnail Gallery */}
              <div className="flex gap-2 mt-4 overflow-x-auto no-scrollbar">
                {[1, 2, 3, 4].map((_, i) => (
                  <div 
                    key={i}
                    className={cn(
                      'w-20 h-16 rounded-lg overflow-hidden shrink-0 cursor-pointer border-2 transition-colors',
                      i === 0 ? 'border-primary' : 'border-transparent hover:border-muted-foreground/30'
                    )}
                  >
                    <img 
                      src={car.image}
                      alt={`View ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop Info */}
            <div className="hidden md:block w-96 space-y-6">
              <div>
                <p className="text-muted-foreground text-sm uppercase tracking-wider">{car.brand}</p>
                <h1 className="font-display font-bold text-3xl mt-1">{car.name}</h1>
              </div>

              <div className="flex items-center gap-4">
                <RatingStars rating={car.rating} showValue />
                <span className="text-muted-foreground text-sm">({car.reviews} reviews)</span>
              </div>

              <div>
                <p className="text-muted-foreground text-sm">Starting from</p>
                <p className="price-tag text-3xl">${car.variants[selectedVariant].price.toLocaleString()}</p>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Available Colors</h3>
                <ColorSelector
                  colors={car.colors}
                  selected={selectedColor}
                  onSelect={setSelectedColor}
                  size="lg"
                />
                <p className="text-sm text-muted-foreground mt-2">
                  {car.colors.find(c => c.hex === selectedColor)?.name}
                </p>
              </div>

              <div className="flex gap-3">
                <Button className="flex-1 btn-accent">
                  Book Test Drive
                </Button>
                <Button className="flex-1 btn-primary">
                  Buy Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Info */}
      <section className="container md:hidden py-6 space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-muted-foreground text-xs uppercase tracking-wider">{car.brand}</p>
            <h1 className="font-display font-bold text-2xl">{car.name}</h1>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Starting from</p>
            <p className="price-tag">${car.variants[selectedVariant].price.toLocaleString()}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <RatingStars rating={car.rating} showValue />
          <span className="text-muted-foreground text-sm">({car.reviews} reviews)</span>
        </div>

        <div>
          <h3 className="font-semibold mb-3 text-sm">Available Colors</h3>
          <ColorSelector
            colors={car.colors}
            selected={selectedColor}
            onSelect={setSelectedColor}
          />
          <p className="text-sm text-muted-foreground mt-2">
            {car.colors.find(c => c.hex === selectedColor)?.name}
          </p>
        </div>
      </section>

      {/* Specifications */}
      <section className="container py-6">
        <h2 className="font-display font-semibold text-lg mb-4">Specifications</h2>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {specs.map((spec) => (
            <div key={spec.label} className="spec-badge">
              <spec.icon className="w-5 h-5 text-primary mb-2" />
              <span className="font-semibold text-sm">{spec.value}</span>
              <span className="text-xs text-muted-foreground">{spec.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Variants */}
      <section className="container py-6">
        <h2 className="font-display font-semibold text-lg mb-4">Choose Variant</h2>
        <div className="space-y-3">
          {car.variants.map((variant, index) => (
            <div key={variant.name}>
              <button
                onClick={() => {
                  setSelectedVariant(index);
                  setExpandedVariant(expandedVariant === index ? null : index);
                }}
                className={cn(
                  'w-full card-premium p-4 flex items-center justify-between',
                  selectedVariant === index && 'ring-2 ring-primary'
                )}
              >
                <div className="flex items-center gap-3">
                  <div className={cn(
                    'w-5 h-5 rounded-full border-2 flex items-center justify-center',
                    selectedVariant === index ? 'border-primary bg-primary' : 'border-muted-foreground'
                  )}>
                    {selectedVariant === index && <Check className="w-3 h-3 text-white" />}
                  </div>
                  <div className="text-left">
                    <p className="font-semibold">{variant.name}</p>
                    <p className="text-sm text-muted-foreground">{car.driveType}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="font-bold text-primary">${variant.price.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">Ex-showroom</p>
                  </div>
                  <ChevronDown className={cn(
                    'w-5 h-5 transition-transform',
                    expandedVariant === index && 'rotate-180'
                  )} />
                </div>
              </button>
              
              {expandedVariant === index && (
                <div className="mt-2 p-4 bg-muted/50 rounded-lg">
                  <ul className="space-y-2">
                    {variant.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <Check className="w-4 h-4 text-accent" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="container py-6">
        <h2 className="font-display font-semibold text-lg mb-4">Key Features</h2>
        <div className="grid grid-cols-2 gap-3">
          {car.features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
              <Check className="w-4 h-4 text-accent shrink-0" />
              <span className="text-sm">{feature}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Sticky CTA */}
      <div className="sticky-cta md:hidden">
        <div className="container flex gap-3">
          <Button className="flex-1 btn-accent h-12">
            Book Test Drive
          </Button>
          <Button className="flex-1 btn-primary h-12">
            Buy Now
          </Button>
        </div>
      </div>
    </div>
  );
}
