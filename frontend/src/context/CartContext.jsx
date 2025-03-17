import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      setCartItems([]);
      return;
    }

    try {
      const { data } = await axios.get('http://localhost:5000/cart', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      // Ensure we have properly populated product data
      if (data.cart?.items?.length > 0) {
        const populatedItems = data.cart.items.filter(item => item.productId);
        setCartItems(populatedItems);
      } else {
        setCartItems([]);
      }
    } catch (error) {
      console.error('Cart fetch error:', error);
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
      }
      setCartItems([]);
    }
    setLoading(false);
  };

  const addToCart = async (productId, quantity = 1) => {
    const token = localStorage.getItem('token');
    if (!token) return false;

    try {
      const response = await axios.post(
        'http://localhost:5000/cart/add', 
        { productId, quantity },
        { 
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      console.log('Add to cart response:', response.data); // Debug log
      await fetchCart();
      return true;
    } catch (error) {
      console.error('Error adding to cart:', error);
      return false;
    }
  };

  const removeFromCart = async (productId) => {
    const token = localStorage.getItem('token');
    if (!token) return false;

    try {
      const response = await axios.delete(
        `http://localhost:5000/cart/remove/${productId}`,
        { headers: { Authorization: `Bearer ${token}` }}
      );

      if (response.data.cart) {
        await fetchCart(); // Refresh cart data
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error removing from cart:', error.response?.data || error.message);
      return false;
    }
  };

  // Listen for token changes
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'token') {
        if (e.newValue) {
          fetchCart();
        } else {
          setCartItems([]);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    fetchCart(); // Initial fetch

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      loading, 
      addToCart, 
      removeFromCart,
      fetchCart 
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
