import { useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import LoadingSpinner from "../components/LoadingSpinner";
import { glassButtonClass } from '../components/common/ButtonStyles';
import api from '../services/api';

const Cart = () => {
  const theme = useTheme();
  const { cartItems, loading, removeFromCart, fetchCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/signin');
      return;
    }

    const loadCart = async () => {
      try {
        const cartData = await api.cart.get();
        await fetchCart();
      } catch (error) {
        console.error('Cart load error:', error);
        if (error.response?.status === 401) {
          localStorage.removeItem('token');
          navigate('/signin');
        }
      }
    };

    loadCart();

    const handleStorageChange = (e) => {
      if (e.key === 'token' && !e.newValue) {
        navigate('/signin');
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [navigate, fetchCart]);

  const total = cartItems?.reduce((sum, item) => {
    const price = item?.productId?.price || 0;
    const quantity = item?.quantity || 0;
    return sum + (price * quantity);
  }, 0);

  return (
    <div className="min-h-screen bg-[#0A0A0A] bg-[url('/cyber-grid.png')] bg-fixed">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-8 relative inline-block font-orbitron">
          YOUR CART
          <div className="absolute -bottom-2 left-0 w-32 h-1 bg-gradient-to-r from-gray-600 to-transparent"></div>
          <div className="absolute -bottom-2 left-0 w-32 h-1 bg-gradient-to-r from-gray-600 to-transparent animate-pulse"></div>
        </h1>

        {loading ? (
          <div className="flex justify-center items-center h-[calc(100vh-4rem)]">
            <LoadingSpinner />
          </div>
        ) : !cartItems || cartItems.length === 0 ? (
          <div className="bg-black/80 rounded-none border-l-4 border-gray-600 p-8 text-center clip-path-polygon">
            <p className="text-white mb-4 font-orbitron">YOUR CART IS EMPTY</p>
            <Link 
              to="/products"
              className="inline-block px-8 py-3 bg-gray-600 text-white font-bold hover:bg-gray-700 transition-all transform hover:scale-105 skew-x-[-5deg] relative overflow-hidden before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:translate-x-[-200%] hover:before:translate-x-[200%] before:transition-transform before:duration-700"
            >
              CONTINUE SHOPPING
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {cartItems.map((item) => (
              item.productId && (
                <div key={item.productId._id} className="bg-black/80 p-4 flex flex-col md:flex-row items-center gap-4 border-l-4 border-gray-600 hover:border-gray-500 transition-all duration-300 clip-path-polygon relative group">
                  <Link to={`/product/${item.productId._id}`} className="w-full md:w-24 overflow-hidden">
                    <img
                      src={item.productId.image}
                      alt={item.productId.name}
                      className="w-full md:w-24 h-24 object-cover transform group-hover:scale-110 transition-transform duration-300"
                    />
                  </Link>
                  <div className="flex-1 text-center md:text-left">
                    <Link to={`/product/${item.productId._id}`}>
                      <h3 className="text-xl font-bold text-white hover:text-gray-500 transition-colors font-orbitron">
                        {item.productId.name}
                      </h3>
                    </Link>
                    <p className="text-gray-500 mt-1 font-mono">
                      ₹{item.productId.price.toFixed(2)} × {item.quantity}
                    </p>
                    <p className="text-gray-400 mt-1 font-mono">
                      Subtotal: ₹{(item.productId.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.productId._id)}
                    className="px-4 py-2 text-gray-500 hover:text-white hover:bg-gray-600 skew-x-[-5deg] transition-colors border border-gray-500 hover:border-gray-600"
                  >
                    REMOVE
                  </button>
                </div>
              )
            ))}
            
            <div className="bg-black/80 p-6 mt-4 border-l-4 border-gray-600 clip-path-polygon">
              <div className="flex justify-between items-center mb-4">
                <span className="text-white font-orbitron">TOTAL:</span>
                <span className="text-2xl font-bold text-gray-500 font-mono">₹{total.toFixed(2)}</span>
              </div>
              <button className="w-full px-8 py-3 bg-gray-600 text-white font-bold hover:bg-gray-700 transition-all transform hover:scale-105 skew-x-[-5deg] relative overflow-hidden before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:translate-x-[-200%] hover:before:translate-x-[200%] before:transition-transform before:duration-700">
                PROCEED TO CHECKOUT
              </button>
            </div>
          </div>
        )}
      </div>
      <style>{`
        .clip-path-polygon {
          clip-path: polygon(0 0, 100% 0, 98% 100%, 0 100%);
        }
      `}</style>
    </div>
  );
};

export default Cart;
