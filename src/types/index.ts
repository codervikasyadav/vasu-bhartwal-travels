export interface Tour {
  id: string;
  slug: string;
  title: string;
  category: TourCategory;
  duration: string;
  price: number;
  originalPrice: number;
  difficulty: 'Easy' | 'Moderate' | 'Challenging' | 'Difficult';
  shortDescription: string;
  description: string;
  image: string;
  images: string[];
  maxGroupSize: number;
  startLocation: string;
  endLocation: string;
  bestSeason: string;
  altitude: string;
  itinerary: ItineraryDay[];
  inclusions: string[];
  exclusions: string[];
  highlights: string[];
  weatherInfo: WeatherInfo;
  travelTips: string[];
  rating: number;
  reviewCount: number;
  featured: boolean;
  popular: boolean;
}

export type TourCategory =
  | 'char-dham'
  | 'adi-kailash'
  | 'om-parvat'
  | 'kedarnath'
  | 'badrinath'
  | 'adventure'
  | 'family'
  | 'honeymoon';

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  altitude?: string;
  distance?: string;
  meals?: string;
  accommodation?: string;
}

export interface WeatherInfo {
  bestMonths: string[];
  temperature: { min: string; max: string };
  rainfall: string;
  snowfall?: string;
  tips: string;
}

export interface Testimonial {
  id: string;
  name: string;
  avatar: string;
  location: string;
  tour: string;
  rating: number;
  quote: string;
  date: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
  social?: {
    linkedin?: string;
    instagram?: string;
    twitter?: string;
  };
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
}

export interface Destination {
  id: string;
  slug: string;
  name: string;
  image: string;
  shortDescription: string;
  tourCount: number;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  travelDate: string;
  groupSize: string;
  destination: string;
  message: string;
}
