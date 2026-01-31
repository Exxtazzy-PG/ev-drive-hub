import { cn } from '@/lib/utils';

interface ColorSelectorProps {
  colors: { name: string; hex: string }[];
  selected: string;
  onSelect: (hex: string) => void;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function ColorSelector({ colors, selected, onSelect, size = 'md', className }: ColorSelectorProps) {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  return (
    <div className={cn('flex items-center gap-2', className)}>
      {colors.map((color) => (
        <button
          key={color.hex}
          onClick={() => onSelect(color.hex)}
          title={color.name}
          className={cn(
            'color-dot',
            sizes[size],
            selected === color.hex && 'active'
          )}
          style={{ backgroundColor: color.hex }}
        />
      ))}
    </div>
  );
}
