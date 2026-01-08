
export enum Language {
  EN = 'EN',
  KH = 'KH'
}

export enum Category {
  ROOM_SERVICE = 'Room Service',
  POOLSIDE = 'Poolside',
  BREAKFAST = 'Breakfast',
  RESTAURANT = 'Restaurant',
  TOURS = 'Tours',
  RENTALS = 'Rentals',
  LAUNDRY = 'Laundry',
  WELLNESS = 'Wellness',
  TRANSPORT = 'Transport',
  HOUSEKEEPING = 'Housekeeping',
  MAINTENANCE = 'Maintenance',
  LOCAL_ATTRACTION = 'Local Attractions'
}

export interface LocalizedString {
  en: string;
  kh: string;
}

export interface MenuItem {
  id: string;
  category: Category;
  subCategory?: LocalizedString;
  name: LocalizedString;
  description: LocalizedString;
  price: number;
  image: string;
  available: boolean;
  externalUrl?: string;
}

export interface RequestItem {
  id: string;
  type: 'order' | 'service' | 'feedback' | 'checkout';
  roomNumber: string;
  items?: { name: string; quantity: number }[];
  details?: string;
  status: 'pending' | 'confirmed' | 'follow_up' | 'completed' | 'cancelled';
  timestamp: number;
}

export interface Feedback {
  id: string;
  roomNumber: string;
  rating: number;
  comment: string;
  timestamp: number;
}

export interface HotelSettings {
  name: string;
  logo: string;
  banner: string;
  primaryColor: string;
  buttonColor: string;
  iconSize: number;
  homeView: 'grid' | 'list';
  categoryView: 'grid' | 'list';
  whatsappNumber: string;
  telegramUsername: string;
}
