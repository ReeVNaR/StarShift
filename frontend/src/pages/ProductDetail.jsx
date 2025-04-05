import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import LoadingSpinner from "../components/LoadingSpinner";
import { glassButtonClass } from '../components/common/ButtonStyles';

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const theme = useTheme();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Attempting to fetch product with ID:', id);
    axios.get(`http://localhost:5000/products/${id}`)
      .then(res => {
        console.log('Raw API response:', res.data);
        if (res.data.product) {
          setProduct(res.data.product);
        } else {
          setError('Product data is missing');
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('API Error:', err.response?.data || err.message);
        setError('Failed to load product details');
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/signin');
      return;
    }
    await addToCart(id);
  };

  return (
    <div className="min-h-screen bg-black bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-900 via-black to-black">
      <Navbar />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header section */}
        <div className="relative mb-16">
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2">
            <div className="flex items-center justify-center space-x-4">
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent"></div>
              <div className="w-3 h-3 border-2 border-emerald-500 transform rotate-45"></div>
              <div className="w-48 h-px bg-emerald-500"></div>
              <div className="w-3 h-3 border-2 border-emerald-500 transform rotate-45"></div>
              <div className="w-24 h-px bg-gradient-to-l from-transparent via-emerald-500 to-transparent"></div>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-center text-white font-orbitron relative inline-block w-full">
            <span className="relative z-10 px-8 py-2 bg-black">Product Details</span>
          </h1>
        </div>

        {/* Product Content */}
        {loading ? (
          <div className="flex justify-center items-center h-[calc(100vh-4rem)]">
            <LoadingSpinner />
          </div>
        ) : error ? (
          <div className="text-red-400 text-center mt-10">
            {error}
            <button 
              onClick={() => navigate('/products')}
              className="ml-4 text-blue-400 hover:text-blue-300"
            >
              Back to Products
            </button>
          </div>
        ) : (
          <div className="relative overflow-hidden rounded-2xl mx-auto max-w-5xl"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05), rgba(0, 0, 0, 0.3))',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 0 20px rgba(0, 0, 0, 0.5), inset 0 0 80px rgba(255, 255, 255, 0.05)'
            }}>
            <div className="grid lg:grid-cols-2 gap-12 p-8">
              <div className="space-y-6">
                <div className="overflow-hidden rounded-lg shadow-lg">
                  <img
                    src={product?.image}
                    alt={product?.name}
                    className="w-full h-96 object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="grid grid-cols-4 gap-4">
                  {[1, 2, 3, 4].map((_, index) => (
                    <div key={index} className="overflow-hidden rounded-lg shadow-md">
                      <img 
                        src={product?.image} 
                        alt={`Thumbnail ${index + 1}`} 
                        className="w-full h-20 object-cover hover:scale-110 transition-transform duration-300" 
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-8">
                <h1 className="text-4xl font-bold text-white">{product?.name}</h1>
                <p className="text-3xl font-semibold text-emerald-400">${product?.price?.toFixed(2)}</p>
                <div className="bg-black/50 p-6 rounded-lg border border-emerald-500/20 hover:border-emerald-500/50 transition-all duration-300">
                  <h3 className="text-xl font-semibold text-white mb-4">Description</h3>
                  <p className="text-gray-300">{product?.description}</p>
                </div>
                <div className="bg-black/50 p-6 rounded-lg border border-emerald-500/20 hover:border-emerald-500/50 transition-all duration-300">
                  <h3 className="text-xl font-semibold text-white mb-4">Category</h3>
                  <p className="text-gray-300 capitalize">{product?.category}</p>
                </div>
                <button 
                  onClick={handleAddToCart}
                  className={`${glassButtonClass} w-full py-3 text-lg`}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
