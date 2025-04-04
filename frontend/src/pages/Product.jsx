import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";

const Product = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Apply the same styling as SignIn page
    const styleSheet = document.createElement("style");
    styleSheet.textContent = `
      .product-card {
        background: linear-gradient(
          135deg,
          rgba(255, 255, 255, 0.1),
          rgba(255, 255, 255, 0.05),
          rgba(0, 0, 0, 0.3)
        );
        backdrop-filter: blur(16px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        box-shadow: 
          0 0 20px rgba(0, 0, 0, 0.5),
          inset 0 0 80px rgba(255, 255, 255, 0.05);
        animation: boxGlow 4s ease-in-out infinite;
        transition: transform 0.3s ease;
      }

      .product-card:hover {
        transform: translateY(-5px);
      }

      @keyframes boxGlow {
        0%, 100% { 
          border-color: rgba(255, 255, 255, 0.05);
          box-shadow: 0 0 20px rgba(0, 0, 0, 0.5),
                inset 0 0 80px rgba(255, 255, 255, 0.03);
        }
        50% { 
          border-color: rgba(255, 255, 255, 0.1);
          box-shadow: 0 0 30px rgba(0, 0, 0, 0.6),
                inset 0 0 100px rgba(255, 255, 255, 0.05);
        }
      }

      .hexagon-grid {
        position: absolute;
        inset: 0;
        opacity: 0.05;
        background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 30 L15 0 L45 0 L60 30 L45 60 L15 60Z' fill='none' stroke='%234B5563' stroke-width='1'/%3E%3C/svg%3E");
        background-size: 60px 60px;
        animation: hexMove 40s linear infinite;
      }

      @keyframes hexMove {
        0% { background-position: 0 0; }
        100% { background-position: 60px 60px; }
      }

      .buy-button {
        background: linear-gradient(45deg, rgba(16, 185, 129, 0.1), rgba(16, 185, 129, 0.2));
        border: 1px solid rgba(16, 185, 129, 0.2);
        transition: all 0.3s ease;
      }

      .buy-button:hover {
        background: linear-gradient(45deg, rgba(16, 185, 129, 0.2), rgba(16, 185, 129, 0.3));
        transform: scale(1.05);
        box-shadow: 0 0 20px rgba(16, 185, 129, 0.3);
      }
    `;
    document.head.appendChild(styleSheet);
    return () => document.head.removeChild(styleSheet);
  }, []);

  // Fetch products from your API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen w-full bg-black overflow-hidden relative">
      <Navbar />
      
      {/* Background Effects */}
      <div className="hexagon-grid"></div>
      <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100%_3px]"></div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-orbitron tracking-wider">
            Gaming Gear
          </h1>
          <div className="w-24 h-1 bg-emerald-500 mx-auto rounded"></div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product._id} className="product-card rounded-lg p-6">
              <div className="aspect-w-1 aspect-h-1 mb-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{product.name}</h3>
              <p className="text-gray-400 mb-4">{product.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-emerald-500 text-xl font-bold">
                  ${product.price}
                </span>
                <button className="buy-button px-6 py-2 rounded-lg text-emerald-500 font-bold">
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Product;
