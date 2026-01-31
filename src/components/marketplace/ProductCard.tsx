import { Link } from 'react-router-dom';
import { Star, ShoppingCart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Product } from '@/data/products';
import { Button } from '@/components/ui/button';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  return (
    <div className={cn('card-premium overflow-hidden', className)}>
      <Link to={`/marketplace/${product.id}`}>
        <div className="aspect-product bg-gradient-to-br from-muted to-muted/50 overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>
      </Link>
      
      <div className="p-4 space-y-2">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          {product.brand}
        </p>
        
        <Link to={`/marketplace/${product.id}`}>
          <h3 className="font-semibold text-foreground hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>

        {product.specs && (
          <p className="text-xs text-muted-foreground">
            {Object.values(product.specs).slice(0, 2).join(' • ')}
          </p>
        )}

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-brand-gold text-brand-gold" />
            <span className="text-sm font-medium">{product.rating}</span>
          </div>
          <span className="text-xs text-muted-foreground">
            ({product.reviews})
          </span>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-foreground">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          
          {product.inStock ? (
            <span className="badge-available">In Stock</span>
          ) : (
            <span className="badge-stock">Out of Stock</span>
          )}
        </div>

        <Button 
          className="w-full btn-accent mt-2"
          disabled={!product.inStock}
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Add to Cart
        </Button>
      </div>
    </div>
  );
}
