
import { Search, ShoppingCart } from "lucide-react";
import { useState } from "react";

export const Navigation = ({ 
  onCartClick, 
  cartItemsCount,
  onSearch 
}: { 
  onCartClick: () => void;
  cartItemsCount: number;
  onSearch: (query: string) => void;
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex-1">
          <h1 className="text-xl font-semibold text-primary">Elegant Shop</h1>
        </div>
        
        <div className="flex-1 max-w-md">
          <div className="relative">
            <input
              type="search"
              placeholder="Search products..."
              className="w-full px-4 py-2 rounded-full bg-accent/50 border-0 focus:ring-2 focus:ring-primary/20 focus:outline-none"
              value={searchQuery}
              onChange={handleSearch}
            />
            <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
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
