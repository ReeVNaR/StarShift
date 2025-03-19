import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="bg-black">
      <div className="max-w-7xl mx-auto pt-8 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 
            className="text-4xl sm:text-5xl md:text-6xl tracking-wider relative"
            style={{ 
              fontFamily: 'Orbitron, sans-serif',
              fontWeight: 800,
              background: 'linear-gradient(90deg, #3B82F6, #60A5FA)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
              textShadow: '0 0 20px rgba(59, 130, 246, 0.5)',
              animation: 'pulse 2s ease-in-out infinite'
            }}
          >
            Welcome to StarShift
          </h1>
          <p className="mt-4 text-xl text-zinc-300" style={{ fontFamily: 'Inter, sans-serif' }}>
            Your Ultimate Gaming Gear Destination
          </p>
          <div className="mt-8">
            <Link to="/products">
              <button 
                className="px-8 py-3 rounded-md font-semibold transition-all duration-300"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  background: 'linear-gradient(45deg, #3B82F6, #60A5FA)',
                  boxShadow: '0 0 15px rgba(59, 130, 246, 0.5)',
                  transform: 'scale(1)',
                }}
                onMouseEnter={e => e.target.style.transform = 'scale(1.05)'}
                onMouseLeave={e => e.target.style.transform = 'scale(1)'}
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
