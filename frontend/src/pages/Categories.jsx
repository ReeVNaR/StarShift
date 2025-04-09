import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useTheme } from "../context/ThemeContext";
import { useCart } from '../context/CartContext';
import LoadingSpinner from "../components/LoadingSpinner";
import { glassButtonClass } from '../components/common/ButtonStyles';
import api from '../services/api';

const Categories = () => {
  const [categorizedProducts, setCategorizedProducts] = useState({});
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const categoryOrder = ['gaming', 'accessories', 'apparel', 'furniture'];

  useEffect(() => {
    api.products.getAll()
      .then(res => {
        const products = res.data.products;
        const grouped = products.reduce((acc, product) => {
          if (!acc[product.category]) {
            acc[product.category] = [];
          }
          acc[product.category].push(product);
          return acc;
        }, {});
        setCategorizedProducts(grouped);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.textContent = `
      .product-card {
        animation: fadeIn 0.5s ease-out forwards;
        opacity: 0;
      }

      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
    `;
    document.head.appendChild(styleSheet);
    return () => document.head.removeChild(styleSheet);
  }, []);

  const sortedCategories = Object.entries(categorizedProducts).sort(([a], [b]) => {
    return categoryOrder.indexOf(a) - categoryOrder.indexOf(b);
  });

  const handleAddToCart = async (e, productId) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/signin');
      return;
    }
    await addToCart(productId);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] bg-[url('/cyber-grid.png')] bg-fixed">
      <Navbar />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* ROG-style header */}
        <div className="relative mb-16">
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2">
            <div className="flex items-center justify-center space-x-4">
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>
              <div className="w-3 h-3 border-2 border-gray-600 transform rotate-45"></div>
              <div className="w-48 h-px bg-gray-600"></div>
              <div className="w-3 h-3 border-2 border-gray-600 transform rotate-45"></div>
              <div className="w-24 h-px bg-gradient-to-l from-transparent via-gray-600 to-transparent"></div>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-center text-white font-orbitron relative inline-block w-full">
            <span className="relative z-10 px-8 py-2 bg-[#0A0A0A]">CATEGORIES</span>
          </h1>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-48">
            <LoadingSpinner />
          </div>
        ) : (
          <div className="space-y-16">
            {sortedCategories.map(([category, products]) => (
              <div key={category} className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl text-gray-600 font-orbitron uppercase px-4 py-2 relative clip-path-title">
                    {category}
                    <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-gray-600"></span>
                  </h2>
                  <Link 
                    to={`/products?category=${category}`}
                    className="text-gray-600 hover:text-gray-500 font-medium transition-all duration-300 skew-x-[-15deg] hover:tracking-wider"
                  >
                    VIEW ALL →
                  </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {products.slice(0, 4).map((product, index) => (
                    <Link
                      key={product._id}
                      to={`/product/${product._id}`}
                      className="product-card group relative overflow-hidden transform transition-all duration-300 hover:-translate-y-1"
                      style={{ 
                        background: 'linear-gradient(135deg, rgba(128, 128, 128, 0.1), rgba(0, 0, 0, 0.9))',
                        clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%)',
                        animationDelay: `${index * 100}ms` 
                      }}
                    >
                      <div className="aspect-square overflow-hidden bg-black">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                      </div>
                      <div className="p-4 bg-gradient-to-t from-black/90 to-transparent">
                        <h3 className="text-lg font-medium text-white group-hover:text-gray-500 transition-colors duration-200 font-orbitron line-clamp-1">
                          {product.name}
                        </h3>
                        <p className="mt-2 text-xl font-bold text-gray-600">
                          ₹{product.price.toFixed(2)}
                        </p>
                        <div className="relative mt-4">
                          <button 
                            onClick={(e) => handleAddToCart(e, product._id)}
                            className="w-full py-2.5 px-4 bg-gray-600 hover:bg-gray-700
                            transition-all duration-300 relative font-orbitron text-sm
                            tracking-wider uppercase text-white skew-x-[-5deg] hover:scale-105
                            before:content-[''] before:absolute before:inset-0
                            before:bg-gradient-to-r before:from-transparent before:via-white/20
                            before:to-transparent before:translate-x-[-200%] hover:before:translate-x-[200%]
                            before:transition-transform before:duration-700"
                          >
                            Add to Cart
                          </button>
                        </div>
                      </div>
                      <div className="absolute top-0 right-0 w-20 h-20 bg-gray-600 clip-path-corner transform translate-x-10 -translate-y-10"></div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <style>{`
        .clip-path-title {
          clip-path: polygon(0 0, 100% 0, 95% 100%, 0 100%);
        }
        .clip-path-corner {
          clip-path: polygon(0 0, 100% 0, 100% 100%);
        }
      `}</style>
    </div>
  );
};

export default Categories;
