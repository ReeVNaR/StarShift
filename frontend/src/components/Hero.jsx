import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="bg-indigo-600">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
            Welcome to StarShift
          </h1>
          <p className="mt-4 text-xl text-indigo-100">
            Your Ultimate Gaming Gear Destination
          </p>
          <div className="mt-8">
            <Link to="/products">
              <button className="bg-white text-indigo-600 px-8 py-3 rounded-md font-semibold hover:bg-indigo-50 transition-colors duration-200">
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
