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
import UpdateUserForm from "./UpdateUserForm"

export default function UpdateUserDialog(userId: any) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full">Edit User</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>User bewerken</DialogTitle>
          <DialogDescription>
            Bewerk een user
          </DialogDescription>
        </DialogHeader>

        <UpdateUserForm userId={userId.toString()} />
      </DialogContent>
    </Dialog>
  )
}
