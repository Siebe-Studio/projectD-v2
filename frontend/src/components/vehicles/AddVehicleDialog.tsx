import React from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "@/components/products/ui/dialog";
import { Button } from "@/components/products/ui/button";
import AddVehicleForm from './AddVehicleForm';

const AddVehicleDialog: React.FC = () => (
  <Dialog>
    <DialogTrigger asChild>
      <Button>+ Voertuig</Button>
    </DialogTrigger>
    <DialogContent>
      <DialogTitle>Voertuig toevoegen</DialogTitle>
      <DialogDescription>
        Vul de volgende velden in om een nieuw voertuig toe te voegen.
      </DialogDescription>
      <AddVehicleForm />
    </DialogContent>
  </Dialog>
);

export default AddVehicleDialog;
