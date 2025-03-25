import { useEffect, useState } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useTheme } from "../context/ThemeContext";
import { useCart } from '../context/CartContext';
import LoadingSpinner from "../components/LoadingSpinner";

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
    <div className="min-h-screen bg-black">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className={`text-3xl font-bold mb-8 ${theme.text} animate-fade-in-down`}>
          {category ? `${category} Products` : 'All Products'}
        </h1>
        
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
                className="group bg-zinc-900/50 rounded-xl overflow-hidden border border-zinc-800/50 hover:border-blue-500/50 transition-all duration-300 animate-pop-in shadow-xl hover:-translate-y-1 hover:shadow-2xl"
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
