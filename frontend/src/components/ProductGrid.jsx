import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';

const ProductGrid = ({ products }) => {
  const theme = useTheme();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = async (e, productId) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/signin');
      return;
    }
    await addToCart(productId);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <div key={product._id} className={`${theme.secondary} rounded-lg shadow-md overflow-hidden border ${theme.border}`}>
          <Link to={`/product/${product._id}`}>
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover hover:opacity-75 transition duration-200"
            />
          </Link>
          <div className="p-4">
            <Link to={`/product/${product._id}`}>
              <h3 className="text-lg font-semibold text-gray-200 hover:text-blue-400 transition duration-200">
                {product.name}
              </h3>
            </Link>
            <p className={`mt-1 ${theme.text}`}>${product.price.toFixed(2)}</p>
            <button 
              onClick={(e) => handleAddToCart(e, product._id)}
              className={`mt-4 w-full ${theme.accent} hover:bg-blue-700 text-white py-2 px-4 rounded transition-all duration-200`}
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
