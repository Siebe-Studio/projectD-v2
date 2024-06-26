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

export default function UpdateUserDialog(user: any) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full bg-none bg:hover">Edit User</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>User bewerken</DialogTitle>
          <DialogDescription>
            Bewerk een user
          </DialogDescription>
        </DialogHeader>

        <UpdateUserForm user={user} />
      </DialogContent>
    </Dialog>
  )
}
