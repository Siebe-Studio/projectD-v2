import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from "@/components/products/ui/button";
import { Input } from "@/components/products/ui/input";

interface VehicleFormData {
  location_id: number;
  plate: string;
  description: string;
}

const AddVehicleForm: React.FC = () => {
  const { register, handleSubmit, reset } = useForm<VehicleFormData>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: VehicleFormData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:8000/api/vehicles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error response from server:", errorData);
        throw new Error("Failed to add vehicle");
      }

      const newVehicle = await response.json();
      console.log("Vehicle added successfully:", newVehicle);

      // Hier kun je eventueel een callback toevoegen om de lijst bij te werken

      reset();
    } catch (error) {
      setError("Error adding vehicle");
      console.error("Error adding vehicle:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label>Location ID</label>
        <Input {...register("location_id", { required: true })} type="number" />
      </div>
      <div>
        <label>Plaat</label>
        <Input {...register("plate", { required: true })} type="text" />
      </div>
      <div>
        <label>Beschrijving</label>
        <Input {...register("description", { required: true })} type="text" />
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <Button type="submit" disabled={loading}>
        {loading ? "Toevoegen..." : "Voertuig toevoegen"}
      </Button>
    </form>
  );
};

export default AddVehicleForm;
