
import { Category, MenuItem } from './types';

export const INITIAL_MENU_ITEMS: MenuItem[] = [
  {
    id: '1',
    category: Category.ROOM_SERVICE,
    name: { en: 'Classic Beef Burger', kh: 'ប៊ឺហ្គឺសាច់គោ' },
    description: { en: 'Juicy beef patty with cheese and fries', kh: 'សាច់គោស្រស់ៗជាមួយឈីស និងដំឡូងបារាំង' },
    price: 12.50,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&h=300&q=80',
    available: true
  },
  {
    id: '2',
    category: Category.POOLSIDE,
    name: { en: 'Fresh Coconut Water', kh: 'ទឹកដូងស្រស់' },
    description: { en: 'Chilled local young coconut', kh: 'ដូងខ្ចីត្រជាក់ៗពីចម្ការ' },
    price: 3.00,
    image: 'https://images.unsplash.com/photo-1550853024-fae8cd4be477?auto=format&fit=crop&w=400&h=300&q=80',
    available: true
  },
  {
    id: '3',
    category: Category.WELLNESS,
    name: { en: 'Khmer Traditional Massage', kh: 'ម៉ាស្សាបែបខ្មែរបុរាណ' },
    description: { en: '60 minutes of relaxing traditional techniques', kh: 'ម៉ាស្សាបែបបច្ចេកទេសខ្មែរបុរាណ រយៈពេល ៦០ នាទី' },
    price: 25.00,
    image: 'https://images.unsplash.com/photo-1544161515-4ae6ce6ca8b8?auto=format&fit=crop&w=400&h=300&q=80',
    available: true
  },
  {
    id: '4',
    category: Category.LOCAL_ATTRACTION,
    subCategory: { en: 'Tourist Spot', kh: 'កន្លែងទេសចរណ៍' },
    name: { en: 'Angkor Wat Temple', kh: 'ប្រាសាទអង្គរវត្ត' },
    description: { en: 'The largest religious monument in the world.', kh: 'វិមានសាសនាដ៏ធំបំផុតនៅក្នុងពិភពលោក។' },
    price: 0,
    image: 'https://images.unsplash.com/photo-1500048993953-d23a436266cf?auto=format&fit=crop&w=400&h=300&q=80',
    available: true,
    externalUrl: 'https://goo.gl/maps/AngkorWat'
  },
  {
    id: '5',
    category: Category.LOCAL_ATTRACTION,
    subCategory: { en: 'Local', kh: 'ក្នុងស្រុក' },
    name: { en: 'Phsar Chas (Old Market)', kh: 'ផ្សារចាស់' },
    description: { en: 'Traditional market in the heart of Siem Reap.', kh: 'ផ្សារប្រពៃណីនៅចំកណ្តាលក្រុងសៀមរាប។' },
    price: 0,
    image: 'https://images.unsplash.com/photo-1561053140-2771003463a5?auto=format&fit=crop&w=400&h=300&q=80',
    available: true,
    externalUrl: 'https://goo.gl/maps/PhsarChas'
  }
];

export const UI_COLORS = {
  primary: '#C5A059', // Gold accent
  primaryDark: '#A68445',
  secondary: '#1C1C1C', // Dark charcoal
  bg: '#F9F7F2' // Creamy paper
};
