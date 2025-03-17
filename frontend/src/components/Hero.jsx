import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="bg-black">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
            Welcome to StarShift
          </h1>
          <p className="mt-4 text-xl text-zinc-400">
            Your Ultimate Gaming Gear Destination
          </p>
          <div className="mt-8">
            <Link to="/products">
              <button className="bg-blue-600 text-white px-8 py-3 rounded-md font-semibold hover:bg-blue-700 transition-colors duration-200">
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
