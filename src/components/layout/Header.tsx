
import React, { useState } from 'react';
import { Menu, ShoppingBag, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";

interface HeaderProps {
  toggleCart: () => void;
  cartItemCount: number;
}

const Header: React.FC<HeaderProps> = ({ toggleCart, cartItemCount }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 bg-app-dark/95 backdrop-blur-sm border-b border-app-light-gray">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <h1 
            onClick={() => navigate('/')}
            className="text-2xl font-bold text-white cursor-pointer"
          >
            Food<span className="text-app-purple">App</span>
          </h1>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="/" className="text-white hover:text-app-purple transition-colors">Home</a>
          <a href="/menu" className="text-white hover:text-app-purple transition-colors">Menu</a>
          <a href="/about" className="text-white hover:text-app-purple transition-colors">About</a>
          <a href="/contact" className="text-white hover:text-app-purple transition-colors">Contact</a>
        </nav>

        {/* Cart Button */}
        <div className="flex items-center space-x-4">
          <Button 
            onClick={toggleCart} 
            variant="ghost" 
            size="icon" 
            className="relative"
          >
            <ShoppingBag className="w-6 h-6" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-app-purple text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {cartItemCount}
              </span>
            )}
          </Button>

          {/* Mobile Menu Button */}
          <Button 
            onClick={toggleMobileMenu} 
            variant="ghost" 
            size="icon"
            className="md:hidden"
          >
            <Menu className="w-6 h-6" />
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-app-dark z-50 p-4 flex flex-col animate-fade-in">
          <div className="flex justify-end">
            <Button onClick={toggleMobileMenu} variant="ghost" size="icon">
              <X className="w-6 h-6" />
            </Button>
          </div>
          <nav className="flex flex-col items-center justify-center space-y-8 flex-grow">
            <a href="/" className="text-xl text-white hover:text-app-purple transition-colors">Home</a>
            <a href="/menu" className="text-xl text-white hover:text-app-purple transition-colors">Menu</a>
            <a href="/about" className="text-xl text-white hover:text-app-purple transition-colors">About</a>
            <a href="/contact" className="text-xl text-white hover:text-app-purple transition-colors">Contact</a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
