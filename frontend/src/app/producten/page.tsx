"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

import { ProductTable } from "@/components/products/ProductTable";
import AddProductDialog from "@/components/products/AddProductDialog";

import { Button } from "@/components/products/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/products/ui/card";

export default function Products() {
  const { data: session } = useSession();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);


  function handleAddProduct(product: any) {
    setProducts([...products, product]);
  }

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
                <AddProductDialog handleAddProduct={handleAddProduct}/>
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
    </main>
  );
}
