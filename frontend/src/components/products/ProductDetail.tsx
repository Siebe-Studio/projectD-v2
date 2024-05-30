import React from 'react';

export function ProductDetails({ data }) {
  // Assuming data contains a single product object
  const product = data[1];

  if (!product) {
    return null; // Handle case where product data is not available
  }

  return (
    <div className="product-details">
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>Prijs: {product.price} Euro</p>
      <p>SKU {product._count.items}</p>
    </div>
  );
}