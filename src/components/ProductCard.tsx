
import { Heart, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { Product } from "../types";

export const ProductCard = ({
  product,
  onClick,
}: {
  product: Product;
  onClick: () => void;
}) => {
  const [isLoved, setIsLoved] = useState(false);

  return (
    <div className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
      {/* Love Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsLoved(!isLoved);
        }}
        className="absolute top-3 right-3 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
      >
        <Heart
          className={`h-5 w-5 transition-colors ${
            isLoved ? "fill-red-500 text-red-500" : "text-gray-600"
          }`}
        />
      </button>

      {/* Image Container */}
      <div
        onClick={onClick}
        className="cursor-pointer aspect-square overflow-hidden bg-accent/30"
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 
            onClick={onClick}
            className="font-medium text-gray-900 group-hover:text-primary transition-colors cursor-pointer"
          >
            {product.name}
          </h3>
          <p className="font-semibold text-primary whitespace-nowrap">
            ${product.price.toFixed(2)}
          </p>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
          className="mt-3 w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 active:scale-95 text-white py-2 px-4 rounded-lg font-medium transition-all duration-200"
        >
          <ShoppingCart className="h-4 w-4" />
          Add to Cart
        </button>
      </div>
    </div>
  );
};
