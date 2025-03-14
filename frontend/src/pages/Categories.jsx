import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useTheme } from "../context/ThemeContext";
import { useCart } from '../context/CartContext';

const Categories = () => {
  const [categorizedProducts, setCategorizedProducts] = useState({});
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  // Add category order
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

  // Sort categories based on priority order
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
    <div className={`min-h-screen bg-gradient-to-br ${theme.primary}`}>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className={`text-3xl font-bold mb-8 ${theme.text}`}>Categories</h1>
        {loading ? (
          <div className="text-white text-center">Loading...</div>
        ) : (
          <div className="space-y-12">
            {sortedCategories.map(([category, products]) => (
              <div key={category} className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-white capitalize">{category}</h2>
                  <Link 
                    to={`/products?category=${category}`}
                    className={`${theme.text} hover:text-blue-300`}
                  >
                    View All →
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.slice(0, 3).map((product) => (
                    <div key={product._id} className={`${theme.secondary} rounded-lg shadow-xl ${theme.border}`}>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      <div className="p-4">
                        <h3 className="text-lg font-bold text-white">{product.name}</h3>
                        <p className={`${theme.text} mt-1`}>${product.price.toFixed(2)}</p>
                        <button 
                          onClick={(e) => handleAddToCart(e, product._id)}
                          className={`mt-4 w-full ${theme.accent} text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200`}
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
