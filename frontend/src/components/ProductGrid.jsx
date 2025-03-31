import { useTheme } from '../context/ThemeContext';
import { Link } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import { glassButtonClass } from './common/ButtonStyles';

const ProductGrid = ({ products }) => {
  const theme = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState('right');
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (products.length <= 1 || isPaused) return;

    const interval = setInterval(() => {
      setSlideDirection('right');
      setCurrentIndex((prev) => (prev + 1) % products.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [products.length, isPaused]);

  const handleSlideChange = useCallback((direction, index) => {
    setSlideDirection(direction);
    setCurrentIndex(index);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 3000);
  }, []);

  const handlePrev = () => handleSlideChange('left', (currentIndex - 1 + products.length) % products.length);
  const handleNext = () => handleSlideChange('right', (currentIndex + 1) % products.length);

  const truncateText = (text, wordLimit) => {
    if (!text) return "";
    const words = text.split(' ');
    return words.length > wordLimit ? words.slice(0, wordLimit).join(' ') + '...' : text;
  };

  if (!products.length) return null;

  const calculatePosition = (index) => {
    if (index === currentIndex) return 'front';
    if (index === (currentIndex + 1) % products.length) return 'right';
    if (index === (currentIndex - 1 + products.length) % products.length) return 'left';
    return 'hidden';
  };

  const transforms = {
    front: 'translateZ(400px) scale(1)',
    left: 'translateX(-70%) translateZ(-600px) rotateY(45deg) scale(0.7)',
    right: 'translateX(70%) translateZ(-600px) rotateY(-45deg) scale(0.7)',
    hidden: 'translateZ(-1200px) scale(0.5)'
  };

  return (
    <div className="w-full py-8">
      <div className="relative w-full min-h-[400px] perspective-[2000px]">
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
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            const position = calculatePosition(index);
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

                    {/* Content Section */}
                    <div className="w-full md:w-1/2 h-[55%] md:h-full flex flex-col p-4 md:p-6 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-900 via-zinc-900/95 to-black relative">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent opacity-50" />
                      <div className="relative z-10">
                        <h2 className="text-xl md:text-2xl font-bold text-white">
                          {product.name}
                        </h2>
                        <p className="text-gray-300 my-4 line-clamp-2">
                          {truncateText(product.description, 20)}
                        </p>
                        <div className="flex items-center justify-between mt-auto">
                          <span className="text-2xl font-bold text-blue-400">
                            ${product.price.toFixed(2)}
                          </span>
                          <Link 
                            to={`/product/${product._id}`}
                            className={glassButtonClass}
                            onMouseEnter={(e) => {
                              e.stopPropagation();
                              setIsPaused(true);
                            }}
                            onMouseLeave={(e) => {
                              e.stopPropagation();
                              setIsPaused(false);
                            }}
                          >
                            <span className="relative z-10 tracking-wider text-sm font-medium group-hover:text-white">
                              View Details
                            </span>
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
