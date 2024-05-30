"use client";

import React, { useState, useEffect } from 'react';

export function ItemDetails({ itemId }) {
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!itemId) return;

    const fetchItemDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8000/item/${itemId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setItem(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchItemDetails();
  }, [itemId]); // Correctly set the dependency array

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!item) {
    return <div>No item found</div>;
  }

  return (
    <div className="item-details">
      <h2>{item.name}</h2>
      <p>{item.description}</p>
      <p>Prijs: {item.price} Euro</p>
      <p>SKU: {item.sku}</p>
      <p>Count: {item._count?.products}</p>
    </div>
  );
}
