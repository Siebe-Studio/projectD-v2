"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { ProductTable, Product } from "@/components/products/ProductTable"; // Import the Product type
import AddProductDialog from "@/components/products/AddProductDialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {ItemTable} from "@/components/item/ItemTable";
import { ProductDetails } from "@/components/products/ProductDetail";
export default function Products() {
  const { data: session } = useSession();
  const [products, setProducts] = useState<Product[]>([]); // Use Product type here
  const [loading, setLoading] = useState(true);
  const [productId, setProductId] = useState<number>();
  
  
  useEffect(() => {
    fetch("http://localhost:8000/product", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setProducts(data);
          console.log(data);
        }
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="flex flex-col w-full h-full max-h-full p-4 gap-6">
      <div className="flex w-fi">
        <Card>
          <CardHeader>
            <CardTitle>Product toevoegen</CardTitle>
          </CardHeader>
          <CardContent>
            <AddProductDialog />
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Producten</CardTitle>
          <CardDescription>Overzicht van alle producten</CardDescription>
          </CardHeader>
        <CardContent>
          <ProductTable data={products} />
        </CardContent>
      </Card>
      <Card>
      <CardHeader>
        <CardTitle>Product</CardTitle>
        <CardDescription>Overzicht</CardDescription>
        </CardHeader>
      <CardContent>
        <ProductDetails data={products}/>
      <ItemTable data={products} productId={products[0]} />
      </CardContent>
    </Card>
    </main>
  );
}
