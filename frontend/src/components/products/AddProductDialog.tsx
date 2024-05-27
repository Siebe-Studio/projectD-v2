import { Button } from "@/components/products/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/products/ui/dialog"
import AddProductForm from "./AddProductForm"

export default function AddProductDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full">+ Product</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Product toevoegen</DialogTitle>
          <DialogDescription>
            Maak een nieuw product aan.
          </DialogDescription>
        </DialogHeader>

        <AddProductForm/>
      </DialogContent>
    </Dialog>
  )
}
