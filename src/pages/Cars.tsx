import { useState } from 'react';
import { Search, SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { CarCard } from '@/components/cars/CarCard';
import { cars, brands, driveTypes } from '@/data/cars';
import { cn } from '@/lib/utils';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

export default function Cars() {
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState([0, 150000]);
  const [rangeKm, setRangeKm] = useState([0, 700]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedDriveTypes, setSelectedDriveTypes] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const filteredCars = cars.filter(car => {
    const matchesSearch = car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      car.brand.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = car.price >= priceRange[0] && car.price <= priceRange[1];
    const matchesRange = car.range >= rangeKm[0] && car.range <= rangeKm[1];
    const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(car.brand);
    const matchesDrive = selectedDriveTypes.length === 0 || selectedDriveTypes.includes(car.driveType);
    
    return matchesSearch && matchesPrice && matchesRange && matchesBrand && matchesDrive;
  });

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const toggleDriveType = (type: string) => {
    setSelectedDriveTypes(prev => 
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const clearFilters = () => {
    setPriceRange([0, 150000]);
    setRangeKm([0, 700]);
    setSelectedBrands([]);
    setSelectedDriveTypes([]);
  };

  const hasActiveFilters = selectedBrands.length > 0 || selectedDriveTypes.length > 0 || 
    priceRange[0] > 0 || priceRange[1] < 150000 || rangeKm[0] > 0 || rangeKm[1] < 700;

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Brand Filter */}
      <div>
        <h3 className="font-semibold mb-3">Brand</h3>
        <div className="space-y-2">
          {brands.slice(0, 6).map((brand) => (
            <label key={brand} className="flex items-center gap-3 cursor-pointer">
              <Checkbox 
                checked={selectedBrands.includes(brand)}
                onCheckedChange={() => toggleBrand(brand)}
              />
              <span className="text-sm">{brand}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-semibold mb-3">Price Range</h3>
        <Slider
          min={0}
          max={150000}
          step={5000}
          value={priceRange}
          onValueChange={setPriceRange}
          className="mb-2"
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>${priceRange[0].toLocaleString()}</span>
          <span>${priceRange[1].toLocaleString()}</span>
        </div>
      </div>

      {/* Range (km) */}
      <div>
        <h3 className="font-semibold mb-3">Range (km)</h3>
        <Slider
          min={0}
          max={700}
          step={50}
          value={rangeKm}
          onValueChange={setRangeKm}
          className="mb-2"
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>{rangeKm[0]} km</span>
          <span>{rangeKm[1]} km</span>
        </div>
      </div>

      {/* Drive Type */}
      <div>
        <h3 className="font-semibold mb-3">Drive Type</h3>
        <div className="space-y-2">
          {driveTypes.map((type) => (
            <label key={type} className="flex items-center gap-3 cursor-pointer">
              <Checkbox 
                checked={selectedDriveTypes.includes(type)}
                onCheckedChange={() => toggleDriveType(type)}
              />
              <span className="text-sm">{type}</span>
            </label>
          ))}
        </div>
      </div>

      {hasActiveFilters && (
        <Button 
          variant="outline" 
          className="w-full"
          onClick={clearFilters}
        >
          Clear All Filters
        </Button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-lg border-b border-border md:hidden">
        <div className="px-4 py-3">
          <h1 className="font-display font-bold text-xl">Electric Cars</h1>
        </div>
        <div className="px-4 pb-3 flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search cars..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="shrink-0 relative">
                <SlidersHorizontal className="w-4 h-4" />
                {hasActiveFilters && (
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full" />
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
              </SheetHeader>
              <div className="mt-6">
                <FilterContent />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div className="container py-6">
        <div className="flex gap-8">
          {/* Desktop Sidebar Filters */}
          <aside className="hidden md:block w-64 shrink-0">
            <div className="sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display font-semibold text-lg">Filters</h2>
                {hasActiveFilters && (
                  <button 
                    onClick={clearFilters}
                    className="text-sm text-primary hover:underline"
                  >
                    Clear all
                  </button>
                )}
              </div>
              <FilterContent />
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Desktop Search */}
            <div className="hidden md:flex items-center justify-between mb-6">
              <div className="relative w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  placeholder="Search cars..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <p className="text-muted-foreground">
                {filteredCars.length} vehicles found
              </p>
            </div>

            {/* Active Filters Tags */}
            {hasActiveFilters && (
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedBrands.map((brand) => (
                  <button
                    key={brand}
                    onClick={() => toggleBrand(brand)}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                  >
                    {brand}
                    <X className="w-3 h-3" />
                  </button>
                ))}
                {selectedDriveTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => toggleDriveType(type)}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                  >
                    {type}
                    <X className="w-3 h-3" />
                  </button>
                ))}
              </div>
            )}

            {/* Results Count - Mobile */}
            <p className="text-sm text-muted-foreground mb-4 md:hidden">
              {filteredCars.length} vehicles found
            </p>

            {/* Cars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCars.map((car) => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>

            {filteredCars.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No vehicles match your filters.</p>
                <Button 
                  variant="link" 
                  className="text-primary mt-2"
                  onClick={clearFilters}
                >
                  Clear all filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
