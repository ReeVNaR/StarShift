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
    <div className="bg-white rounded-lg shadow-md border border-gray-200">
      <div className="aspect-w-16 aspect-h-9">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover rounded-t-lg"
        />
      </div>
      <div className="p-4">
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
            <div className="mb-3">
              <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
              <p className="text-blue-600 font-bold mt-1">₹{product.price.toFixed(2)}</p>
            </div>
            <p className="text-gray-600 text-sm mb-3">{product.description}</p>
            <div className="inline-block px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
              {product.category}
            </div>
          </>
        )}
        <div className="mt-4 pt-4 border-t border-gray-100 flex justify-end gap-2">
          <button
            onClick={handleEdit}
            className="px-4 py-2 text-sm bg-blue-500 text-white rounded-md"
          >
            {isEditing ? 'Save' : 'Edit'}
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 text-sm bg-red-500 text-white rounded-md"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
