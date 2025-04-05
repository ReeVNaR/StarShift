import { memo, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  useEffect(() => {
    // Move stylesheet creation inside useEffect
    const styleSheet = document.createElement("style");
    const styleId = "hero-animations";

    // Only add if not already present
    if (!document.getElementById(styleId)) {
      styleSheet.id = styleId;
      styleSheet.textContent = `
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700&display=swap');
        
        @keyframes clean-pulse {
          0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.02);
            opacity: 0.95;
          }
          100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }
        }
      
        @keyframes twinkle {
          0%, 100% { 
            opacity: 0.1;
            transform: scale(0.8);
          }
          50% { 
            opacity: 1;
            transform: scale(1.2);
          }
        }
      
        @keyframes meteor {
          0% { transform: translate3d(120%, -120%, 0) rotate(45deg); opacity: 0; }
          5% { opacity: 1; }
          95% { opacity: 1; }
          100% { transform: translate3d(-120%, 120%, 0) rotate(45deg); opacity: 0; }
        }
      
        @keyframes spaceship-float {
          0%, 100% { transform: translate3d(0, 0, 0) rotate(-10deg); }
          50% { transform: translate3d(15px, -15px, 0) rotate(10deg); }
        }
      
        .hero-logo {
          animation: slide-in 1.2s ease-out forwards, clean-pulse 4s ease-in-out infinite;
          transform-origin: center center;
          will-change: transform, opacity;
        }
      
        .star {
          position: absolute;
          width: 2px;
          height: 2px;
          background: #fff;
          box-shadow: 0 0 4px #fff,
                      0 0 8px #fff,
                      0 0 12px rgba(46,69,144,0.5);
          border-radius: 50%;
          animation: twinkle 3s ease-in-out infinite;
          will-change: opacity, transform;
          pointer-events: none;
          opacity: 0;
          transform: scale(0.8);
        }
      
        .star--small { width: 1px; height: 1px; }
        .star--medium { width: 2px; height: 2px; }
        .star--large { width: 3px; height: 3px; }
      
        .meteor {
          position: absolute;
          width: 150px;
          height: 1px;
          background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0) 100%);
          animation: meteor 6s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          animation-delay: 4s;
          will-change: transform, opacity;
          pointer-events: none;
          filter: blur(0.5px);
        }
      
        .spaceship {
          position: absolute;
          font-size: 1.5rem;
          animation: spaceship-float 8s ease-in-out infinite;
          will-change: transform;
          pointer-events: none;
          text-shadow: 0 0 10px rgba(255,255,255,0.5);
        }
      `;
      document.head.appendChild(styleSheet);
    }

    // Add space elements
    const container = document.querySelector('.hero-logo')?.parentElement;
    if (container) {
      addSpaceElements(container);
    }

    // Cleanup function
    return () => {
      const existingStyle = document.getElementById(styleId);
      if (existingStyle) {
        existingStyle.remove();
      }
      // Remove space elements
      const elements = document.querySelectorAll('.star, .meteor, .spaceship');
      elements.forEach(el => el.remove());
    };
  }, []); // Empty dependency array means this runs once on mount

  return (
    <div className="h-[calc(100vh-2rem)] xs:h-screen w-full relative overflow-hidden -mt-20">
      {/* Adjusted Logo Container positioning */}
      <div className="absolute inset-0 flex items-start justify-center">
        <div className="w-full h-full relative -mt-10 xs:-mt-12 sm:-mt-16 md:-mt-20">
          <img 
            src="/STARSHIFT LOGO.png" 
            alt="StarShift Logo" 
            className="w-[200%] xs:w-[190%] sm:w-[180%] md:w-[180%] lg:w-[180%]
                     h-[160%] xs:h-[155%] sm:h-[150%] md:h-[150%] lg:h-[150%]
                     object-contain hero-logo 
                     absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            loading="eager"
            fetchPriority="high"
          />
        </div>
      </div>

      {/* Adjusted negative margins to move content down */}
      <div className="absolute inset-0 flex flex-col items-center justify-center mt-72 xs:mt-56 sm:mt-64 md:mt-72 lg:mt-80 z-10">
        <p className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl 
                     text-zinc-200 bg-black/20 backdrop-blur-sm 
                     px-3 xs:px-4 py-1.5 xs:py-2 rounded-lg
                     font-orbitron font-bold tracking-[0.15em] uppercase
                     text-center w-[95%] xs:w-[90%] sm:w-[85%] md:w-[80%] lg:w-[70%] mx-auto">
          Your <span className="text-[rgb(46,69,144)] hover:text-[rgb(132,204,22)] 
                               font-medium transition-all duration-300 
                               animate-random-text">Ultimate</span> Gaming Gear Destination
        </p>
        <div className="mt-4 xs:mt-5 sm:mt-6">
          <Link to="/products">
            <button className="shop-now-button 
                             px-6 xs:px-8 sm:px-10 
                             py-3 xs:py-3.5 sm:py-4
                             text-sm xs:text-base sm:text-lg
                             rounded-lg text-white font-bold font-orbitron 
                             tracking-wider transition-all duration-300 
                             border-2 border-white/50 hover:border-white">
              <span className="text-[rgb(46,69,144)] hover:text-[rgb(132,204,22)] 
                             font-medium transition-all duration-300 
                             animate-random-text">
                SHOP NOW
              </span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

// Move addSpaceElements function definition outside component
const addSpaceElements = (container) => {
  // Add stars with different sizes
  const starSizes = ['small', 'medium', 'large'];
  for (let i = 0; i < 100; i++) {
    const star = document.createElement('div');
    const size = starSizes[Math.floor(Math.random() * starSizes.length)];
    star.className = `star star--${size}`;
    
    // Improved positioning to avoid clustering
    const angle = Math.random() * Math.PI * 2;
    const distance = 20 + Math.random() * 60; // Keep stars between 20% and 80% of container
    const x = 50 + Math.cos(angle) * distance;
    const y = 50 + Math.sin(angle) * distance;
    
    star.style.left = `${x}%`;
    star.style.top = `${y}%`;
    star.style.animationDelay = `${Math.random() * 3}s`;
    container.appendChild(star);
  }

  // Add meteor
  const meteor = document.createElement('div');
  meteor.className = 'meteor';
  container.appendChild(meteor);

  // Add spaceship
  const spaceship = document.createElement('div');
  spaceship.className = 'spaceship';
  spaceship.style.left = '10%';
  spaceship.style.top = '20%';
  container.appendChild(spaceship);
};

export default memo(Hero);
