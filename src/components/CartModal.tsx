
import { X } from "lucide-react";
import { CartItem } from "../types";

export const CartModal = ({
  items,
  isOpen,
  onClose,
  onRemoveItem,
  onCheckout,
}: {
  items: CartItem[];
  isOpen: boolean;
  onClose: () => void;
  onRemoveItem: (id: number) => void;
  onCheckout: () => void;
}) => {
  if (!isOpen) return null;

  const total = items.reduce((sum, item) => sum + item.product.price, 0);

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-end animate-fade-in">
      <div className="bg-white w-full max-w-md h-full animate-slide-in">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold">Shopping Cart</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-accent transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="flex-1 overflow-auto p-4">
            {items.length === 0 ? (
              <p className="text-center text-gray-500 mt-4">Your cart is empty</p>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 bg-accent/30 p-3 rounded-lg"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium">{item.product.name}</h3>
                      <p className="text-sm text-gray-500 mt-1">
                        ${item.product.price.toFixed(2)}
                      </p>
                    </div>
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="p-1 h-fit rounded-full hover:bg-white transition-colors"
                    >
                      <X className="h-4 w-4 text-gray-500" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {items.length > 0 && (
            <div className="border-t p-4 space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-medium">Total</span>
                <span className="font-semibold text-lg">
                  ${total.toFixed(2)}
                </span>
              </div>
              <button
                onClick={onCheckout}
                className="w-full bg-primary hover:bg-primary/90 text-white py-3 px-6 rounded-lg font-medium transition-colors"
              >
                Checkout via WhatsApp
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
