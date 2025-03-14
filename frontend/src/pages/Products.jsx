import { useEffect, useState } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useTheme } from "../context/ThemeContext";
import { useCart } from '../context/CartContext';

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
        // First ensure products are seeded
        await axios.post("http://localhost:5000/seed-products");
        
        // Then fetch products
        const url = category 
          ? `http://localhost:5000/products?category=${category}`
          : "http://localhost:5000/products";
        
        const response = await axios.get(url);
        console.log('Products fetched:', response.data);
        setProducts(response.data.products);
        setLoading(false);
      } catch (err) {
        console.error('Error:', err);
        setError('Failed to load products');
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

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
    <div className={`min-h-screen bg-gradient-to-br ${theme.primary}`}>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className={`text-3xl font-bold mb-8 ${theme.text}`}>
          {category ? `${category.charAt(0).toUpperCase() + category.slice(1)} Products` : 'All Products'}
        </h1>
        {loading ? (
          <div className="text-white text-center">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product._id} className={`${theme.secondary} rounded-lg shadow-xl ${theme.border} transform hover:scale-[1.02] transition-all duration-200`}>
                <Link to={`/product/${product._id}`} className="block">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover rounded-t-lg hover:opacity-90 transition-opacity"
                  />
                  <div className="p-6">
                    <h2 className="text-xl font-bold text-white mb-2 hover:text-blue-400 transition-colors">{product.name}</h2>
                    <p className={`${theme.text} mb-4`}>${product.price.toFixed(2)}</p>
                    <p className="text-gray-400 mb-4">{product.description}</p>
                  </div>
                </Link>
                <div className="px-6 pb-6">
                  <button 
                    onClick={(e) => handleAddToCart(e, product._id)}
                    className={`w-full ${theme.accent} text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200`}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
