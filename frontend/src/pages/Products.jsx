import { useEffect, useState } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useTheme } from "../context/ThemeContext";
import { useCart } from '../context/CartContext';
import LoadingSpinner from "../components/LoadingSpinner";
import { glassButtonClass } from '../components/common/ButtonStyles';

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
        const url = category 
          ? `http://localhost:5000/products?category=${category}`
          : "http://localhost:5000/products";
        
        const response = await axios.get(url);
        
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
      .hexagon-grid {
        position: absolute;
        inset: 0;
        background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 30 L15 0 L45 0 L60 30 L45 60 L15 60Z' fill='none' stroke='%234B5563' stroke-width='1'/%3E%3C/svg%3E");
        background-size: 60px 60px;
        opacity: 0.1;
        animation: hexMove 40s linear infinite;
      }

      @keyframes hexMove {
        0% { background-position: 0 0; }
        100% { background-position: 60px 60px; }
      }

      @keyframes beam-slide {
        0% { transform: translateX(-100%) rotate(-45deg); }
        100% { transform: translateX(100%) rotate(-45deg); }
      }

      @keyframes beam-slide-reverse {
        0% { transform: translateX(100%) rotate(45deg); }
        100% { transform: translateX(-100%) rotate(45deg); }
      }

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
    <div className="min-h-screen bg-black overflow-hidden">
      <Navbar />
      <div className="absolute inset-0">
        <div className="hexagon-grid"></div>
        <div
          className="absolute top-0 -left-1/4 w-1/2 h-full bg-gradient-to-r from-gray-900/0 via-gray-100/5 to-gray-900/0 -rotate-45 transform-gpu"
          style={{ animation: "beam-slide 8s cubic-bezier(0.4, 0, 0.2, 1) infinite" }}
        ></div>
        <div
          className="absolute top-0 -right-1/4 w-1/2 h-full bg-gradient-to-l from-gray-900/0 via-gray-100/5 to-gray-900/0 rotate-45 transform-gpu"
          style={{ animation: "beam-slide-reverse 8s cubic-bezier(0.4, 0, 0.2, 1) infinite" }}
        ></div>
        <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100%_3px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center mb-8">
          <div className="w-12 h-1 bg-emerald-500 rounded mr-4 animate-pulse"></div>
          <h1 className="text-3xl font-bold text-white font-orbitron relative">
            {category ? `${category} Products` : 'All Products'}
          </h1>
          <div className="w-12 h-1 bg-emerald-500 rounded ml-4 animate-pulse"></div>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-48">
            <LoadingSpinner />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <Link
                key={product._id}
                to={`/product/${product._id}`}
                className="product-card group bg-zinc-900/50 backdrop-blur-sm rounded-xl overflow-hidden border border-zinc-800/50 hover:border-emerald-500/50 transition-all duration-300 shadow-xl hover:-translate-y-1 hover:shadow-2xl"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="p-4 bg-gradient-to-b from-zinc-900/90 to-black">
                  <h3 className="text-lg font-medium text-gray-200 group-hover:text-emerald-400 transition-colors duration-200 line-clamp-2 font-orbitron">
                    {product.name}
                  </h3>
                  <p className="mt-2 text-xl font-bold text-emerald-400">
                    ${product.price.toFixed(2)}
                  </p>
                  <button 
                    onClick={(e) => handleAddToCart(e, product._id)}
                    className={`${glassButtonClass} w-full mt-4 hover:bg-emerald-500/10 hover:border-emerald-500/50`}
                  >
                    Add to Cart
                  </button>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
