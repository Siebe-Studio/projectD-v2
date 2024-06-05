import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductDetails } from "@/components/products/ProductDetail";
import { ItemTable } from "@/components/items/ItemTable";
import AddItemDialog from "@/components/items/AddItemDialog"; // Imported AddItemDialog

export default function ProductPage({ params }: { params: { id: string } }) {
  const { id } = params;

  return (
    <main className="flex flex-col w-full h-full max-h-full p-4 gap-6">
      <div className="flex w-full">
        <Card>
          <CardHeader>
            <CardTitle>Item toevoegen</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Pass the product ID as a prop to AddItemDialog */}
            <AddItemDialog productId={parseInt(id, 10)} />
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Product</CardTitle>
          <CardDescription>Overzicht</CardDescription>
        </CardHeader>
        <CardContent>
          <ProductDetails productId={parseInt(id, 10)} />
          <ItemTable productId={parseInt(id, 10)} />
        </CardContent>
      </Card>
    </main>
  );
}
