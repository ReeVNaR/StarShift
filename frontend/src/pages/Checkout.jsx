import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Navbar from '../components/Navbar';
import LoadingSpinner from "../components/LoadingSpinner";

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, loading } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    paymentMethod: 'card'
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/signin');
    }
  }, [navigate]);

  const total = cartItems?.reduce((sum, item) => {
    const price = item?.productId?.price || 0;
    const quantity = item?.quantity || 0;
    return sum + (price * quantity);
  }, 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement checkout logic
    console.log('Checkout data:', formData);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] bg-[url('/cyber-grid.png')] bg-fixed">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-8 relative inline-block font-orbitron">
          CHECKOUT
          <div className="absolute -bottom-2 left-0 w-32 h-1 bg-gradient-to-r from-gray-600 to-transparent"></div>
          <div className="absolute -bottom-2 left-0 w-32 h-1 bg-gradient-to-r from-gray-600 to-transparent animate-pulse"></div>
        </h1>

        {loading ? (
          <div className="flex justify-center items-center h-[calc(100vh-4rem)]">
            <LoadingSpinner />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="bg-black/80 p-6 border-l-4 border-gray-600 clip-path-polygon space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-400 mb-2 font-orbitron">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full bg-gray-900 border border-gray-700 text-white px-4 py-2 focus:outline-none focus:border-gray-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 mb-2 font-orbitron">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-gray-900 border border-gray-700 text-white px-4 py-2 focus:outline-none focus:border-gray-500"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-gray-400 mb-2 font-orbitron">Address</label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full bg-gray-900 border border-gray-700 text-white px-4 py-2 focus:outline-none focus:border-gray-500"
                      required
                      rows="3"
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-gray-400 mb-2 font-orbitron">City</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full bg-gray-900 border border-gray-700 text-white px-4 py-2 focus:outline-none focus:border-gray-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 mb-2 font-orbitron">State</label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-full bg-gray-900 border border-gray-700 text-white px-4 py-2 focus:outline-none focus:border-gray-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 mb-2 font-orbitron">PIN Code</label>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      className="w-full bg-gray-900 border border-gray-700 text-white px-4 py-2 focus:outline-none focus:border-gray-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 mb-2 font-orbitron">Payment Method</label>
                    <select
                      name="paymentMethod"
                      value={formData.paymentMethod}
                      onChange={handleInputChange}
                      className="w-full bg-gray-900 border border-gray-700 text-white px-4 py-2 focus:outline-none focus:border-gray-500"
                    >
                      <option value="card">Credit/Debit Card</option>
                      <option value="upi">UPI</option>
                      <option value="cod">Cash on Delivery</option>
                    </select>
                  </div>
                </div>
              </form>
            </div>

            {/* Order Summary */}
            <div className="bg-black/80 p-6 border-l-4 border-gray-600 clip-path-polygon h-fit">
              <h2 className="text-xl font-bold text-white mb-4 font-orbitron">ORDER SUMMARY</h2>
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.productId._id} className="flex justify-between text-gray-400">
                    <span>{item.productId.name} × {item.quantity}</span>
                    <span>₹{(item.productId.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <div className="border-t border-gray-700 pt-4">
                  <div className="flex justify-between text-white font-bold">
                    <span>Total</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>
                </div>
                <button 
                  type="submit"
                  onClick={handleSubmit}
                  className="w-full px-6 py-3 bg-gray-600 text-white font-bold hover:bg-gray-700 transition-all transform hover:scale-105 skew-x-[-5deg]"
                >
                  PLACE ORDER
                </button>
              </div>
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

export default Checkout;
