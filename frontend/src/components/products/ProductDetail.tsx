"use client";

import React, { useState, useEffect } from 'react';
import { unknown } from 'zod';

export function ProductDetails({ productId}) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!productId) return;

    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8000/product/${productId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        setError(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]); // Correctly set the dependency array

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!product) {
    return <div>No product found</div>;
  }

  return (
    <div className="product-details">
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>Prijs: {product.price} Euro</p>
      <p>SKU: {product.sku}</p>
      <p>Count: {product._count?.items}</p>
    </div>
  );
}
