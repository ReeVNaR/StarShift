import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useTheme } from "../context/ThemeContext";
import { useCart } from '../context/CartContext';
import LoadingSpinner from "../components/LoadingSpinner";
import { glassButtonClass } from '../components/common/ButtonStyles';

const Categories = () => {
  const [categorizedProducts, setCategorizedProducts] = useState({});
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const categoryOrder = ['gaming', 'accessories', 'apparel', 'furniture'];

  useEffect(() => {
    axios.get("http://localhost:5000/products")
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
      .hexagon-grid {
        position: absolute;
        inset: 0;
        opacity: 0.05;
        background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 30 L15 0 L45 0 L60 30 L45 60 L15 60Z' fill='none' stroke='%234B5563' stroke-width='1'/%3E%3C/svg%3E");
        background-size: 60px 60px;
        animation: hexMove 40s linear infinite;
      }

      .product-card {
        position: relative;
        overflow: hidden;
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05), rgba(0, 0, 0, 0.3));
        backdrop-filter: blur(16px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.5), inset 0 0 80px rgba(255, 255, 255, 0.05);
        animation: boxGlow 4s ease-in-out infinite;
      }

      @keyframes boxGlow {
        0%, 100% { 
          border-color: rgba(255, 255, 255, 0.05);
          box-shadow: 0 0 20px rgba(0, 0, 0, 0.5),
                      inset 0 0 80px rgba(255, 255, 255, 0.03);
        }
        50% { 
          border-color: rgba(16, 185, 129, 0.1);
          box-shadow: 0 0 30px rgba(0, 0, 0, 0.6),
                      inset 0 0 100px rgba(16, 185, 129, 0.05);
        }
      }

      @keyframes glowPulse {
        0%, 100% { opacity: 1; box-shadow: 0 0 10px rgba(16, 185, 129, 0.5); }
        50% { opacity: 0.8; box-shadow: 0 0 20px rgba(16, 185, 129, 0.8); }
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
    <div className="min-h-screen bg-black">
      <Navbar />
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 -left-1/4 w-1/2 h-full bg-gradient-to-r from-gray-900/0 via-gray-100/5 to-gray-900/0 -rotate-45 transform-gpu"
               style={{ animation: "beam-slide 8s cubic-bezier(0.4, 0, 0.2, 1) infinite" }}>
          </div>
          <div className="absolute top-0 -right-1/4 w-1/2 h-full bg-gradient-to-l from-gray-900/0 via-gray-100/5 to-gray-900/0 rotate-45 transform-gpu"
               style={{ animation: "beam-slide-reverse 8s cubic-bezier(0.4, 0, 0.2, 1) infinite" }}>
          </div>
        </div>

        <div className="hexagon-grid"></div>
        <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100%_3px]"></div>

        <div className="max-w-7xl mx-auto px-4 py-8 relative z-10">
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white font-orbitron tracking-wider text-center mb-12"
              style={{ animation: "textGlow 3s ease-in-out infinite, floatEffect 6s ease-in-out infinite" }}>
            Categories
            <div className="w-32 h-1 bg-emerald-500 rounded mx-auto mt-4"
                 style={{ animation: "glowPulse 2s ease-in-out infinite" }}></div>
          </h1>

          {loading ? (
            <div className="flex justify-center items-center h-48">
              <LoadingSpinner />
            </div>
          ) : (
            <div className="space-y-12">
              {sortedCategories.map(([category, products]) => (
                <div key={category} className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl text-emerald-400 font-orbitron tracking-wide capitalize">
                      {category}
                    </h2>
                    <Link 
                      to={`/products?category=${category}`}
                      className="text-[rgb(46,69,144)] hover:text-[rgb(132,204,22)] font-medium transition-all duration-300 hover:underline animate-random-text"
                    >
                      View All →
                    </Link>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.slice(0, 3).map((product, index) => (
                      <div 
                        key={product._id} 
                        className="product-card rounded-lg overflow-hidden"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className="aspect-square overflow-hidden">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700"
                          />
                        </div>
                        <div className="p-4 bg-black/60 backdrop-blur-md">
                          <h3 className="text-lg font-medium text-gray-200 hover:text-emerald-400 transition-colors duration-300">
                            {product.name}
                          </h3>
                          <p className="mt-2 text-xl font-bold text-emerald-400">
                            ${product.price.toFixed(2)}
                          </p>
                          <button 
                            onClick={(e) => handleAddToCart(e, product._id)}
                            className="w-full mt-4 p-4 rounded-lg bg-black/60 backdrop-blur-md border-2 border-[rgb(21,128,61)]/20 text-white hover:border-[rgb(34,197,94)]/40 focus:ring-2 focus:ring-[rgb(21,128,61)]/10 transition-all duration-300"
                          >
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Categories;
