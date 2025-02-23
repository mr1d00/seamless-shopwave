
import { ShoppingCart } from "lucide-react";

export const Navigation = ({ 
  onCartClick, 
  cartItemsCount
}: { 
  onCartClick: () => void;
  cartItemsCount: number;
}) => {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex-1">
          <h1 className="text-xl font-semibold text-primary">Elegant Shop</h1>
        </div>
        
        <div className="flex-1 flex justify-end">
          <button
            onClick={onCartClick}
            className="p-2 rounded-full hover:bg-accent transition-colors relative"
          >
            <ShoppingCart className="h-6 w-6 text-gray-700" />
            {cartItemsCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-medium px-2 py-0.5 rounded-full min-w-[20px]">
                {cartItemsCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};
