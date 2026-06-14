import React, { useEffect, useState } from 'react';
import { getProducts, deleteProduct } from '../services/api';

const ProductList = ({ onEditProduct, onProductDeleted }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await getProducts();
      setProducts(response.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Failed to load products.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [onProductDeleted]); // Re-fetch when a product is deleted or added

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(id);
        onProductDeleted(); // Notify parent component to refresh list
      } catch (err) {
        console.error("Error deleting product:", err);
        alert("Failed to delete product.");
      }
    }
  };

  if (loading) return <p>Loading products...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (products.length === 0) return <p>No products found. Add some using the form above!</p>;

  return (
    <div>
      <h2>Available Products</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Brand</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Expiry Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>{product.brand}</td>
              <td>{product.category}</td>
              <td>${product.price.toFixed(2)}</td>
              <td>{product.countInStock}</td>
              <td>{product.expiryDate ? new Date(product.expiryDate).toLocaleDateString() : 'N/A'}</td>
              <td>
                <button onClick={() => onEditProduct(product)}>Edit</button>
                <button onClick={() => handleDelete(product._id)} style={{ marginLeft: '5px' }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;