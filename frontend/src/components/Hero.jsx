import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="h-full bg-black flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center relative">
          <img 
            src="/STARSHIFT LOGO.png" 
            alt="StarShift Logo" 
            className="mx-auto w-82 md:w-106 animate-slide-up"
            style={{
              mask: 'linear-gradient(90deg, transparent, white, transparent) 0 0 / 300% 100%',
              WebkitMask: 'linear-gradient(90deg, transparent, white, transparent) 0 0 / 300% 100%',
              animation: 'shine 10s infinite linear, colorCycle 4s infinite ease-in-out, pulse 10s infinite ease-in-out',
              filter: 'brightness(1.2) contrast(1.1) drop-shadow(0 0 15px rgba(255,255,255,0.8))'
            }}
          />
          <div className="absolute inset-0 flex flex-col items-center" style={{ marginTop: '60%' }}>
            <p className="text-lg text-zinc-300 animate-fade-in-delayed" style={{ fontFamily: 'Inter, sans-serif' }}>
              Your Ultimate Gaming Gear Destination
            </p>
            <div className="mt-4 animate-bounce-in">
              <Link to="/products">
                <button 
                  className="px-8 py-3 rounded-lg font-semibold text-white relative overflow-hidden transform hover:scale-105 transition-all duration-300"
                  style={{
                    fontFamily: 'Orbitron, sans-serif',
                    background: 'linear-gradient(90deg, #1e40af, #3b82f6, #60a5fa, #1e40af)',
                    backgroundSize: '300% 100%',
                    border: '2px solid rgba(255,255,255,0.3)',
                    borderRadius: '8px',
                    boxShadow: '0 0 20px rgba(59,130,246,0.3), inset 0 0 10px rgba(59,130,246,0.2), 0 0 0 1px rgba(59,130,246,0.5)',
                    animation: 'rgbCycle 3s linear infinite',
                    letterSpacing: '1px',
                    position: 'relative',
                  }}
                >
                  <span className="relative z-10 tracking-wider text-sm">SHOP NOW</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styleSheet = document.createElement("style");
styleSheet.textContent = `
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
  @keyframes neonPulse {
    0% { 
      background: linear-gradient(45deg, rgba(88,28,135,0.8), rgba(67,56,202,0.8));
      border-color: rgba(139,92,246,0.5);
      box-shadow: 0 0 20px rgba(139,92,246,0.3), inset 0 0 15px rgba(139,92,246,0.2);
    }
    25% {
      background: linear-gradient(45deg, rgba(76,29,149,0.8), rgba(79,70,229,0.8));
      border-color: rgba(148,108,247,0.5);
      box-shadow: 0 0 22px rgba(148,108,247,0.35), inset 0 0 17px rgba(148,108,247,0.25);
    }
    50% { 
      background: linear-gradient(45deg, rgba(67,56,202,0.8), rgba(88,28,135,0.8));
      border-color: rgba(167,139,250,0.5);
      box-shadow: 0 0 25px rgba(167,139,250,0.4), inset 0 0 20px rgba(167,139,250,0.3);
    }
    75% {
      background: linear-gradient(45deg, rgba(79,70,229,0.8), rgba(76,29,149,0.8));
      border-color: rgba(148,108,247,0.5);
      box-shadow: 0 0 22px rgba(148,108,247,0.35), inset 0 0 17px rgba(148,108,247,0.25);
    }
    100% { 
      background: linear-gradient(45deg, rgba(88,28,135,0.8), rgba(67,56,202,0.8));
      border-color: rgba(139,92,246,0.5);
      box-shadow: 0 0 20px rgba(139,92,246,0.3), inset 0 0 15px rgba(139,92,246,0.2);
    }
  }
  @keyframes rgbCycle {
    0% { 
      background-position: 0% 50%; 
      box-shadow: 0 0 20px rgba(59,130,246,0.3), inset 0 0 10px rgba(59,130,246,0.2), 0 0 0 1px rgba(59,130,246,0.5);
      border-color: rgba(255,255,255,0.3);
    }
    50% { 
      background-position: 75% 50%; 
      box-shadow: 0 0 25px rgba(59,130,246,0.4), inset 0 0 15px rgba(59,130,246,0.3), 0 0 0 1px rgba(96,165,250,0.6);
      border-color: rgba(255,255,255,0.4);
    }
    100% { 
      background-position: 150% 50%; 
      box-shadow: 0 0 20px rgba(59,130,246,0.3), inset 0 0 10px rgba(59,130,246,0.2), 0 0 0 1px rgba(59,130,246,0.5);
      border-color: rgba(255,255,255,0.3);
    }
  }
`;
document.head.appendChild(styleSheet);

export default Hero;
