import React, { useState } from 'react';
import { updateProduct, deleteProduct } from '../services/api';

export default function ProductCard({ product, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState(product);

  const handleEdit = async () => {
    if (isEditing) {
      try {
        const response = await updateProduct(product._id, editedProduct);
        if (response.product) {
          onUpdate(response.product);
          setIsEditing(false);
        }
      } catch (error) {
        console.error('Error:', error);
        alert(error.message);
      }
    } else {
      setIsEditing(true);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteProduct(product._id);
      onDelete(product._id);
    } catch (error) {
      console.error('Error:', error);
      alert(error.message);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow border">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-56 object-cover rounded-t-lg"
      />
      <div className="p-5">
        {isEditing ? (
          <div className="space-y-4">
            <input
              type="text"
              value={editedProduct.name}
              onChange={(e) => setEditedProduct({...editedProduct, name: e.target.value})}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <input
              type="number"
              value={editedProduct.price}
              onChange={(e) => setEditedProduct({...editedProduct, price: parseFloat(e.target.value)})}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <textarea
              value={editedProduct.description}
              onChange={(e) => setEditedProduct({...editedProduct, description: e.target.value})}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows="3"
            />
            <input
              type="text"
              value={editedProduct.category}
              onChange={(e) => setEditedProduct({...editedProduct, category: e.target.value})}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Category"
            />
          </div>
        ) : (
          <>
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
              <span className="text-2xl font-bold text-blue-600">
                ${product.price.toFixed(2)}
              </span>
            </div>
            <p className="text-gray-600 mb-3">{product.description}</p>
            <div className="inline-block px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm mb-4">
              {product.category}
            </div>
          </>
        )}
        <div className="flex justify-end gap-3 mt-4 pt-4 border-t">
          <button
            onClick={handleEdit}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {isEditing ? 'Save' : 'Edit'}
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
