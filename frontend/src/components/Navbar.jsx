import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const theme = useTheme();
  const { cartItems } = useCart();
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const navigationLinks = [
    { name: 'Products', path: '/products' },
    { name: 'Categories', path: '/categories' },
    { name: 'Profile', path: '/profile' },
    // Add more navigation items as needed
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out"
        style={{
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05), rgba(0, 0, 0, 0.3))',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 0 20px rgba(0, 0, 0, 0.5), inset 0 0 80px rgba(255, 255, 255, 0.05)'
        }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Update Logo Link */}
            <Link to="/" className="transform hover:scale-105 transition-transform duration-200">
              <img 
                src="/STARSHIFT LOGO 1.svg" 
                alt="StarShift" 
                className="h-12 w-auto drop-shadow-[0_0_15px_rgba(139,92,246,0.8)]"
                style={{ filter: 'brightness(1.2) contrast(1.1)' }}
              />
            </Link>
            
            <div className="flex items-center space-x-4">
              {/* Cart Icon - Visible on all screens */}
              <Link to="/cart" className="relative group">
                <span className="absolute -top-2 -right-2 animate-random-text rounded-full w-5 h-5 flex items-center justify-center text-xs text-white">
                  {cartCount}
                </span>
                <svg className="w-6 h-6 cart-icon animate-random-text transition-all duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </Link>

              {/* Mobile menu button */}
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-md text-gray-300 hover:text-white animate-random-text"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>

              {/* Desktop Menu */}
              <div className="hidden md:flex items-center space-x-8">
                {navigationLinks.map((link, index) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className="nav-link relative group"
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <span className="text-gray-300 group-hover:text-white transition-all duration-200">
                      {link.name}
                    </span>
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-200 shadow-[0_0_10px_#fff,0_0_20px_#fff] opacity-80"></span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Menu - Without Cart */}
          <div 
            className={`${
              isMenuOpen ? 'visible opacity-100' : 'invisible opacity-0'
            } md:hidden fixed inset-x-0 top-16 transition-all duration-300 ease-in-out`}
          >
            <div style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05), rgba(0, 0, 0, 0.3))',
              backdropFilter: 'blur(16px)',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 0 20px rgba(0, 0, 0, 0.5), inset 0 0 80px rgba(255, 255, 255, 0.05)'
            }}>
              <div className="max-w-7xl mx-auto">
                <div className="flex flex-col space-y-2 p-4">
                  {['Products', 'Categories', 'Profile'].map((item) => (
                    <Link 
                      key={item} 
                      to={`/${item.toLowerCase()}`} 
                      className="relative group px-4 py-3 rounded-md overflow-hidden"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span className="text-gray-300 group-hover:text-white transition-all duration-200">
                        {item}
                      </span>
                      <span className="absolute bottom-0 left-2 right-2 h-[2px] bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 shadow-[0_0_10px_#fff,0_0_20px_#fff] opacity-80"></span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div className="h-16"></div>
    </>
  );
};

export default Navbar;
