import React, { useState, useEffect } from 'react';
import { createProduct, updateProduct } from '../services/api';

const ProductForm = ({ currentProduct, onProductSaved }) => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    brand: '',
    category: '',
    price: '',
    countInStock: '',
    imageUrl: '',
    expiryDate: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (currentProduct) {
      setProduct({
        name: currentProduct.name || '',
        description: currentProduct.description || '',
        brand: currentProduct.brand || '',
        category: currentProduct.category || '',
        price: currentProduct.price || '',
        countInStock: currentProduct.countInStock || '',
        imageUrl: currentProduct.imageUrl || '',
        expiryDate: currentProduct.expiryDate ? currentProduct.expiryDate.substring(0, 10) : '',
      });
    } else {
      setProduct({
        name: '',
        description: '',
        brand: '',
        category: '',
        price: '',
        countInStock: '',
        imageUrl: '',
        expiryDate: '',
      });
    }
  }, [currentProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (currentProduct && currentProduct._id) {
        await updateProduct(currentProduct._id, product);
      } else {
        await createProduct(product);
      }
      onProductSaved();
      setProduct({
        name: '',
        description: '',
        brand: '',
        category: '',
        price: '',
        countInStock: '',
        imageUrl: '',
        expiryDate: '',
      });
    } catch (err) {
      console.error("Error saving product:", err);
      setError("Failed to save product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginBottom: '20px', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>{currentProduct ? 'Edit Product' : 'Add New Product'}</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={product.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Description:</label>
          <textarea name="description" value={product.description} onChange={handleChange} required></textarea>
        </div>
        <div>
          <label>Brand:</label>
          <input type="text" name="brand" value={product.brand} onChange={handleChange} />
        </div>
        <div>
          <label>Category:</label>
          <input type="text" name="category" value={product.category} onChange={handleChange} required />
        </div>
        <div>
          <label>Price:</label>
          <input type="number" name="price" value={product.price} onChange={handleChange} required step="0.01" />
        </div>
        <div>
          <label>Stock:</label>
          <input type="number" name="countInStock" value={product.countInStock} onChange={handleChange} required />
        </div>
        <div>
          <label>Image URL:</label>
          <input type="text" name="imageUrl" value={product.imageUrl} onChange={handleChange} />
        </div>
        <div>
          <label>Expiry Date:</label>
          <input type="date" name="expiryDate" value={product.expiryDate} onChange={handleChange} />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Saving...' : (currentProduct ? 'Update Product' : 'Add Product')}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;