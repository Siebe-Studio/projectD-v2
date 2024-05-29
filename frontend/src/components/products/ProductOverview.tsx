import * as React from "react";
import Link from "next/link";

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  categoryId: number;
  category: {
    id: number;
    name: string;
  };
  _count: {
    items: number;
  };
};

export function ProductOverview({ products }: { products: Product[] }) {
  return (
    <div className="flex flex-wrap gap-4">
      {products.map((product) => (
        <div key={product.id} className="border rounded-md p-4 w-72">
          <h2 className="text-lg font-semibold">{product.name}</h2>
          <p className="text-gray-600">{product.description}</p>
          <p className="mt-2">
            Price: {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(product.price)}
          </p>
          <Link href={`/producten/${product.id}`}>
            <a className="text-blue-500 hover:underline">View Details</a>
          </Link>
        </div>
      ))}
    </div>
  );
}
