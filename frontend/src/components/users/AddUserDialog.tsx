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
import AddUserForm from "./AddUserForm"

export default function AddUserDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full">+ User</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>User toevoegen</DialogTitle>
          <DialogDescription>
            Maak een nieuw user aan.
          </DialogDescription>
        </DialogHeader>

        <AddUserForm/>
      </DialogContent>
    </Dialog>
  )
}
