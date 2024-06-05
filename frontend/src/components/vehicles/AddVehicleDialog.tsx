import React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/products/ui/dialog";
import { Button } from "@/components/products/ui/button";
import AddVehicleForm from "./AddVehicleForm";
import type { Vehicle } from "./VehicleTable";

export default function AddVehicleDialog({ handleAddVehicle }: { handleAddVehicle: (vehicle: Vehicle) => void }) {


  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>+ Voertuig</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Voertuig toevoegen</DialogTitle>
        <DialogDescription>
          Vul de volgende velden in om een nieuw voertuig toe te voegen.
        </DialogDescription>
        <AddVehicleForm handleAddVehicle={handleAddVehicle} />
      </DialogContent>
    </Dialog>
  );
}
