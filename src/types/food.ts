
export interface Food {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  isPopular?: boolean;
}

export interface CartItem extends Food {
  quantity: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}
