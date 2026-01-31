// Marketplace products data
import tire1 from '@/assets/products/tire-1.jpg';

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: 'tires' | 'wheels' | 'accessories' | 'charging';
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  stockCount?: number;
  specs?: Record<string, string>;
  description: string;
}

export const products: Product[] = [
  {
    id: 'tire-1',
    name: 'EcoContact 6',
    brand: 'Continental',
    category: 'tires',
    price: 189.99,
    originalPrice: 219.99,
    image: tire1,
    rating: 4.8,
    reviews: 342,
    inStock: true,
    stockCount: 24,
    specs: {
      size: '235/45R18',
      loadIndex: '98',
      speedRating: 'Y',
      season: 'All-Season',
    },
    description: 'Premium all-season tire optimized for electric vehicles with low rolling resistance.',
  },
  {
    id: 'tire-2',
    name: 'Primacy 4+',
    brand: 'Michelin',
    category: 'tires',
    price: 245.00,
    image: tire1,
    rating: 4.9,
    reviews: 567,
    inStock: true,
    stockCount: 16,
    specs: {
      size: '255/40R19',
      loadIndex: '100',
      speedRating: 'Y',
      season: 'All-Season',
    },
    description: 'Ultra-quiet EV tire with exceptional wet grip and long-lasting performance.',
  },
  {
    id: 'tire-3',
    name: 'Pilot Sport EV',
    brand: 'Michelin',
    category: 'tires',
    price: 329.00,
    image: tire1,
    rating: 4.7,
    reviews: 189,
    inStock: true,
    stockCount: 8,
    specs: {
      size: '265/35R21',
      loadIndex: '101',
      speedRating: 'Y',
      season: 'Summer',
    },
    description: 'High-performance summer tire designed specifically for electric sports cars.',
  },
  {
    id: 'tire-4',
    name: 'Turanza EV',
    brand: 'Bridgestone',
    category: 'tires',
    price: 199.00,
    originalPrice: 239.00,
    image: tire1,
    rating: 4.6,
    reviews: 234,
    inStock: false,
    specs: {
      size: '245/45R19',
      loadIndex: '102',
      speedRating: 'V',
      season: 'All-Season',
    },
    description: 'Engineered for EVs with foam technology for a quieter ride.',
  },
  {
    id: 'wheel-1',
    name: 'Aero Sport Wheel',
    brand: 'TSW',
    category: 'wheels',
    price: 450.00,
    image: tire1,
    rating: 4.5,
    reviews: 78,
    inStock: true,
    stockCount: 12,
    specs: {
      size: '20x8.5',
      pattern: '5x114.3',
      finish: 'Matte Black',
    },
    description: 'Lightweight aero wheel designed to maximize EV range.',
  },
  {
    id: 'acc-1',
    name: 'Home Charger Pro',
    brand: 'ChargePoint',
    category: 'charging',
    price: 699.00,
    image: tire1,
    rating: 4.8,
    reviews: 892,
    inStock: true,
    stockCount: 45,
    specs: {
      power: '11 kW',
      connector: 'Type 2',
      cable: '7.5m',
    },
    description: 'Smart home charging station with WiFi connectivity and app control.',
  },
];

export const productCategories = [
  { id: 'tires', name: 'Tires', icon: 'circle' },
  { id: 'wheels', name: 'Wheels', icon: 'circle-dot' },
  { id: 'accessories', name: 'Accessories', icon: 'wrench' },
  { id: 'charging', name: 'Charging', icon: 'zap' },
];

export const tireBrands = ['Michelin', 'Continental', 'Bridgestone', 'Pirelli', 'Goodyear'];
