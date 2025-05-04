
import { Food, Category } from '@/types/food';

export const categories: Category[] = [
  {
    id: 'burger',
    name: 'Burgers',
    icon: 'https://cdn-icons-png.flaticon.com/128/3075/3075977.png'
  },
  {
    id: 'pizza',
    name: 'Pizza',
    icon: 'https://cdn-icons-png.flaticon.com/128/599/599995.png'
  },
  {
    id: 'sushi',
    name: 'Sushi',
    icon: 'https://cdn-icons-png.flaticon.com/128/2252/2252075.png'
  },
  {
    id: 'salad',
    name: 'Salads',
    icon: 'https://cdn-icons-png.flaticon.com/128/415/415694.png'
  },
  {
    id: 'dessert',
    name: 'Desserts',
    icon: 'https://cdn-icons-png.flaticon.com/128/3142/3142984.png'
  },
  {
    id: 'drinks',
    name: 'Drinks',
    icon: 'https://cdn-icons-png.flaticon.com/128/2738/2738730.png'
  }
];

export const foodItems: Food[] = [
  {
    id: 1,
    name: 'Classic Cheeseburger',
    price: 8.99,
    description: 'Juicy beef patty with cheese, lettuce, tomato, and special sauce',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    category: 'burger',
    rating: 4.5,
    reviews: 120,
    isPopular: true
  },
  {
    id: 2,
    name: 'Veggie Supreme Pizza',
    price: 12.99,
    description: 'Fresh vegetables on a crispy crust with house-made tomato sauce',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=828&q=80',
    category: 'pizza',
    rating: 4.3,
    reviews: 85,
    isPopular: true
  },
  {
    id: 3,
    name: 'California Roll',
    price: 7.50,
    description: 'Crab, avocado, and cucumber wrapped in seaweed and rice',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-4.0.3&auto=format&fit=crop&w=840&q=80',
    category: 'sushi',
    rating: 4.7,
    reviews: 64
  },
  {
    id: 4,
    name: 'Caesar Salad',
    price: 6.99,
    description: 'Crisp romaine lettuce, parmesan cheese, croutons, with Caesar dressing',
    image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?ixlib=rb-4.0.3&auto=format&fit=crop&w=870&q=80',
    category: 'salad',
    rating: 4.2,
    reviews: 42
  },
  {
    id: 5,
    name: 'Chocolate Lava Cake',
    price: 5.99,
    description: 'Warm chocolate cake with a molten chocolate center',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d8e4eebd5?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80',
    category: 'dessert',
    rating: 4.9,
    reviews: 110,
    isPopular: true
  },
  {
    id: 6,
    name: 'Strawberry Milkshake',
    price: 4.50,
    description: 'Creamy shake made with fresh strawberries and premium ice cream',
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80',
    category: 'drinks',
    rating: 4.4,
    reviews: 78
  },
  {
    id: 7,
    name: 'Double Bacon Burger',
    price: 10.99,
    description: 'Two beef patties loaded with crispy bacon, cheese, and BBQ sauce',
    image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?ixlib=rb-4.0.3&auto=format&fit=crop&w=768&q=80',
    category: 'burger',
    rating: 4.8,
    reviews: 92
  },
  {
    id: 8,
    name: 'Pepperoni Pizza',
    price: 11.99,
    description: 'Classic pepperoni pizza with extra cheese and Italian herbs',
    image: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?ixlib=rb-4.0.3&auto=format&fit=crop&w=1030&q=80',
    category: 'pizza',
    rating: 4.6,
    reviews: 105,
    isPopular: true
  }
];

// Function to get all food items
export const getAllFood = (): Food[] => {
  return foodItems;
};

// Function to get food by category
export const getFoodByCategory = (categoryId: string): Food[] => {
  if (categoryId === 'all') {
    return foodItems;
  }
  return foodItems.filter(item => item.category === categoryId);
};

// Function to get all categories
export const getAllCategories = (): Category[] => {
  return categories;
};

// Function to get food by ID
export const getFoodById = (id: number): Food | undefined => {
  return foodItems.find(item => item.id === id);
};

// Function to search food
export const searchFood = (query: string): Food[] => {
  const lowerCaseQuery = query.toLowerCase();
  return foodItems.filter(
    item => 
      item.name.toLowerCase().includes(lowerCaseQuery) || 
      item.description.toLowerCase().includes(lowerCaseQuery)
  );
};
