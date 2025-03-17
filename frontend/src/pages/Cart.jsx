import { useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import LoadingSpinner from "../components/LoadingSpinner";

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

    // Add event listener for token changes
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

  if (loading) {
    return (
      <div className={`min-h-screen bg-gradient-to-br ${theme.primary}`}>
        <Navbar />
        <div className="flex justify-center items-center h-[calc(100vh-4rem)]">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${theme.primary}`}>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className={`text-3xl font-bold mb-8 ${theme.text}`}>Your Cart</h1>
        {loading ? (
          <div className="flex items-center justify-center h-48">
            <LoadingSpinner />
          </div>
        ) : cartItems?.length === 0 ? (
          <div className={`${theme.secondary} rounded-lg p-8 text-center ${theme.border}`}>
            <p className="text-white mb-4">Your cart is empty</p>
            <Link 
              to="/products"
              className={`inline-block ${theme.accent} text-white py-2 px-6 rounded hover:bg-blue-700 transition duration-200`}
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid gap-8">
            {cartItems.map((item) => (
              item.productId && (  // Only render if productId exists
                <div key={item.productId._id} className={`${theme.secondary} rounded-lg p-4 flex flex-col md:flex-row items-center gap-4 ${theme.border}`}>
                  <Link to={`/product/${item.productId?._id}`} className="w-full md:w-24">
                    <img
                      src={item.productId?.image}
                      alt={item.productId?.name}
                      className="w-full md:w-24 h-24 object-cover rounded"
                    />
                  </Link>
                  <div className="flex-1 text-center md:text-left">
                    <Link to={`/product/${item.productId?._id}`}>
                      <h3 className="text-xl font-bold text-white hover:text-blue-400 transition-colors">
                        {item.productId?.name}
                      </h3>
                    </Link>
                    <p className={`${theme.text} mt-1`}>
                      ${item.productId?.price?.toFixed(2)} × {item.quantity}
                    </p>
                    <p className="text-gray-400 mt-1">
                      Subtotal: ${(item.productId?.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.productId?._id)}
                    className="px-4 py-2 text-red-500 hover:text-red-400 hover:bg-red-500/10 rounded transition-colors"
                  >
                    Remove
                  </button>
                </div>
              )
            ))}
            <div className={`${theme.secondary} rounded-lg p-6 mt-4 ${theme.border}`}>
              <div className="flex justify-between items-center mb-4">
                <span className="text-white">Total:</span>
                <span className="text-xl font-bold text-white">${total.toFixed(2)}</span>
              </div>
              <button className={`w-full ${theme.accent} text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-200`}>
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
