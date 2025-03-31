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
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-8 relative inline-block">
          Categories
          <div className="absolute -bottom-2 left-0 w-32 h-1 bg-gradient-to-r from-blue-500 to-transparent"></div>
          <div className="absolute -bottom-2 left-0 w-32 h-1 bg-gradient-to-r from-blue-500 to-transparent animate-pulse-glow"></div>
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
                  <h2 className="text-2xl font-bold text-white capitalize relative inline-block">
                    {category}
                    <div className="absolute -bottom-1 left-0 w-24 h-0.5 bg-gradient-to-r from-blue-500 to-transparent"></div>
                  </h2>
                  <Link 
                    to={`/products?category=${category}`}
                    className="text-blue-400 hover:text-blue-300 transition-colors duration-300"
                  >
                    View All →
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.slice(0, 3).map((product, index) => (
                    <div 
                      key={product._id} 
                      className="bg-zinc-900/90 rounded-xl overflow-hidden border border-zinc-800/50 group hover:border-blue-500/50 transition-all duration-300 animate-pop-in shadow-xl hover:-translate-y-1"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="aspect-square overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                        />
                      </div>
                      <div className="p-4 bg-gradient-to-b from-zinc-900/90 to-zinc-900">
                        <h3 className="text-lg font-medium text-gray-200 group-hover:text-blue-400 transition-colors duration-200 line-clamp-2">
                          {product.name}
                        </h3>
                        <p className="mt-2 text-xl font-bold text-blue-400">
                          ${product.price.toFixed(2)}
                        </p>
                        <button 
                          onClick={(e) => handleAddToCart(e, product._id)}
                          className={`${glassButtonClass} w-full mt-4`}
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
  );
};

export default Categories;
