
import React from 'react';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-app-dark border-t border-app-light-gray mt-12 py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold text-white mb-4">
              Food<span className="text-app-purple">App</span>
            </h3>
            <p className="text-app-text-gray">
              Delicious food delivered to your doorstep. Fast, fresh and tasty.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-medium mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/" className="text-app-text-gray hover:text-app-purple transition-colors">Home</a></li>
              <li><a href="/menu" className="text-app-text-gray hover:text-app-purple transition-colors">Menu</a></li>
              <li><a href="/about" className="text-app-text-gray hover:text-app-purple transition-colors">About Us</a></li>
              <li><a href="/contact" className="text-app-text-gray hover:text-app-purple transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-medium mb-4">Contact</h4>
            <ul className="space-y-2">
              <li className="text-app-text-gray">123 Food Street</li>
              <li className="text-app-text-gray">Cuisine City, FC 12345</li>
              <li className="text-app-text-gray">info@foodapp.com</li>
              <li className="text-app-text-gray">(123) 456-7890</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-medium mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-app-text-gray hover:text-app-purple transition-colors">
                <Facebook />
              </a>
              <a href="#" className="text-app-text-gray hover:text-app-purple transition-colors">
                <Instagram />
              </a>
              <a href="#" className="text-app-text-gray hover:text-app-purple transition-colors">
                <Twitter />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-app-light-gray mt-8 pt-8 text-center text-app-text-gray">
          <p>&copy; {new Date().getFullYear()} FoodApp. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
