import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import LoadingSpinner from "../components/LoadingSpinner";

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

  if (error) return (
    <div className={`min-h-screen bg-gradient-to-br ${theme.primary}`}>
      <Navbar />
      <div className="text-red-400 text-center mt-10">
        {error}
        <button 
          onClick={() => navigate('/products')}
          className="ml-4 text-blue-400 hover:text-blue-300"
        >
          Back to Products
        </button>
      </div>
    </div>
  );

  if (loading) return (
    <div className={`min-h-screen bg-gradient-to-br ${theme.primary}`}>
      <Navbar />
      <div className="flex justify-center items-center h-[calc(100vh-4rem)]">
        <LoadingSpinner />
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen bg-gradient-to-br ${theme.primary}`}>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className={`${theme.secondary} rounded-lg shadow-xl ${theme.border}`}>
          <div className="grid md:grid-cols-2 gap-8 p-8">
            <div className="space-y-4">
              <img
                src={product?.image}
                alt={product?.name}
                className="w-full h-96 object-cover rounded-lg"
              />
              <div className="grid grid-cols-4 gap-2">
                <img src={product?.image} alt="" className="w-full h-20 object-cover rounded cursor-pointer hover:opacity-75" />
                <img src={product?.image} alt="" className="w-full h-20 object-cover rounded cursor-pointer hover:opacity-75" />
                <img src={product?.image} alt="" className="w-full h-20 object-cover rounded cursor-pointer hover:opacity-75" />
                <img src={product?.image} alt="" className="w-full h-20 object-cover rounded cursor-pointer hover:opacity-75" />
              </div>
            </div>
            <div className="space-y-6">
              <h1 className="text-3xl font-bold text-white">{product?.name}</h1>
              <p className={`text-2xl ${theme.text}`}>${product?.price?.toFixed(2)}</p>
              <div className={`${theme.input} p-4 rounded-lg`}>
                <h3 className="text-white font-semibold mb-2">Description</h3>
                <p className="text-gray-300">{product?.description}</p>
              </div>
              <div className={`${theme.input} p-4 rounded-lg`}>
                <h3 className="text-white font-semibold mb-2">Category</h3>
                <p className="text-gray-300 capitalize">{product?.category}</p>
              </div>
              <button 
                onClick={handleAddToCart}
                className={`w-full ${theme.accent} text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-200`}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
