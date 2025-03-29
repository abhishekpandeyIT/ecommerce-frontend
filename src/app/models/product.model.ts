export interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    subCategory?: string;
    brand?: string;
    colors?: string[];
    sizes?: string[];
    images: string[];
    stock: number;
    rating?: number;
    reviews?: Review[];
    discount?: number;
    featured?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
  }
  
  export interface Review {
    userId: string;
    userName: string;
    rating: number;
    comment: string;
    date: Date;
  }
  
  export interface ProductFilter {
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    color?: string;
    size?: string;
    brand?: string;
    sort?: 'price_asc' | 'price_desc' | 'rating' | 'newest';
    search?: string;
    page?: number;
    limit?: number;
  }
  
  export interface PaginatedProducts {
    products: Product[];
    total: number;
    page: number;
    pages: number;
  }