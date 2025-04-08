import { useEffect, useState, Suspense, lazy } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import ProductGrid from "../components/ProductGrid";
import Footer from "../components/Footer";
import { useTheme } from "../context/ThemeContext";
import LoadingSpinner from "../components/LoadingSpinner";
import api from '../services/api';

const Hero = lazy(() => import("../components/Hero"));

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.products.getAll();
        if (response.data.products && response.data.products.length > 0) {
          const shuffled = [...response.data.products].sort(() => 0.5 - Math.random());
          setProducts(shuffled.slice(0, 4));
        } else {
          console.warn('No products returned from API');
          setProducts([]);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.textContent = `
      .shop-now-button {
        background: linear-gradient(90deg, rgba(255,255,255,0.2), rgba(255,255,255,0.1));
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.06);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.3);
        color: white;
        padding: 0.75rem 1.5rem;
        border-radius: 0.5rem;
        font-weight: bold;
        text-transform: uppercase;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
      }
      .shop-now-button:hover {
        transform: scale(1.05);
        box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.1);
      }
    `;
    document.head.appendChild(styleSheet);
  }, []);

  return (
    <div className="w-full bg-black overflow-x-hidden">
      <Navbar className="fixed top-0 left-0 right-0 z-50" />
      
      {/* Hero Section */}
      <section className="h-screen w-full">
        <Suspense fallback={
          <div className="w-full h-full flex justify-center items-center">
            <LoadingSpinner />
          </div>
        }>
          <Hero />
        </Suspense>
      </section>
      
      {/* Features Section */}
      <section className="h-[60vh] w-full bg-black">
        <main className="h-full w-full max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 py-4 flex flex-col">
          <div className="mb-4 relative">
            <h2 className={`text-xl font-bold ${theme.text} animate-fade-in-down inline-block`}>
              Featured Products
            </h2>
            <div className="absolute -bottom-2 left-0 w-32 h-1 bg-gradient-to-r from-blue-500 to-transparent"></div>
            <div className="absolute -bottom-2 left-0 w-32 h-1 bg-gradient-to-r from-blue-500 to-transparent animate-pulse-glow"></div>
          </div>
          
          {loading ? (
            <div className="flex-1 flex justify-center items-center">
              <LoadingSpinner />
            </div>
          ) : (
            <div className="flex-1">
              <ProductGrid products={products} />
            </div>
          )}
        </main>
      </section>

      {/* Footer Section */}
      <section className="h-[50vh] w-full bg-black">
        <Footer />
      </section>
    </div>
  );
};

export default Dashboard;
