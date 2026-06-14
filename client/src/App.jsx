import React, { useState } from 'react';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import './App.css';

function App() {
  const [currentProduct, setCurrentProduct] = useState(null);
  const [refreshProducts, setRefreshProducts] = useState(false);

  const handleProductSaved = () => {
    setCurrentProduct(null);
    setRefreshProducts(prev => !prev);
  };

  const handleEditProduct = (product) => {
    setCurrentProduct(product);
  };

  const handleProductDeleted = () => {
    setRefreshProducts(prev => !prev);
  };

  return (
    <div className="App">
      <h1>Pharmacy Management Dashboard</h1>
      <ProductForm currentProduct={currentProduct} onProductSaved={handleProductSaved} />
      <ProductList onEditProduct={handleEditProduct} onProductDeleted={handleProductDeleted} />
    </div>
  );
}

export default App;