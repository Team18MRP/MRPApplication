
import React from 'react';
import { Button } from '@/components/ui/button';

interface Category {
  id: string;
  name: string;
  icon: string;
}

interface CategorySelectorProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (id: string) => void;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({ 
  categories, 
  selectedCategory, 
  onSelectCategory 
}) => {
  return (
    <div className="overflow-x-auto py-4">
      <div className="flex space-x-3 pb-2">
        <Button
          key="all"
          onClick={() => onSelectCategory('all')}
          className={`rounded-full whitespace-nowrap ${
            selectedCategory === 'all' 
              ? 'btn-gradient' 
              : 'bg-app-gray text-white hover:bg-app-light-gray'
          }`}
          variant="ghost"
        >
          All
        </Button>
        {categories.map(category => (
          <Button
            key={category.id}
            onClick={() => onSelectCategory(category.id)}
            className={`rounded-full whitespace-nowrap ${
              selectedCategory === category.id 
                ? 'btn-gradient' 
                : 'bg-app-gray text-white hover:bg-app-light-gray'
            }`}
            variant="ghost"
          >
            <img 
              src={category.icon} 
              alt={category.name} 
              className="w-5 h-5 mr-2" 
            />
            {category.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default CategorySelector;
