import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import UpdateVehicleForm from "./UpdateVehicleForm";

export default function UpdateVehicleDialog({ vehicle }: { vehicle: any }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full bg-none bg:hover">Edit Vehicle</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Voertuig bewerken</DialogTitle>
          <DialogDescription>Bewerk een voertuig</DialogDescription>
        </DialogHeader>

        <UpdateVehicleForm vehicle={vehicle} />
      </DialogContent>
    </Dialog>
  );
}
