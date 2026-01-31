import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RatingStarsProps {
  rating: number;
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
  className?: string;
}

export function RatingStars({ rating, size = 'md', showValue = false, className }: RatingStarsProps) {
  const sizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className={cn('flex items-center gap-1', className)}>
      <div className="rating-stars">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} className={cn(sizes[size], 'fill-brand-gold text-brand-gold')} />
        ))}
        {hasHalfStar && (
          <Star className={cn(sizes[size], 'fill-brand-gold/50 text-brand-gold')} />
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <Star key={`empty-${i}`} className={cn(sizes[size], 'text-muted-foreground/30')} />
        ))}
      </div>
      {showValue && (
        <span className="font-medium text-sm ml-1">{rating.toFixed(1)}</span>
      )}
    </div>
  );
}
