
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChefHat } from 'lucide-react';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-app-dark p-4">
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-6">
          <div className="bg-app-gray p-6 rounded-full">
            <ChefHat className="w-16 h-16 text-app-purple" />
          </div>
        </div>
        
        <h1 className="text-4xl font-bold text-white mb-2">404</h1>
        <h2 className="text-xl font-semibold text-white mb-4">Page Not Found</h2>
        
        <p className="text-app-text-gray mb-8">
          Oops! The page you're looking for seems to have wandered off the menu.
          Let's get you back to our delicious offerings.
        </p>
        
        <Button 
          className="btn-gradient"
          onClick={() => navigate('/')}
        >
          Return to Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
