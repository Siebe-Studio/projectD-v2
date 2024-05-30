"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

import { VehicleTable } from "@/components/vehicles/VehicleTable";
import AddVehicleDialog from "@/components/vehicles/AddVehicleDialog";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Vehicles() {
  const { data: session } = useSession();
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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
            <AddVehicleDialog />
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Voertuigen</CardTitle>
          <CardDescription>Overzicht van alle voertuigen</CardDescription>
        </CardHeader>
        <CardContent>
          <VehicleTable data={vehicles} />
        </CardContent>
      </Card>
    </main>
  );
}
