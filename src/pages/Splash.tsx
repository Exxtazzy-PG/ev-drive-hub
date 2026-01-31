import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import ev6Red from '@/assets/cars/ev6-red.jpg';

const colors = [
  { name: 'Runway Red', hex: '#B91C1C' },
  { name: 'Glacier White', hex: '#F5F5F5' },
  { name: 'Aurora Black', hex: '#1A1A1A' },
  { name: 'Yacht Blue', hex: '#1E40AF' },
];

export default function Splash() {
  const navigate = useNavigate();
  const [selectedColor, setSelectedColor] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    // Auto-navigate after 4 seconds
    const timer = setTimeout(() => {
      navigate('/home');
    }, 4000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div 
      className="min-h-screen bg-gradient-splash flex flex-col items-center justify-between py-12 px-6 relative overflow-hidden"
      onClick={() => navigate('/home')}
    >
      {/* Logo */}
      <div className={cn(
        'flex flex-col items-center gap-3 transition-all duration-700',
        isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
      )}>
        <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20">
          <span className="text-white font-display font-bold text-3xl">EV</span>
        </div>
        <div className="text-center">
          <h1 className="text-white font-display font-bold text-2xl">EV Cars</h1>
          <p className="text-white/70 text-sm mt-1">Experience the Future</p>
        </div>
      </div>

      {/* Featured Car */}
      <div className={cn(
        'flex-1 flex flex-col items-center justify-center py-8 transition-all duration-1000 delay-300',
        isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
      )}>
        <div className="relative w-full max-w-lg">
          {/* Car Image with glow effect */}
          <div className="absolute inset-0 bg-gradient-radial from-white/10 to-transparent blur-3xl" />
          <img 
            src={ev6Red}
            alt="KIA EV6"
            className="relative z-10 w-full h-auto object-contain drop-shadow-2xl animate-float"
          />
        </div>

        {/* Car Name */}
        <div className="text-center mt-8">
          <h2 className="text-white font-display font-bold text-3xl">KIA EV6</h2>
          <p className="text-white/60 text-sm mt-2">The Future is Electric</p>
        </div>

        {/* Color Selector */}
        <div className="flex items-center gap-3 mt-6">
          {colors.map((color, index) => (
            <button
              key={color.hex}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedColor(index);
              }}
              className={cn(
                'w-4 h-4 rounded-full transition-all duration-300 border-2',
                selectedColor === index 
                  ? 'border-white scale-125' 
                  : 'border-white/30 hover:border-white/60'
              )}
              style={{ backgroundColor: color.hex }}
            />
          ))}
        </div>
      </div>

      {/* Navigation Hint */}
      <div className={cn(
        'flex flex-col items-center gap-4 transition-all duration-700 delay-500',
        isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      )}>
        <div className="flex items-center gap-2">
          <ChevronLeft className="w-4 h-4 text-white/50" />
          <div className="flex gap-1.5">
            <div className="w-2 h-2 rounded-full bg-white" />
            <div className="w-2 h-2 rounded-full bg-white/40" />
            <div className="w-2 h-2 rounded-full bg-white/40" />
          </div>
          <ChevronRight className="w-4 h-4 text-white/50" />
        </div>
        <p className="text-white/50 text-xs">Tap anywhere to continue</p>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 -left-20 w-40 h-40 bg-white/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-20 w-60 h-60 bg-white/5 rounded-full blur-3xl" />
    </div>
  );
}
