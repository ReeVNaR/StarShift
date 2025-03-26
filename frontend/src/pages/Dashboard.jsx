import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import ProductGrid from "../components/ProductGrid";
import Hero from "../components/Hero";
import { useTheme } from "../context/ThemeContext";
import LoadingSpinner from "../components/LoadingSpinner";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/products");
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

  return (
    <div className="h-screen bg-black overflow-hidden">
      <Navbar />
      <div className="h-[calc(100vh-64px)] flex flex-col overflow-hidden">
        {/* Adjusted hero height to fixed value */}
        <div className="h-[250px]">
          <Hero />
        </div>
        
        {/* Adjusted margin and container height */}
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
          <div className="mb-2 relative">
            <h2 className={`text-xl font-bold ${theme.text} animate-fade-in-down inline-block`}>
              Featured Products
            </h2>
            <div className="absolute -bottom-2 left-0 w-32 h-1 bg-gradient-to-r from-blue-500 to-transparent"></div>
            <div className="absolute -bottom-2 left-0 w-32 h-1 bg-gradient-to-r from-blue-500 to-transparent animate-pulse-glow"></div>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center h-32">
              <LoadingSpinner />
            </div>
          ) : (
            <div className="h-[calc(100vh-420px)]">
              <ProductGrid products={products} />
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
