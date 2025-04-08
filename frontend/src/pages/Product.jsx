import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from '../services/api';

const Product = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.textContent = `
      .product-card {
        background: linear-gradient(
          135deg,
          rgba(255, 0, 0, 0.1),
          rgba(0, 0, 0, 0.9)
        );
        clip-path: polygon(0 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%);
        border: 1px solid rgba(255, 0, 0, 0.2);
        box-shadow: 
          0 0 20px rgba(255, 0, 0, 0.1),
          inset 0 0 80px rgba(255, 0, 0, 0.05);
        animation: rogGlow 4s ease-in-out infinite;
        transition: all 0.3s ease;
      }

      .product-card:hover {
        transform: translateY(-5px) scale(1.02);
        border-color: rgba(255, 0, 0, 0.5);
      }

      @keyframes rogGlow {
        0%, 100% { 
          border-color: rgba(255, 0, 0, 0.2);
          box-shadow: 0 0 20px rgba(255, 0, 0, 0.1);
        }
        50% { 
          border-color: rgba(255, 0, 0, 0.4);
          box-shadow: 0 0 30px rgba(255, 0, 0, 0.2);
        }
      }

      .cyber-grid {
        position: absolute;
        inset: 0;
        opacity: 0.05;
        background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 30 L15 0 L45 0 L60 30 L45 60 L15 60Z' fill='none' stroke='%23FF0000' stroke-width='1'/%3E%3C/svg%3E");
        background-size: 60px 60px;
        animation: gridMove 40s linear infinite;
      }

      @keyframes gridMove {
        0% { background-position: 0 0; }
        100% { background-position: 60px 60px; }
      }

      .buy-button {
        background: linear-gradient(45deg, rgba(255, 0, 0, 0.1), rgba(0, 0, 0, 0.3));
        border: 1px solid rgba(255, 0, 0, 0.3);
        transform: skew(-10deg);
        transition: all 0.3s ease;
      }

      .buy-button:hover {
        background: rgba(255, 0, 0, 0.8);
        transform: skew(-10deg) scale(1.05);
        box-shadow: 0 0 20px rgba(255, 0, 0, 0.3);
      }
    `;
    document.head.appendChild(styleSheet);
    return () => document.head.removeChild(styleSheet);
  }, []);

  // Fetch products from your API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.products.getAll();
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0A0A] bg-[url('/cyber-grid.png')] bg-fixed">
      <Navbar />
      
      {/* Background Effects */}
      <div className="cyber-grid"></div>
      <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(255,0,0,0.02)_1px,transparent_1px)] bg-[size:100%_3px]"></div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-orbitron tracking-wider uppercase">
            Gaming Arsenal
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-red-700 to-red-500 mx-auto"></div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product._id} className="product-card p-6">
              <div className="aspect-w-1 aspect-h-1 mb-4 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <h3 className="text-xl font-bold text-white mb-2 font-orbitron uppercase">{product.name}</h3>
              <p className="text-gray-400 mb-4">{product.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-red-500 text-xl font-bold">
                  ${product.price}
                </span>
                <button className="buy-button px-6 py-2 text-red-500 hover:text-white font-bold font-orbitron uppercase">
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
