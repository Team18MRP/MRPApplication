
import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Food } from '@/types/food';

interface FoodCardProps {
  food: Food;
  onAddToCart: (food: Food) => void;
}

const FoodCard: React.FC<FoodCardProps> = ({ food, onAddToCart }) => {
  return (
    <div className="card-gradient rounded-xl overflow-hidden shadow-lg transition-transform hover:scale-[1.02]">
      <div className="relative">
        <img 
          src={food.image} 
          alt={food.name} 
          className="w-full h-48 object-cover"
        />
        {food.isPopular && (
          <div className="absolute top-2 left-2 bg-app-purple text-white text-xs px-2 py-1 rounded-full">
            Popular
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-medium text-white">{food.name}</h3>
          <span className="text-app-purple font-bold">${food.price.toFixed(2)}</span>
        </div>
        <p className="text-app-text-gray text-sm mt-1 line-clamp-2">{food.description}</p>
        <div className="mt-4 flex justify-between items-center">
          <div className="flex items-center">
            <div className="text-yellow-500 flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <span key={i}>
                  {i < Math.floor(food.rating) ? "★" : "☆"}
                </span>
              ))}
            </div>
            <span className="text-app-text-gray text-sm ml-2">({food.reviews})</span>
          </div>
          <Button 
            size="icon" 
            className="rounded-full bg-app-purple hover:bg-purple-600 transition-colors"
            onClick={() => onAddToCart(food)}
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
