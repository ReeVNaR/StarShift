import { useTheme } from '../context/ThemeContext';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const ProductGrid = ({ products }) => {
  const theme = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState('right');
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (products.length <= 1) return;
    const interval = setInterval(() => {
      setSlideDirection('right');
      setCurrentIndex((prev) => (prev + 1) % products.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [products.length]);

  const handlePrev = () => {
    setSlideDirection('left');
    setCurrentIndex((prev) => (prev === 0 ? products.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSlideDirection('right');
    setCurrentIndex((prev) => (prev + 1) % products.length);
  };

  const truncateText = (text, wordLimit) => {
    if (!text) return "";
    const words = text.split(' ');
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...';
    }
    return text;
  };

  if (!products.length) return null;
  const featuredProduct = products[currentIndex];

  return (
    <div className="h-full w-full flex items-center">
      <div className="w-full h-full bg-zinc-900/50 rounded-xl overflow-hidden backdrop-blur-sm border border-zinc-800/50 shadow-2xl relative group">
        {/* Carousel Controls */}
        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/70"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/70"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Carousel Content with Slide Animation */}
        <div className="relative h-full overflow-hidden">
          <div
            className={`flex flex-col md:flex-row h-full transform transition-transform duration-500 ease-out ${
              slideDirection === 'right' ? 'animate-slide-left' : 'animate-slide-right'
            }`}
          >
            {/* Image Section - Updated for mobile */}
            <div className="w-full md:w-1/2 h-[40%] md:h-full relative overflow-hidden">
              <img
                src={featuredProduct.image}
                alt={featuredProduct.name}
                className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            {/* Content Section - Updated with better scroll handling */}
            <div className="w-full md:w-1/2 h-[60%] md:h-full flex flex-col relative">
              <div className="absolute inset-0 bg-gradient-to-bl from-black via-zinc-800/90 to-zinc-400/50 pointer-events-none" />
              <div className="relative flex flex-col h-full">
                {/* Title Section - Fixed height */}
                <div className="p-4 md:p-6 border-b border-zinc-800/10">
                  <h2 className="text-xl md:text-3xl lg:text-4xl font-bold text-white animate-fade-in-down line-clamp-2">
                    {featuredProduct.name}
                  </h2>
                </div>

                {/* Description Section - Single line only */}
                <div className="px-4 md:px-6 flex-1 overflow-y-auto custom-scrollbar">
                  <div className="prose prose-invert max-w-none">
                    <p className={`${theme.text} text-sm md:text-lg animate-fade-in-delayed leading-relaxed line-clamp-1`}>
                      {truncateText(featuredProduct.description, 8)}
                    </p>
                  </div>
                </div>

                {/* Price and Action Section - Fixed height */}
                <div className="mt-auto p-4 md:p-6 border-t border-zinc-800/10">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-xl md:text-3xl font-bold text-blue-400 animate-fade-in-delayed">
                      ${featuredProduct.price.toFixed(2)}
                    </span>
                    <Link 
                      to={`/product/${featuredProduct._id}`}
                      className="group inline-flex items-center animate-bounce-in"
                    >
                      <button className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white px-4 md:px-8 py-2 md:py-3 rounded-lg text-sm md:text-base font-semibold transition-all duration-300 transform hover:scale-105">
                        Shop Now
                        <svg className="w-4 h-4 md:w-5 md:h-5 ml-2 inline-block transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </button>
                    </Link>
                  </div>

                  {/* Carousel Indicators */}
                  <div className="flex justify-center space-x-2 mt-6">
                    {products.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setSlideDirection(index > currentIndex ? 'right' : 'left');
                          setCurrentIndex(index);
                        }}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          index === currentIndex ? 'w-8 bg-blue-500' : 'w-4 bg-gray-500/50'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductGrid;
