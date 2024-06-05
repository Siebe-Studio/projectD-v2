import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import AddItemForm from "./AddItemForm"

export default function AddItemDialog({ productId }: { productId: number })  {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full">+ Item</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Item toevoegen</DialogTitle>
          <DialogDescription>
            Maak een nieuw item aan.
          </DialogDescription>
        </DialogHeader>

        {/* Correct the prop name to `productId` */}
        <AddItemForm ProductId={productId} />
      </DialogContent>
    </Dialog>
  )
}