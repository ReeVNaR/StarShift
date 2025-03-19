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
    <div className={`h-screen flex flex-col overflow-hidden bg-gradient-to-br ${theme.primary}`}>
      <Navbar />
      <div className="flex-1 flex flex-col">
        <div className="flex-shrink-0">
          <Hero />
        </div>
        <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h2 className={`text-xl font-bold mb-4 ${theme.text}`}>Featured Products</h2>
          {loading ? (
            <div className="flex items-center justify-center h-48">
              <LoadingSpinner />
            </div>
          ) : (
            <div className="h-full">
              <ProductGrid products={products} />
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
