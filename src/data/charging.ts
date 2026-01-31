// Charging station data
import station1 from '@/assets/charging/station-1.jpg';

export interface ChargingStation {
  id: string;
  name: string;
  address: string;
  city: string;
  distance: number;
  pricePerKwh: number;
  parkingFee: number;
  availableSlots: number;
  totalSlots: number;
  connectorTypes: string[];
  power: string;
  image: string;
  rating: number;
  hours: string;
  amenities: string[];
  coordinates: { lat: number; lng: number };
}

export const chargingStations: ChargingStation[] = [
  {
    id: 'station-1',
    name: 'EV Power Hub Downtown',
    address: '1 Street, LA Road',
    city: 'Los Angeles, CA',
    distance: 0.8,
    pricePerKwh: 0.35,
    parkingFee: 1.00,
    availableSlots: 4,
    totalSlots: 8,
    connectorTypes: ['Type 2', 'CCS', 'CHAdeMO'],
    power: '150 kW',
    image: station1,
    rating: 4.7,
    hours: '24/7',
    amenities: ['Restroom', 'Cafe', 'WiFi', 'Waiting Area'],
    coordinates: { lat: 34.0522, lng: -118.2437 },
  },
  {
    id: 'station-2',
    name: 'Green Charge Plaza',
    address: '255 Commerce Blvd',
    city: 'San Francisco, CA',
    distance: 1.2,
    pricePerKwh: 0.42,
    parkingFee: 0,
    availableSlots: 2,
    totalSlots: 6,
    connectorTypes: ['Type 2', 'CCS'],
    power: '350 kW',
    image: station1,
    rating: 4.9,
    hours: '6:00 AM - 11:00 PM',
    amenities: ['Restroom', 'Shopping Center', 'WiFi'],
    coordinates: { lat: 37.7749, lng: -122.4194 },
  },
  {
    id: 'station-3',
    name: 'Highway Fast Charge',
    address: '890 Interstate Plaza',
    city: 'San Diego, CA',
    distance: 2.5,
    pricePerKwh: 0.38,
    parkingFee: 0.50,
    availableSlots: 6,
    totalSlots: 12,
    connectorTypes: ['CCS', 'CHAdeMO'],
    power: '250 kW',
    image: station1,
    rating: 4.5,
    hours: '24/7',
    amenities: ['Restroom', 'Fast Food', 'ATM'],
    coordinates: { lat: 32.7157, lng: -117.1611 },
  },
  {
    id: 'station-4',
    name: 'Mall Supercharger',
    address: '500 Shopping Way',
    city: 'Seattle, WA',
    distance: 3.1,
    pricePerKwh: 0.40,
    parkingFee: 2.00,
    availableSlots: 1,
    totalSlots: 4,
    connectorTypes: ['Type 2', 'CCS'],
    power: '120 kW',
    image: station1,
    rating: 4.3,
    hours: '8:00 AM - 10:00 PM',
    amenities: ['Shopping Mall', 'Restaurants', 'Restroom'],
    coordinates: { lat: 47.6062, lng: -122.3321 },
  },
];

export const connectorTypes = ['Type 2', 'CCS', 'CHAdeMO', 'Tesla Supercharger'];
