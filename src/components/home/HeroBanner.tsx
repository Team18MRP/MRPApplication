
import React from 'react';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

const HeroBanner: React.FC = () => {
  return (
    <div className="relative bg-app-dark rounded-xl overflow-hidden my-6">
      {/* Background gradient */}
      <div 
        className="absolute inset-0 bg-gradient-to-r from-app-purple/30 to-purple-900/20 mix-blend-overlay"
      />

      <div className="container mx-auto px-4 py-12 md:py-20 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 z-10 mb-8 md:mb-0">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
            Delicious Food <br />
            <span className="text-app-purple">Delivered Fast</span> <br />
            At Your Door
          </h1>
          
          <p className="mt-4 text-app-text-gray max-w-md">
            Order your favorite meals from the best restaurants in town. 
            Fresh ingredients, amazing taste, delivered quickly.
          </p>
          
          <div className="mt-8 relative">
            <div className="flex overflow-hidden rounded-full shadow-lg w-full max-w-md">
              <div className="bg-app-gray flex items-center pl-4 flex-grow">
                <Search className="text-app-text-gray w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search for food..."
                  className="bg-transparent border-0 outline-none text-white p-3 w-full focus:ring-0"
                />
              </div>
              <Button className="rounded-r-full btn-gradient px-6">
                Search
              </Button>
            </div>
          </div>
        </div>
        
        <div className="md:w-1/2 flex justify-center md:justify-end">
          <img
            src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=828&q=80"
            alt="Delicious food"
            className="w-full max-w-md rounded-xl shadow-2xl transform md:translate-y-4 md:translate-x-6"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
