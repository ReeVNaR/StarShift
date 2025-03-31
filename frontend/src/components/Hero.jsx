import { memo, useState, useEffect, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { glassButtonClass } from './common/ButtonStyles';

const Hero = () => {
  const [scale, setScale] = useState(getInitialScale());

  function getInitialScale() {
    const width = window.innerWidth;
    if (width < 640) return 0.9; // Mobile
    if (width < 768) return 1.1; // Tablet
    if (width < 1024) return 1.7; // Small desktop
    return 2.2; // Large desktop - increased from 2 to 2.2
  }

  const handleResize = useCallback(() => {
    setScale(getInitialScale());
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  const imageStyle = useMemo(() => ({
    objectPosition: 'center',
    transform: `scale(${scale})`,
    transition: 'transform 0.3s ease-out'
  }), [scale]);

  return (
    <div className="h-[calc(100vh-3rem)] xs:h-screen w-full bg-black flex items-center justify-center overflow-hidden -mt-12">
      <div className="absolute inset-0 flex items-center justify-center -translate-y-6">
        <div className="w-[95%] xs:w-[90%] sm:w-[85%] md:w-[85%] lg:w-[85%] h-[60%] xs:h-[65%] sm:h-[70%] md:h-[85%] lg:h-[85%] relative overflow-hidden">
          <img 
            src="/STARSHIFT LOGO.png" 
            alt="StarShift Logo" 
            className="absolute inset-0 w-full h-full object-contain md:object-cover animate-slide-up hero-logo"
            style={imageStyle}
          />
        </div>
      </div>
      <div className="relative z-10 flex flex-col items-center space-y-4 xs:space-y-6 sm:space-y-8 mt-[40vh] xs:mt-[42vh] sm:mt-[45vh] md:mt-[35vh] px-4 xs:px-0">
        <p className="text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl text-zinc-300 animate-fade-in-delayed font-inter bg-black/50 px-3 xs:px-4 sm:px-6 py-2 xs:py-2 sm:py-3 rounded-full backdrop-blur-sm mx-2 sm:mx-4 text-center max-w-[90vw] xs:max-w-none">
          Your Ultimate Gaming Gear Destination
        </p>
        <div className="animate-bounce-in scale-90 xs:scale-100 sm:scale-105 md:scale-110 transform-gpu">
          <Link to="/products">
            <button className={`${glassButtonClass} text-xs xs:text-sm sm:text-base transform-gpu px-4 xs:px-6`}>
              <span className="relative z-10 tracking-wider font-medium group-hover:text-white whitespace-nowrap">
                SHOP NOW
              </span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

const styleSheet = document.createElement("style");
styleSheet.textContent = `
  .hero-logo {
    mask: linear-gradient(90deg, transparent, white, transparent) 0 0 / 300% 100%;
    -webkit-mask: linear-gradient(90deg, transparent, white, transparent) 0 0 / 300% 100%;
    animation: shine 10s infinite linear, colorCycle 4s infinite ease-in-out, bigPulse 10s infinite ease-in-out;
    filter: brightness(1.3) contrast(1.2) drop-shadow(0 0 20px rgba(255,255,255,0.9));
  }
  .hero-button {
    px-8 py-3 rounded-lg font-semibold text-white relative overflow-hidden transform hover:scale-105 transition-all duration-300;
    font-family: 'Orbitron, sans-serif';
    background: linear-gradient(90deg, #1e40af, #3b82f6, #60a5fa, #1e40af);
    background-size: 300% 100%;
    border: 2px solid rgba(255,255,255,0.3);
    border-radius: 8px;
    box-shadow: 0 0 20px rgba(59,130,246,0.3), inset 0 0 10px rgba(59,130,246,0.2), 0 0 0 1px rgba(59,130,246,0.5);
    animation: rgbCycle 3s linear infinite;
    letter-spacing: 1px;
  }
  @keyframes shine {
    from { mask-position: 200% 0; -webkit-mask-position: 200% 0; }
    to { mask-position: -100% 0; -webkit-mask-position: -100% 0; }
  }
  @keyframes colorCycle {
    0% { filter: brightness(1.2) contrast(1.1) hue-rotate(0deg) saturate(1.3); }
    50% { filter: brightness(1.3) contrast(1.2) hue-rotate(180deg) saturate(1.5); }
    100% { filter: brightness(1.2) contrast(1.1) hue-rotate(360deg) saturate(1.3); }
  }
  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.02); }
    100% { transform: scale(1); }
  }
  @keyframes rgbCycle {
    0% { background-position: 0% 50%; }
    50% { background-position: 75% 50%; }
    100% { background-position: 150% 50%; }
  }
  @keyframes bigPulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }
`;
document.head.appendChild(styleSheet);

export default memo(Hero);
