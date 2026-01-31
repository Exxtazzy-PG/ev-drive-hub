import { Link } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CategoryIconProps {
  icon: LucideIcon;
  label: string;
  href: string;
  color: string;
  className?: string;
}

export function CategoryIcon({ icon: Icon, label, href, color, className }: CategoryIconProps) {
  return (
    <Link 
      to={href}
      className={cn('category-icon', className)}
    >
      <div 
        className="icon-circle"
        style={{ backgroundColor: color }}
      >
        <Icon className="w-6 h-6 text-white" />
      </div>
      <span className="text-xs font-medium text-foreground text-center">
        {label}
      </span>
    </Link>
  );
}
