"use client";

import { useState, useEffect } from "react";
import { VehicleTable, Vehicle } from "@/components/vehicles/VehicleTable";
import AddVehicleDialog from "@/components/vehicles/AddVehicleDialog";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/products/ui/card";

export default function Vehicles() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);

  function handleAddVehicle(vehicle: any) {
    setVehicles([...vehicles, vehicle]);
  }

  function handleDeleteVehicle(vehicle: any) {
    setVehicles(vehicles.filter((v) => v.id !== vehicle.id));
  }

  useEffect(() => {
    fetch("http://localhost:8000/vehicle", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setVehicles(data);
          console.log(data);
        }
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="flex flex-col w-full h-full max-h-full p-4 gap-6">
      <div className="flex w-full">
        <Card>
          <CardHeader>
            <CardTitle>Voertuig toevoegen</CardTitle>
          </CardHeader>
          <CardContent>
            <AddVehicleDialog handleAddVehicle={handleAddVehicle}  />
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Voertuigen</CardTitle>
          <CardDescription>Overzicht van alle voertuigen</CardDescription>
        </CardHeader>
        <CardContent>
          <VehicleTable data={vehicles} handleDeleteVehicle={handleDeleteVehicle} />
        </CardContent>
      </Card>
    </main>
  );
}
