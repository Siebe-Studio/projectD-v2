import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import AddProductDialog from "@/components/products/AddProductDialog";
import { ProductTable } from "@/components/products/ProductTable"; // Ensure you're using the named export

export default function Products() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/products", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          setError("Invalid data format");
        }
      } catch (error) {
        setError("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <main className="flex flex-col w-full h-full max-h-full p-4 gap-6">
      <div className="flex w-full">
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
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <ProductTable data={products} />
          )}
        </CardContent>
      </Card>
    </main>
  );
}
