import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import LoadingSpinner from "../components/LoadingSpinner";
import { glassButtonClass } from '../components/common/ButtonStyles';
import api from '../services/api';

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const theme = useTheme();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [isAdding, setIsAdding] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    console.log('Attempting to fetch product with ID:', id);
    api.products.getById(id)
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

  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.textContent = `
      .product-image {
        clip-path: polygon(0 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%);
        animation: glitchIn 0.5s ease-out forwards;
      }
      .product-content {
        animation: slideIn 0.7s ease-out forwards;
      }
      @keyframes glitchIn {
        0% { 
          opacity: 0;
          transform: scale(0.95) skew(2deg);
          clip-path: polygon(0 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%);
        }
        25% { 
          opacity: 0.3;
          transform: scale(0.97) skew(-2deg);
          clip-path: polygon(0 5%, 100% 0, 100% calc(100% - 10px), calc(100% - 15px) 100%, 0 95%);
        }
        100% { 
          opacity: 1;
          transform: scale(1) skew(0);
          clip-path: polygon(0 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%);
        }
      }
      @keyframes slideIn {
        from { opacity: 0; transform: translateX(20px) skew(-5deg); }
        to { opacity: 1; transform: translateX(0) skew(0); }
      }
      .rog-border {
        position: relative;
        border: 1px solid rgba(255, 0, 0, 0.3);
      }
      .rog-border::after {
        content: '';
        position: absolute;
        top: -1px;
        right: -1px;
        width: 20px;
        height: 20px;
        background: linear-gradient(135deg, transparent 50%, #ff0000 50%);
      }
    `;
    document.head.appendChild(styleSheet);
    return () => document.head.removeChild(styleSheet);
  }, []);

  const fetchRelatedProducts = async () => {
    try {
      const res = await api.products.getRelated(id);
      return res.data.relatedProducts || [];
    } catch (err) {
      console.error('Failed to fetch related products:', err);
      return [];
    }
  };

  const fetchReviews = async () => {
    try {
      const res = await api.products.getReviews(id);
      return res.data.reviews || [];
    } catch (err) {
      console.error('Failed to fetch reviews:', err);
      return [];
    }
  };

  useEffect(() => {
    fetchRelatedProducts().then(setRelatedProducts);
    fetchReviews().then(setReviews);
  }, [id]);

  const handleAddToCart = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/signin');
      return;
    }
    setIsAdding(true);
    try {
      await addToCart(id);
      // Optional: Add success toast/notification here
    } catch (error) {
      console.error('Failed to add to cart:', error);
      // Optional: Add error toast/notification here
    } finally {
      setIsAdding(false);
    }
  };

  const handleGoBack = () => {
    navigate(-1); // This will go back to the previous page
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] bg-[url('/cyber-grid.png')] bg-fixed">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-4 h-[calc(100vh-4rem)] flex flex-col">
        {/* Back Button - More Compact */}
        <button
          onClick={handleGoBack}
          className="mb-2 flex items-center space-x-2 text-red-500 hover:text-red-400 
                   transition-all duration-300 group bg-black/30 px-3 py-1.5
                   border border-red-500/20 hover:border-red-500/50 w-fit
                   skew-x-[-10deg]"
        >
          <svg
            className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="text-sm font-orbitron">BACK</span>
        </button>

        {loading ? (
          <div className="flex-1 flex justify-center items-center">
            <LoadingSpinner />
          </div>
        ) : error ? (
          <div className="flex-1 flex justify-center items-center">
            <div className="text-red-400 text-center p-4 bg-black/50 rounded-lg backdrop-blur-sm">
              {error}
              <button
                onClick={() => navigate('/products')}
                className="ml-4 text-cyan-400 hover:text-cyan-300 transition-colors duration-300"
              >
                Back to Products
              </button>
            </div>
          </div>
        ) : (
          <div className="flex-1 grid md:grid-cols-2 gap-6 py-2 overflow-hidden">
            {/* Left column - Images */}
            <div className="space-y-3 overflow-y-auto custom-scrollbar pr-2">
              <div className="overflow-hidden product-image rog-border">
                <img
                  src={product?.image}
                  alt={product?.name}
                  className="w-full aspect-square object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="grid grid-cols-4 gap-2 image-gallery">
                {[1, 2, 3, 4].map((_, index) => (
                  <div key={index} className="overflow-hidden rog-border">
                    <img 
                      src={product?.image} 
                      alt="" 
                      className="w-full aspect-square object-cover hover:scale-110 transition-transform duration-300" 
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Right column - Product Info */}
            <div className="space-y-4 overflow-y-auto custom-scrollbar pr-2">
              <div className="bg-black/50 p-4 rog-border backdrop-blur-sm">
                <h1 className="text-2xl font-bold text-white font-orbitron mb-2 uppercase">
                  {product?.name}
                </h1>
                <p className="text-3xl font-bold text-red-500">${product?.price?.toFixed(2)}</p>
              </div>
              <div className="space-y-3">
                <div className="bg-black/50 p-4 rog-border backdrop-blur-sm">
                  <h3 className="text-red-500 font-semibold mb-2 font-orbitron">DESCRIPTION</h3>
                  <p className="text-gray-300 text-sm">{product?.description}</p>
                </div>
                
                <div className="bg-black/50 p-4 rog-border backdrop-blur-sm">
                  <h3 className="text-red-500 font-semibold mb-2 font-orbitron">CATEGORY</h3>
                  <p className="text-gray-300 uppercase text-sm">{product?.category}</p>
                </div>
                <button
                  onClick={handleAddToCart}
                  disabled={isAdding}
                  className={`w-full py-3 px-6 font-orbitron tracking-wider
                            bg-red-500/20 hover:bg-red-500/30
                            border border-red-500/50 hover:border-red-400
                            text-red-500 hover:text-red-400
                            transition-all duration-300
                            skew-x-[-5deg]
                            disabled:opacity-50 disabled:cursor-not-allowed
                            ${isAdding ? 'animate-pulse' : ''}`}
                >
                  <span className="relative flex items-center justify-center gap-2">
                    {isAdding ? (
                      <>
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                        </svg>
                        ADDING...
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        ADD TO CART
                      </>
                    )}
                  </span>
                </button>
              </div>
            </div>

            {/* Customer Reviews Section */}
            <div className="mt-16">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">Customer Reviews</h2>
              <div className="space-y-6">
                {reviews.length > 0 ? (
                  reviews.map((review) => (
                    <div key={review.id} className="bg-black/50 p-4 rounded-lg shadow-md border border-emerald-500/20 hover:border-emerald-500/50 transition-all duration-300">
                      <h3 className="text-lg font-semibold text-white">{review.username}</h3>
                      <p className="text-gray-300">{review.comment}</p>
                      <p className="text-emerald-400 text-sm">Rating: {review.rating}/5</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400 text-center">No reviews yet. Be the first to review this product!</p>
                )}
              </div>
            </div>

            {/* Related Products Section */}
            <div className="mt-16">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">Related Products</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {relatedProducts.map((relatedProduct) => (
                  <div key={relatedProduct.id} className="bg-black/50 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                    <img 
                      src={relatedProduct.image} 
                      alt={relatedProduct.name} 
                      className="w-full h-40 object-cover rounded-lg mb-4"
                    />
                    <h3 className="text-lg font-semibold text-white">{relatedProduct.name}</h3>
                    <p className="text-emerald-400">${relatedProduct.price.toFixed(2)}</p>
                    <button 
                      onClick={() => navigate(`/products/${relatedProduct.id}`)}
                      className="mt-4 w-full py-2 text-sm text-emerald-400 border border-emerald-500/20 rounded-lg hover:border-emerald-500/50 transition-all duration-300"
                    >
                      View Details
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;