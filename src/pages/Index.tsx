
import { useState } from "react";
import { Navigation } from "../components/Navigation";
import { ProductCard } from "../components/ProductCard";
import { ProductModal } from "../components/ProductModal";
import { CartModal } from "../components/CartModal";
import { Product, CartItem } from "../types";

// Sample products data
const products: Product[] = [
  {
    id: 1,
    name: "Premium Laptop",
    description: "High-performance laptop for professionals with the latest Intel processor, 16GB RAM, 512GB SSD storage, and a stunning 15.6-inch 4K display. Perfect for demanding tasks like video editing, programming, and 3D rendering. Features an ergonomic backlit keyboard, precision touchpad, and all-day battery life. Includes premium aluminum build quality and Thunderbolt 4 connectivity.",
    price: 1299.99,
    image: "https://images.unsplash.com/photo-1481487196290-c152efe083f5?w=800&q=80",
  },
  {
    id: 2,
    name: "Wireless Earbuds",
    description: "Premium sound quality with active noise cancellation, up to 24 hours of battery life with charging case, and intuitive touch controls. IPX4 water resistance, perfect for workouts. Features Bluetooth 5.0 connectivity and seamless device switching.",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&q=80",
  },
  {
    id: 3,
    name: "Smart Watch",
    description: "Stay connected with style. Features health monitoring, fitness tracking, and smartphone notifications. Water-resistant design with customizable watch faces and interchangeable bands. Includes heart rate monitoring, sleep tracking, and GPS.",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&q=80",
  },
  {
    id: 4,
    name: "4K Monitor",
    description: "Ultra-wide professional display with HDR support, 144Hz refresh rate, and 1ms response time. Features USB-C connectivity, built-in speakers, and ergonomic stand with height, tilt, and swivel adjustments. Perfect for content creation and gaming.",
    price: 699.99,
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&q=80",
  },
];

const Index = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [filteredProducts, setFilteredProducts] = useState(products);

  const handleSearch = (query: string) => {
    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const handleAddToCart = () => {
    if (selectedProduct) {
      setCartItems([
        ...cartItems,
        {
          id: Date.now(),
          product: selectedProduct,
        },
      ]);
    }
  };

  const handleRemoveFromCart = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const handleCheckout = () => {
    const itemsList = cartItems
      .map(
        (item) =>
          `- ${item.product.name}: $${item.product.price.toFixed(2)}`
      )
      .join("\n");
    const total = cartItems
      .reduce((sum, item) => sum + item.product.price, 0)
      .toFixed(2);
    const message = `New Order:\n\n${itemsList}\n\nTotal: $${total}`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/?text=${encodedMessage}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-accent to-white">
      <Navigation 
        onCartClick={() => setIsCartOpen(true)} 
        cartItemsCount={cartItems.length}
        onSearch={handleSearch}
      />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={() => {
                setSelectedProduct(product);
                setIsProductModalOpen(true);
              }}
            />
          ))}
        </div>
      </main>

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          isOpen={isProductModalOpen}
          onClose={() => {
            setIsProductModalOpen(false);
            setSelectedProduct(null);
          }}
          onAddToCart={handleAddToCart}
        />
      )}

      <CartModal
        items={cartItems}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onRemoveItem={handleRemoveFromCart}
        onCheckout={handleCheckout}
      />
    </div>
  );
};

export default Index;
