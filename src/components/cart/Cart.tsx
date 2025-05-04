
import React from 'react';
import { X, Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CartItem } from '@/types/food';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (id: number) => void;
  onUpdateQuantity: (id: number, quantity: number) => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose, items, onRemove, onUpdateQuantity }) => {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const delivery = 2.99;
  const total = subtotal + delivery;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-end">
      <div 
        className="bg-app-dark w-full max-w-md animate-slide-in-right border-l border-app-light-gray overflow-hidden flex flex-col"
        style={{ 
          animation: 'slideIn 0.3s ease-out',
          height: '100vh' 
        }}
      >
        <div className="flex justify-between items-center border-b border-app-light-gray p-4">
          <h2 className="text-xl font-semibold text-white">Your Cart</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-6 h-6" />
          </Button>
        </div>

        <div className="flex-grow overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="bg-app-light-gray p-6 rounded-full mb-4">
                <ShoppingBag className="w-10 h-10 text-app-text-gray" />
              </div>
              <p className="text-app-text-gray">Your cart is empty</p>
              <Button 
                className="mt-4 btn-gradient"
                onClick={onClose}
              >
                Continue Shopping
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="bg-app-gray rounded-lg p-3 flex gap-3">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg" 
                  />
                  <div className="flex-grow">
                    <div className="flex justify-between">
                      <h3 className="font-medium text-white">{item.name}</h3>
                      <Button variant="ghost" size="icon" className="h-5 w-5" onClick={() => onRemove(item.id)}>
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                    <p className="text-app-text-gray text-sm">${item.price.toFixed(2)}</p>
                    <div className="flex justify-between items-center mt-2">
                      <div className="flex items-center bg-app-light-gray rounded-full">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 rounded-full"
                          onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <span className="px-2 text-white">{item.quantity}</span>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 rounded-full"
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                      <p className="text-white font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-app-light-gray p-4">
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-app-text-gray">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-app-text-gray">
                <span>Delivery</span>
                <span>${delivery.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-white font-medium pt-2 border-t border-app-light-gray">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            <Button className="w-full btn-gradient">
              Checkout
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

// Adding missing icon
const ShoppingBag = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
    <path d="M3 6h18" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
);

export default Cart;
