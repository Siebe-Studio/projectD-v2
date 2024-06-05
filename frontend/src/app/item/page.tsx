"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { ItemTable } from "@/components/item/ItemTable";
import { ItemDetails } from "@/components/item/ItemDetails";
import { Product } from "@/components/products/ProductTable"; 

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ItemPage({ params }: { params: { id: string } }) {
  const { data: session } = useSession();
  const { id } = params;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:8000/product/${id}`, {
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
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <main className="flex flex-col w-full h-full max-h-full p-4 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Item</CardTitle>
          <CardDescription>Details</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Assuming ItemDetails can handle productId */}
          <ItemDetails itemId={parseInt(id, 10)} />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Items</CardTitle>
          <CardDescription>All items for this product</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Pass productId to ItemTable */}
          <ItemTable productId={product.id} />
        </CardContent>
      </Card>
    </main>
  );
}