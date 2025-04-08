import { useEffect, useState } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useTheme } from "../context/ThemeContext";
import { useCart } from '../context/CartContext';
import LoadingSpinner from "../components/LoadingSpinner";
import { glassButtonClass } from '../components/common/ButtonStyles';
import api from '../services/api';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const theme = useTheme();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = category 
          ? await api.products.getByCategory(category)
          : await api.products.getAll();
        
        if (response.data.products) {
          setProducts(response.data.products);
        } else {
          setProducts([]);
        }
        setLoading(false);
      } catch (err) {
        console.error('Error:', err);
        setError('Failed to load products');
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

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

      @keyframes glow {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.6; }
      }

      @keyframes text-shine {
        0% { background-position: 100%; }
        100% { background-position: 0%; }
      }

      .animate-glow {
        animation: glow 2s ease-in-out infinite;
      }

      .animate-text-shine {
        background-size: 200% auto;
        animation: text-shine 3s linear infinite;
      }
    `;
    document.head.appendChild(styleSheet);
    return () => document.head.removeChild(styleSheet);
  }, []);

  const handleAddToCart = async (e, productId) => {
    e.preventDefault();
    e.stopPropagation();
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/signin');
      return;
    }
    await addToCart(productId);
  };

  if (error) return (
    <div className={`min-h-screen bg-gradient-to-br ${theme.primary}`}>
      <Navbar />
      <div className="text-red-400 text-center mt-10">{error}</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900/20 via-black to-black">
      <Navbar />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Cyber decorative elements */}
        <div className="absolute top-0 left-0 w-64 h-64 -translate-x-1/2 -translate-y-1/2">
          <div className="absolute inset-0 border border-gray-500/20 transform rotate-45"></div>
          <div className="absolute inset-4 border border-gray-500/20 transform rotate-45"></div>
          <div className="absolute inset-8 border border-gray-500/20 transform rotate-45"></div>
        </div>

        {/* Header section */}
        <div className="relative mb-16">
          <div className="absolute inset-0 flex items-center">
            <div className="h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent w-full"></div>
          </div>
          <div className="relative flex justify-center">
            <div className="bg-black px-6 py-2 transform skew-x-12">
              <h1 className="text-4xl font-bold text-center font-orbitron transform -skew-x-12">
                <span className="relative z-10 text-white">
                  {category ? `${category} Products` : 'All Products'}
                </span>
              </h1>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-48">
            <LoadingSpinner />
          </div>
        ) : (
          <div className="relative">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
              {products.map((product, index) => (
                <Link
                  key={product._id}
                  to={`/product/${product._id}`}
                  className="product-card group relative overflow-hidden bg-black/30 border border-gray-500/20 hover:border-gray-500/50 transition-all duration-300"
                  style={{
                    clipPath: 'polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)',
                    animationDelay: `${index * 100}ms`
                  }}
                >
                  {/* Hover effect overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-500/0 to-gray-500/0 group-hover:from-gray-500/10 group-hover:to-gray-500/5 transition-all duration-500"></div>
                  
                  {/* Corner decorations */}
                  <div className="absolute top-0 left-0 w-6 h-6">
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-gray-500/50 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                    <div className="absolute top-0 left-0 h-full w-[2px] bg-gray-500/50 origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-300 delay-150"></div>
                  </div>
                  <div className="absolute top-0 right-0 w-6 h-6">
                    <div className="absolute top-0 right-0 w-full h-[2px] bg-gray-500/50 origin-right scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                    <div className="absolute top-0 right-0 h-full w-[2px] bg-gray-500/50 origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-300 delay-150"></div>
                  </div>
                  <div className="absolute bottom-0 left-0 w-6 h-6">
                    <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gray-500/50 origin-right scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                    <div className="absolute bottom-0 left-0 h-full w-[2px] bg-gray-500/50 origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-300 delay-150"></div>
                  </div>
                  <div className="absolute bottom-0 right-0 w-6 h-6">
                    <div className="absolute bottom-0 right-0 w-full h-[2px] bg-gray-500/50 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                    <div className="absolute bottom-0 right-0 h-full w-[2px] bg-gray-500/50 origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-300 delay-150"></div>
                  </div>

                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                  </div>
                  <div className="p-6 relative">
                    <h3 className="text-xl font-medium text-white group-hover:text-gray-400 transition-colors duration-200 font-orbitron">
                      {product.name}
                    </h3>
                    <p className="mt-2 text-2xl font-bold text-gray-500">
                      ${product.price.toFixed(2)}
                    </p>
                    <button 
                      onClick={(e) => handleAddToCart(e, product._id)}
                      className="mt-4 w-full py-2 px-4 bg-gray-500/10 border border-gray-500/30 text-gray-400 hover:text-gray-300 hover:border-gray-500/50 hover:bg-gray-500/20 transition-all duration-300 font-orbitron text-sm uppercase tracking-wider"
                      style={{
                        clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)'
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>
                </Link>
              ))}
            </div>
            
            {/* Background grid effect */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(128,128,128,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(128,128,128,0.1)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_80%)] pointer-events-none"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;