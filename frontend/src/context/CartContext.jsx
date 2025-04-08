import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCart = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setCartItems([]);
      setLoading(false);
      return;
    }

    try {
      const response = await api.cart.get();
      if (response.data.cart && response.data.cart.items) {
        setCartItems(response.data.cart.items);
      } else {
        setCartItems([]);
      }
      setError(null);
    } catch (error) {
      console.error('Cart fetch error:', error);
      setError(error.message);
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    try {
      await api.cart.add(productId, quantity);
      await fetchCart();
    } catch (error) {
      console.error('Add to cart error:', error);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      await api.cart.remove(productId);
      await fetchCart();
    } catch (error) {
      console.error('Remove from cart error:', error);
    }
  };

  // Listen for token changes
  useEffect(() => {
    const handleStorageChange = () => {
      fetchCart();
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
      error,
      addToCart, 
      removeFromCart, 
      fetchCart 
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
