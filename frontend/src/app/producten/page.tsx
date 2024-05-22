"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ProductTable } from "@/components/products/ProductTable";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Products() {
  const { data: session } = useSession();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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
    <main className="flex flex-col w-full h-full p-4">
      <Card>
        <CardHeader>
          <CardTitle>Producten</CardTitle>
          <CardDescription>Overzicht van alle producten</CardDescription>
        </CardHeader>
        <CardContent>
            <ProductTable data={products}/>
        </CardContent>
      </Card>
    </main>
  );
}
