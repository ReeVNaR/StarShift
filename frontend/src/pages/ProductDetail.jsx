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
    <div className="min-h-screen bg-black">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
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
          <div className="bg-zinc-900/90 rounded-xl overflow-hidden border border-zinc-800/50 shadow-xl">
            <div className="grid md:grid-cols-2 gap-8 p-8">
              <div className="space-y-4">
                <div className="overflow-hidden rounded-lg">
                  <img
                    src={product?.image}
                    alt={product?.name}
                    className="w-full h-96 object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {[1, 2, 3, 4].map((_, index) => (
                    <div key={index} className="overflow-hidden rounded-lg">
                      <img 
                        src={product?.image} 
                        alt="" 
                        className="w-full h-20 object-cover hover:scale-110 transition-transform duration-300" 
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-6">
                <h1 className="text-3xl font-bold text-white">{product?.name}</h1>
                <p className="text-2xl font-bold text-blue-400">${product?.price?.toFixed(2)}</p>
                <div className="bg-black/50 p-4 rounded-lg backdrop-blur-sm">
                  <h3 className="text-white font-semibold mb-2">Description</h3>
                  <p className="text-gray-300">{product?.description}</p>
                </div>
                <div className="bg-black/50 p-4 rounded-lg backdrop-blur-sm">
                  <h3 className="text-white font-semibold mb-2">Category</h3>
                  <p className="text-gray-300 capitalize">{product?.category}</p>
                </div>
                <button 
                  onClick={handleAddToCart}
                  className={`${glassButtonClass} w-full`}
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
