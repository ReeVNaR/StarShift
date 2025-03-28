import { useTheme } from '../context/ThemeContext';
import { Link } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';

const ProductGrid = ({ products }) => {
  const theme = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState('right');
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (products.length <= 1 || isPaused) return;
    
    const interval = setInterval(() => {
      setSlideDirection('right');
      setCurrentIndex((prev) => (prev + 1) % products.length);
    }, 5000); // 5 seconds between slides

    return () => clearInterval(interval);
  }, [products.length, isPaused]);

  const handleSlideChange = useCallback((direction, index) => {
    setSlideDirection(direction);
    setCurrentIndex(index);
    // Brief pause after manual navigation
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 3000); // Resume after 3 seconds
  }, []);

  const handlePrev = () => {
    const newIndex = currentIndex === 0 ? products.length - 1 : currentIndex - 1;
    handleSlideChange('left', newIndex);
  };

  const handleNext = () => {
    const newIndex = (currentIndex + 1) % products.length;
    handleSlideChange('right', newIndex);
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

  const ROTATION_ANGLE = 360 / products.length;

  return (
    <div className="h-full w-full flex items-center">
      <div className="relative w-full h-[85%] perspective-[2000px]">
        {/* Navigation Controls */}
        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition-all duration-300 hover:scale-110 active:scale-95"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition-all duration-300 hover:scale-110 active:scale-95"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Progress Indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2">
          {products.map((_, index) => (
            <button
              key={index}
              onClick={() => handleSlideChange(index > currentIndex ? 'right' : 'left', index)}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'w-8 bg-blue-500' 
                  : 'w-4 bg-gray-500/50 hover:bg-gray-400/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* 3D Carousel */}
        <div className="absolute inset-0 origin-center [transform-style:preserve-3d]">
          {products.map((product, index) => {
            // Calculate positions for 3-card layout
            let position;
            if (index === currentIndex) {
              position = 'front';
            } else if (index === (currentIndex + 1) % products.length) {
              position = 'right';
            } else if (currentIndex === 0 && index === products.length - 1) {
              position = 'left';
            } else if (index === (currentIndex - 1 + products.length) % products.length) {
              position = 'left';
            } else {
              position = 'hidden';
            }

            // Updated transform values with deeper positioning
            const transforms = {
              front: 'translateZ(400px) scale(1)',
              left: 'translateX(-70%) translateZ(-600px) rotateY(45deg) scale(0.7)',
              right: 'translateX(70%) translateZ(-600px) rotateY(-45deg) scale(0.7)',
              hidden: 'translateZ(-1200px) scale(0.5)'
            };

            const opacity = position === 'hidden' ? 0 : position === 'front' ? 1 : 0.5;
            const blur = position === 'front' ? '' : 'blur-md';
            const skeleton = position !== 'front' ? 'before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent before:animate-[shimmer_2s_infinite]' : '';

            return (
              <div
                key={product._id}
                className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out ${blur}`}
                style={{
                  transform: transforms[position],
                  opacity,
                  zIndex: position === 'front' ? 3 : 1
                }}
              >
                <div className={`bg-zinc-900/90 w-[80%] h-[75%] mx-auto my-auto rounded-xl overflow-hidden shadow-2xl border border-zinc-800/50 relative ${skeleton}`}>
                  <div className="flex flex-col md:flex-row h-full">
                    {/* Image Section */}
                    <div className="w-full md:w-1/2 h-[45%] md:h-full relative">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Content Section - Updated background */}
                    <div className="w-full md:w-1/2 h-[55%] md:h-full flex flex-col p-4 md:p-6 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-900 via-zinc-900/95 to-black relative">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent opacity-50" />
                      <div className="relative z-10">
                        <h2 className="text-xl md:text-2xl font-bold text-white">
                          {product.name}
                        </h2>
                        <p className="text-gray-300 my-4 line-clamp-2">
                          {product.description}
                        </p>
                        <div className="flex items-center justify-between mt-auto">
                          <span className="text-2xl font-bold text-blue-400">
                            ${product.price.toFixed(2)}
                          </span>
                          <Link 
                            to={`/product/${product._id}`}
                            className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-lg transition-colors"
                          >
                            View Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductGrid;
