import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import ProductGrid from "../components/ProductGrid";
import Hero from "../components/Hero";
import { useTheme } from "../context/ThemeContext";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Ensure products are seeded first
        await axios.post("http://localhost:5000/seed-products");
        
        // Then fetch products
        const response = await axios.get("http://localhost:5000/products");
        console.log('Dashboard products:', response.data);
        // Get random products for featured section
        const allProducts = response.data.products;
        const shuffled = [...allProducts].sort(() => 0.5 - Math.random());
        setProducts(shuffled.slice(0, 4)); // Only take 4 products
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className={`min-h-screen bg-gradient-to-br ${theme.primary}`}>
      <Navbar />
      <Hero />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className={`text-2xl font-bold mb-6 ${theme.text}`}>Featured Products</h2>
        {loading ? (
          <div className="flex justify-center text-white">Loading...</div>
        ) : (
          <ProductGrid products={products} />
        )}
      </main>
    </div>
  );
};

export default Dashboard;
