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
    front: 'translateZ(300px) rotateY(0deg) scale(1)',
    left: 'translateX(-60%) translateZ(-400px) rotateY(35deg) scale(0.6)',
    right: 'translateX(60%) translateZ(-400px) rotateY(-35deg) scale(0.6)',
    hidden: 'translateZ(-800px) scale(0.5)'
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="relative w-full h-full perspective-[2000px]">
        {/* Navigation Controls - Enhanced with pulse effect */}
        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 text-white 
          hover:bg-black/70 transition-all duration-300 hover:scale-110 active:scale-95
          hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] group"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <svg className="w-6 h-6 transition-transform duration-300 group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 text-white 
          hover:bg-black/70 transition-all duration-300 hover:scale-110 active:scale-95
          hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] group"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <svg className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                  ? 'w-8 bg-white/20' 
                  : 'w-4 bg-white/5 hover:bg-white/10'
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
            const blur = position === 'front' ? '' : 'blur-sm';

            return (
              <div
                key={product._id}
                className={`absolute inset-0 w-full h-full ${blur}`}
                style={{
                  transform: transforms[position],
                  opacity,
                  zIndex: position === 'front' ? 3 : 1,
                  transition: 'all 0.7s cubic-bezier(0.4, 0.0, 0.2, 1)'
                }}
              >
                <div className="w-[80%] h-[85%] mx-auto my-auto rounded-lg overflow-hidden
                  bg-[linear-gradient(135deg,rgba(255,255,255,0.07),rgba(0,0,0,0.2),rgba(0,0,0,0.4))]
                  backdrop-filter backdrop-blur-[16px]
                  border border-white/10
                  shadow-[0_0_20px_rgba(0,0,0,0.6),inset_0_0_80px_rgba(255,255,255,0.03)]
                  animate-[boxGlow_4s_ease-in-out_infinite]
                  transition-all duration-700"
                >
                  <div className="flex flex-col md:flex-row h-full">
                    {/* Image Section - Only Scale Effect */}
                    <div className="w-full md:w-1/2 h-[45%] md:h-full relative overflow-hidden group/image">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover/image:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-500"></div>
                    </div>

                    {/* Content Section - Improved Shine Effect */}
                    <div className="w-full md:w-1/2 h-[55%] md:h-full flex flex-col p-4 relative group/content overflow-hidden">
                      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.07),rgba(0,0,0,0.2),rgba(0,0,0,0.4))] backdrop-blur-[16px]"></div>
                      {/* New Shine Overlay */}
                      <div className="absolute inset-0 opacity-0 group-hover/content:opacity-100 transition-opacity duration-300">
                        <div className="absolute inset-[-10%] bg-gradient-to-r from-transparent via-white/[0.07] to-transparent rotate-[25deg] translate-x-[-100%] group-hover/content:translate-x-[200%] transition-transform duration-1000 ease-out"></div>
                      </div>
                      <div className="relative z-10 flex flex-col h-full">
                        <h2 className="text-xl font-bold text-white font-orbitron tracking-wider">
                          {product.name}
                        </h2>
                        <p className="text-gray-300 my-3 text-sm">
                          {truncateText(product.description, 15)}
                        </p>
                        <div className="flex items-center justify-between mt-auto">
                          <span className="text-xl font-bold text-white font-orbitron transform transition-all duration-300 group-hover:scale-110 group-hover:translate-x-2">
                            ₹{product.price.toFixed(2)}
                          </span>
                          <Link 
                            to={`/product/${product._id}`}
                            className="shop-now-button rounded-lg transform transition-transform duration-300 hover:scale-105 hover:-translate-y-1"
                            onMouseEnter={(e) => {
                              e.stopPropagation();
                              setIsPaused(true);
                            }}
                            onMouseLeave={(e) => {
                              e.stopPropagation();
                              setIsPaused(false);
                            }}
                          >
                            <span className="block px-3 py-1.5 text-white text-sm font-bold font-orbitron tracking-wider">
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
