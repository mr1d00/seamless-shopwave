
import { X } from "lucide-react";
import { Product } from "../types";

export const ProductModal = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
}: {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: () => void;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white/90 backdrop-blur-xl w-full max-w-2xl rounded-2xl shadow-lg overflow-hidden">
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 p-2 rounded-full bg-white/80 hover:bg-white transition-colors z-10"
          >
            <X className="h-5 w-5" />
          </button>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="aspect-square">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-gray-900">{product.name}</h2>
              <div className="mt-2 max-h-[200px] overflow-y-auto pr-2 scrollbar-thin">
                <p className="text-gray-600">{product.description}</p>
              </div>
              <div className="mt-4">
                <p className="text-3xl font-semibold text-primary">
                  ${product.price.toFixed(2)}
                </p>
              </div>
              <button
                onClick={() => {
                  onAddToCart();
                  onClose();
                }}
                className="mt-6 w-full bg-primary hover:bg-primary/90 text-white py-3 px-6 rounded-lg font-medium transition-colors"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
