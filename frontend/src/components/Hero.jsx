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
    <div className="h-[calc(100vh-3rem)] xs:h-screen w-full relative overflow-hidden -mt-12">
      <div className="absolute inset-0">
        {/* Hexagon Grid Pattern - Updated timing */}
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 30 L15 0 L45 0 L60 30 L45 60 L15 60Z' fill='none' stroke='%234B5563' stroke-width='1'/%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px',
            animation: 'hexMove 40s cubic-bezier(0.4, 0, 0.2, 1) infinite'
          }}>
        </div>

        {/* Light Beams - Updated timing and easing */}
        <div className="absolute inset-0">
          <div className="absolute top-0 -left-1/4 w-1/2 h-screen bg-gradient-to-r from-gray-900/0 via-gray-100/5 to-gray-900/0 -rotate-45 transform-gpu" 
            style={{ animation: 'beam-slide 8s cubic-bezier(0.4, 0, 0.2, 1) infinite' }}>
          </div>
          <div className="absolute top-0 -right-1/4 w-1/2 h-screen bg-gradient-to-l from-gray-900/0 via-gray-100/5 to-gray-900/0 rotate-45 transform-gpu"
            style={{ animation: 'beam-slide-reverse 8s cubic-bezier(0.4, 0, 0.2, 1) infinite' }}>
          </div>
        </div>

        {/* Cyberpunk Corner Accents - All corners */}
        <div className="absolute top-0 left-0 w-64 h-64 border-l-2 border-t-2 border-gray-700/30 rounded-tl-3xl animate-corner-pulse"></div>
        <div className="absolute top-0 right-0 w-64 h-64 border-r-2 border-t-2 border-gray-700/30 rounded-tr-3xl animate-corner-pulse delay-300"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 border-l-2 border-b-2 border-gray-700/30 rounded-bl-3xl animate-corner-pulse delay-100"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 border-r-2 border-b-2 border-gray-700/30 rounded-br-3xl animate-corner-pulse delay-200"></div>
        
        {/* Edge Lines */}
        <div className="absolute top-0 left-64 right-64 h-[2px] bg-gray-700/30 animate-corner-pulse delay-400"></div>
        <div className="absolute bottom-0 left-64 right-64 h-[2px] bg-gray-700/30 animate-corner-pulse delay-500"></div>
        <div className="absolute left-0 top-64 bottom-64 w-[2px] bg-gray-700/30 animate-corner-pulse delay-600"></div>
        <div className="absolute right-0 top-64 bottom-64 w-[2px] bg-gray-700/30 animate-corner-pulse delay-700"></div>

        {/* Scanlines with reduced opacity */}
        <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100%_3px]"></div>
      </div>

      {/* Existing Hero Content */}
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

      {/* Updated text styling without animations */}
      <div className="absolute bottom-24 xs:bottom-32 sm:bottom-40 left-0 right-0 flex flex-col items-center gap-6 px-4">
        <p className="text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl 
          text-zinc-200
          font-orbitron font-bold tracking-[0.15em] uppercase
          text-center max-w-[90%] xs:max-w-[80%] md:max-w-[70%] mx-auto">
          Your <span className="text-[rgb(46,69,144)] hover:text-[rgb(132,204,22)] font-medium transition-all duration-300 hover animate-random-text">Ultimate</span> Gaming Gear Destination
        </p>
        <div className="flex flex-col items-center space-y-4">
          <Link to="/products">
            <button className="shop-now-button w-full p-4 rounded-lg text-white font-bold font-orbitron tracking-wider transition-all duration-300 border-2 border-white/50 hover:border-white">
              <span className="text-[rgb(46,69,144)] hover:text-[rgb(132,204,22)] font-medium transition-all duration-300 hover animate-random-text">
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
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700&display=swap');
  
  .hero-logo {
    mask: linear-gradient(90deg, transparent, white, transparent) 0 0 / 300% 100%;
    -webkit-mask: linear-gradient(90deg, transparent, white, transparent) 0 0 / 300% 100%;
    animation: shine 10s infinite linear, colorCycle 4s infinite ease-in-out, bigPulse 10s infinite ease-in-out;
    filter: brightness(1.3) contrast(1.2) drop-shadow(0 0 20px rgba(255,255,255,0.9));
  }
  .shop-now-button {
    background: linear-gradient(
      45deg,
      rgba(255, 255, 255, 0.05),
      rgba(255, 255, 255, 0.1)
    );
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2), 0 1px 3px rgba(0, 0, 0, 0.1),
      inset 0 1px 0 rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  .shop-now-button:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.25), 0 2px 4px rgba(0, 0, 0, 0.15),
      inset 0 1px 0 rgba(255, 255, 255, 0.1);
    background: linear-gradient(
      45deg,
      rgba(255, 255, 255, 0.1),
      rgba(255, 255, 255, 0.15)
    );
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
  @keyframes gridMove {
    0% { background-position: 0 0; }
    100% { background-position: 0 50px; }
  }
  @keyframes hexMove {
    0% { background-position: 0 0; }
    100% { background-position: 60px 60px; }
  }
  @keyframes beam-slide {
    0% { transform: translateX(-200%) rotate(-45deg); opacity: 0; }
    20% { opacity: 1; }
    80% { opacity: 1; }
    100% { transform: translateX(200%) rotate(-45deg); opacity: 0; }
  }
  @keyframes beam-slide-reverse {
    0% { transform: translateX(200%) rotate(45deg); opacity: 0; }
    20% { opacity: 1; }
    80% { opacity: 1; }
    100% { transform: translateX(-200%) rotate(45deg); opacity: 0; }
  }
  @keyframes corner-pulse {
    0%, 100% { border-color: rgba(55, 65, 81, 0.3); }
    50% { border-color: rgba(156, 163, 175, 0.5); }
  }
`;
document.head.appendChild(styleSheet);

export default memo(Hero);
