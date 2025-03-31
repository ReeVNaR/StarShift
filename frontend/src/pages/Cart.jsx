import { useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import LoadingSpinner from "../components/LoadingSpinner";
import { glassButtonClass } from '../components/common/ButtonStyles';

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
    <div className="min-h-screen bg-black">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-8 relative inline-block">
          Your Cart
          <div className="absolute -bottom-2 left-0 w-32 h-1 bg-gradient-to-r from-blue-500 to-transparent"></div>
          <div className="absolute -bottom-2 left-0 w-32 h-1 bg-gradient-to-r from-blue-500 to-transparent animate-pulse-glow"></div>
        </h1>

        {loading ? (
          <div className="flex justify-center items-center h-[calc(100vh-4rem)]">
            <LoadingSpinner />
          </div>
        ) : !cartItems || cartItems.length === 0 ? (
          <div className="bg-zinc-900/90 rounded-xl p-8 text-center border border-zinc-800/50">
            <p className="text-white mb-4">Your cart is empty</p>
            <Link 
              to="/products"
              className={glassButtonClass}
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {cartItems.map((item) => (
              item.productId && (
                <div key={item.productId._id} className="bg-zinc-900/90 rounded-xl p-4 flex flex-col md:flex-row items-center gap-4 border border-zinc-800/50 hover:border-blue-500/50 transition-duration-300">
                  <Link to={`/product/${item.productId._id}`} className="w-full md:w-24">
                    <img
                      src={item.productId.image}
                      alt={item.productId.name}
                      className="w-full md:w-24 h-24 object-cover rounded-lg hover:scale-105 transition-transform duration-300"
                    />
                  </Link>
                  <div className="flex-1 text-center md:text-left">
                    <Link to={`/product/${item.productId._id}`}>
                      <h3 className="text-xl font-bold text-white hover:text-blue-400 transition-colors">
                        {item.productId.name}
                      </h3>
                    </Link>
                    <p className="text-blue-400 mt-1">
                      ${item.productId.price.toFixed(2)} × {item.quantity}
                    </p>
                    <p className="text-gray-400 mt-1">
                      Subtotal: ${(item.productId.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.productId._id)}
                    className="px-4 py-2 text-red-500 hover:text-red-400 hover:bg-red-500/10 rounded transition-colors"
                  >
                    Remove
                  </button>
                </div>
              )
            ))}
            
            <div className="bg-zinc-900/90 rounded-xl p-6 mt-4 border border-zinc-800/50">
              <div className="flex justify-between items-center mb-4">
                <span className="text-white">Total:</span>
                <span className="text-2xl font-bold text-blue-400">${total.toFixed(2)}</span>
              </div>
              <button className={`${glassButtonClass} w-full`}>
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
