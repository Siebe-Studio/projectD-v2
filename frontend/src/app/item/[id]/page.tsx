import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ItemDetails } from "@/components/items/ItemDetails"; 

export default function ItemPage({ params }: { params: { id: string } }) {
  const { id } = params;

  return (
    <main className="flex flex-col w-full h-full max-h-full p-4 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Item</CardTitle>
          <CardDescription>Details</CardDescription>
        </CardHeader>
        <CardContent>
          <ItemDetails itemId={parseInt(id, 10)} />
          
        </CardContent>
      </Card>
    </main>
  );
}
