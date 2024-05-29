"use client";
""
import { useEffect, useState } from "react";

import { Product } from "./ProductTable";

interface ProductDetailsProps {
  productId: number;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ productId }) => {
  const [product, setProduct] = useState<Product | null>(null);


  useEffect(() => {
    // Fetch product details using productId
    fetch(`http://localhost:8000/product/${productId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setProduct(data);
        }
      })
      .catch((error) => console.error(error));
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-details">
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <div className="details">
        <table className="details-table">
          <tbody>
            <tr>
              <td className="details-label">Price:</td>
              <td className="details-value">{product.price}</td>
            </tr>
            {/* Check if product.category exists before accessing its properties */}
            {product.category && (
              <tr>
                <td className="details-label">Category:</td>
                <td className="details-value">{product.category.name}</td>
              </tr>
            )}
            <tr>
              <td className="details-label">Items:</td>
              <td className="details-value">{product._count.items}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <button className="back-button" onClick={() => {}}> {product.name}
        Back
      </button>
    </div>
  );
};

export default ProductDetails;
