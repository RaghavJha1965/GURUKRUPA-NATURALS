export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  shortDescription: string;
  price: number;
  originalPrice?: number;
  images: string[];
  weights: WeightOption[];
  benefits: string[];
  ingredients: string;
  nutritionalInfo: NutritionalInfo;
  howToUse: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  isNew?: boolean;
  isBestseller?: boolean;
  isFeatured?: boolean;
  tags: string[];
  badge?: string;
}

export interface WeightOption {
  label: string;
  value: string;
  price: number;
  originalPrice?: number;
  inStock: boolean;
}

export interface NutritionalInfo {
  servingSize: string;
  calories?: string;
  protein?: string;
  carbs?: string;
  fat?: string;
  fiber?: string;
  [key: string]: string | undefined;
}

export interface Review {
  id: string;
  author: string;
  avatar?: string;
  rating: number;
  date: string;
  title: string;
  content: string;
  verified: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  authorAvatar?: string;
  publishedAt: string;
  readTime: number;
  image: string;
  tags: string[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  productCount: number;
}

export interface Testimonial {
  id: string;
  author: string;
  location: string;
  rating: number;
  text: string;
  avatar?: string;
  verified: boolean;
  product?: string;
}
