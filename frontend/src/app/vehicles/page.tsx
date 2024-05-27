"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import AddVehicleDialog from "@/components/vehicles/AddVehicleDialog";
import { VehicleTable } from "@/components/vehicles/VehicleTable"; // Zorg ervoor dat je de named export gebruikt

export default function Vehicles() {
  const { data: session } = useSession();
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/vehicles", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (Array.isArray(data)) {
          setVehicles(data);
        } else {
          setError("Invalid data format");
        }
      } catch (error) {
        setError("Failed to fetch vehicles");
      } finally {
        setLoading(false);
      }
    };
    fetchVehicles();
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
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <VehicleTable data={vehicles} />
          )}
        </CardContent>
      </Card>
    </main>
  );
}
