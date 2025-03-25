import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="h-full bg-black flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center">
          <h1 
            className="text-3xl sm:text-4xl md:text-5xl tracking-wider relative animate-slide-up"
            style={{ 
              fontFamily: 'Orbitron, sans-serif',
              fontWeight: 800,
              background: 'linear-gradient(90deg, #3B82F6, #60A5FA)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent'
            }}
          >
            Welcome to StarShift
          </h1>
          <p className="mt-2 text-lg text-zinc-300 animate-fade-in-delayed" style={{ fontFamily: 'Inter, sans-serif' }}>
            Your Ultimate Gaming Gear Destination
          </p>
          <div className="mt-4 animate-bounce-in">
            <Link to="/products">
              <button 
                className="px-6 py-2 rounded-md font-semibold text-white hover:animate-pulse-glow"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  background: 'linear-gradient(45deg, #3B82F6, #60A5FA)',
                  boxShadow: '0 0 15px rgba(59, 130, 246, 0.5)',
                }}
              >
                Shop Now
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
