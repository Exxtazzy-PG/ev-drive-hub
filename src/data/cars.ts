// Car data for the EV marketplace
import ev6Red from '@/assets/cars/ev6-red.jpg';
import modelYWhite from '@/assets/cars/model-y-white.jpg';
import i4Blue from '@/assets/cars/i4-blue.jpg';
import eqsSilver from '@/assets/cars/eqs-silver.jpg';

export interface Car {
  id: string;
  name: string;
  brand: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  range: number;
  battery: string;
  power: string;
  acceleration: string;
  topSpeed: number;
  chargingTime: string;
  driveType: string;
  seats: number;
  colors: { name: string; hex: string }[];
  variants: { name: string; price: number; features: string[] }[];
  features: string[];
  isFavorite: boolean;
  isNew: boolean;
}

export const cars: Car[] = [
  {
    id: 'kia-ev6',
    name: 'EV6 GT-Line',
    brand: 'KIA',
    price: 45000,
    rating: 4.8,
    reviews: 234,
    image: ev6Red,
    range: 528,
    battery: '77.4 kWh',
    power: '325 hp',
    acceleration: '5.2s',
    topSpeed: 188,
    chargingTime: '18 min (10-80%)',
    driveType: 'AWD',
    seats: 5,
    colors: [
      { name: 'Runway Red', hex: '#B91C1C' },
      { name: 'Glacier White', hex: '#F5F5F5' },
      { name: 'Aurora Black', hex: '#1A1A1A' },
      { name: 'Yacht Blue', hex: '#1E40AF' },
    ],
    variants: [
      { name: 'GT-Line RWD', price: 45000, features: ['Rear-wheel drive', '229 hp', '528 km range'] },
      { name: 'GT-Line AWD', price: 48900, features: ['All-wheel drive', '325 hp', '506 km range'] },
      { name: 'GT', price: 61900, features: ['Performance AWD', '585 hp', '424 km range'] },
    ],
    features: ['Vehicle-to-Load (V2L)', 'Augmented Reality HUD', 'Meridian Premium Audio', 'Highway Driving Assist 2'],
    isFavorite: false,
    isNew: true,
  },
  {
    id: 'tesla-model-y',
    name: 'Model Y Long Range',
    brand: 'Tesla',
    price: 52990,
    rating: 4.7,
    reviews: 1892,
    image: modelYWhite,
    range: 533,
    battery: '75 kWh',
    power: '384 hp',
    acceleration: '5.0s',
    topSpeed: 217,
    chargingTime: '25 min (10-80%)',
    driveType: 'AWD',
    seats: 5,
    colors: [
      { name: 'Pearl White', hex: '#F5F5F5' },
      { name: 'Solid Black', hex: '#1A1A1A' },
      { name: 'Midnight Silver', hex: '#6B7280' },
      { name: 'Deep Blue', hex: '#1E3A8A' },
      { name: 'Red Multi-Coat', hex: '#B91C1C' },
    ],
    variants: [
      { name: 'Standard Range', price: 42990, features: ['Rear-wheel drive', '260 hp', '430 km range'] },
      { name: 'Long Range', price: 52990, features: ['Dual Motor AWD', '384 hp', '533 km range'] },
      { name: 'Performance', price: 57990, features: ['Dual Motor AWD', '456 hp', '514 km range'] },
    ],
    features: ['Autopilot', 'Full Self-Driving Capability', '15" Touchscreen', 'Premium Audio'],
    isFavorite: true,
    isNew: false,
  },
  {
    id: 'bmw-i4',
    name: 'i4 M50',
    brand: 'BMW',
    price: 67300,
    rating: 4.6,
    reviews: 456,
    image: i4Blue,
    range: 510,
    battery: '83.9 kWh',
    power: '544 hp',
    acceleration: '3.9s',
    topSpeed: 225,
    chargingTime: '31 min (10-80%)',
    driveType: 'AWD',
    seats: 5,
    colors: [
      { name: 'Portimao Blue', hex: '#1E40AF' },
      { name: 'Brooklyn Grey', hex: '#6B7280' },
      { name: 'Alpine White', hex: '#F5F5F5' },
      { name: 'Black Sapphire', hex: '#1A1A1A' },
    ],
    variants: [
      { name: 'eDrive35', price: 52200, features: ['Rear-wheel drive', '286 hp', '483 km range'] },
      { name: 'eDrive40', price: 56400, features: ['Rear-wheel drive', '340 hp', '590 km range'] },
      { name: 'M50', price: 67300, features: ['M xDrive AWD', '544 hp', '510 km range'] },
    ],
    features: ['BMW Curved Display', 'Harman Kardon Surround Sound', 'Driving Assistant Professional', 'M Sport Suspension'],
    isFavorite: false,
    isNew: true,
  },
  {
    id: 'mercedes-eqs',
    name: 'EQS SUV 450+',
    brand: 'Mercedes-Benz',
    price: 104400,
    rating: 4.9,
    reviews: 189,
    image: eqsSilver,
    range: 544,
    battery: '108.4 kWh',
    power: '360 hp',
    acceleration: '6.2s',
    topSpeed: 210,
    chargingTime: '31 min (10-80%)',
    driveType: 'RWD',
    seats: 7,
    colors: [
      { name: 'High-Tech Silver', hex: '#9CA3AF' },
      { name: 'Obsidian Black', hex: '#1A1A1A' },
      { name: 'Nautic Blue', hex: '#1E3A8A' },
      { name: 'Diamond White', hex: '#F5F5F5' },
    ],
    variants: [
      { name: 'EQS 450+', price: 104400, features: ['RWD', '360 hp', '544 km range'] },
      { name: 'EQS 450 4MATIC', price: 108400, features: ['4MATIC AWD', '360 hp', '507 km range'] },
      { name: 'EQS 580 4MATIC', price: 125950, features: ['4MATIC AWD', '536 hp', '507 km range'] },
    ],
    features: ['MBUX Hyperscreen', 'Burmester 3D Surround Sound', 'AIRMATIC Suspension', 'Rear-Axle Steering'],
    isFavorite: true,
    isNew: false,
  },
];

export const brands = ['KIA', 'Tesla', 'BMW', 'Mercedes-Benz', 'Audi', 'Porsche', 'Hyundai', 'Volkswagen'];

export const priceRanges = [
  { label: 'Under $40,000', min: 0, max: 40000 },
  { label: '$40,000 - $60,000', min: 40000, max: 60000 },
  { label: '$60,000 - $80,000', min: 60000, max: 80000 },
  { label: '$80,000 - $100,000', min: 80000, max: 100000 },
  { label: 'Over $100,000', min: 100000, max: Infinity },
];

export const rangeOptions = [
  { label: '300+ km', value: 300 },
  { label: '400+ km', value: 400 },
  { label: '500+ km', value: 500 },
  { label: '600+ km', value: 600 },
];

export const driveTypes = ['RWD', 'AWD', 'FWD'];
