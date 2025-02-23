
import { Search, X } from "lucide-react";
import { useState, useEffect } from "react";

const carouselItems = [
  {
    image: "https://images.unsplash.com/photo-1555421689-d68471e189f2?w=1200&q=80",
    title: "Premium Tech Gadgets",
    subtitle: "Discover the latest in technology",
  },
  {
    image: "https://images.unsplash.com/photo-1570828307635-a4c3a643c5ac?w=1200&q=80",
    title: "Elegant Design",
    subtitle: "Style meets functionality",
  },
  {
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&q=80",
    title: "Best Deals",
    subtitle: "Quality products at great prices",
  },
];

export const CarouselHeader = ({ onSearch }: { onSearch: (query: string) => void }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    onSearch("");
  };

  return (
    <div className="relative w-full">
      <div className="relative h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden">
        {carouselItems.map((item, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              currentSlide === index ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="absolute inset-0 bg-black/30" />
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 animate-fade-in">
                {item.title}
              </h2>
              <p className="text-lg md:text-xl lg:text-2xl animate-fade-in delay-200">
                {item.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-full max-w-md px-4">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          <input
            type="search"
            placeholder="Search products..."
            className="w-full pl-10 pr-10 py-2 rounded-full bg-white shadow-lg border-0 focus:ring-2 focus:ring-primary/20 focus:outline-none"
            value={searchQuery}
            onChange={handleSearch}
          />
          {searchQuery && (
            <button
              onClick={handleClearSearch}
              className="absolute right-3 top-2.5 p-0.5 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="h-4 w-4 text-gray-400" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
