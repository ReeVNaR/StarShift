import { useState, useEffect } from 'react';
import { fetchProducts } from '../services/api';
import ProductCard from './ProductCard';
import LoadingSpinner from './LoadingSpinner';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await fetchProducts();
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (deletedId) => {
    setProducts(products.filter(product => product._id !== deletedId));
  };

  const handleUpdate = (updatedProduct) => {
    setProducts(products.map(p => 
      p._id === updatedProduct._id ? updatedProduct : p
    ));
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map(product => (
        <ProductCard
          key={product._id}
          product={product}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
        />
      ))}
    </div>
  );
}
