"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/products/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/products/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/products/ui/select";
import { Input } from "@/components/products/ui/input";
import { Textarea } from "@/components/products/ui/textarea";
import { toast } from "sonner";

import type { Vehicle } from "./VehicleTable";
import React, { useEffect, useState } from "react";

const formSchema = z.object({
  locationId: z.coerce.number().int().positive({
    message: "Locatie is verplicht",
  }),
  plate: z.string().min(2, {
    message: "Kenteken moet minimaal 2 karakters bevatten",
  }),
  description: z.string().max(255, {
    message: "Maximaal 255 karakters",
  }),
});

export default function AddVehicleForm({
  handleAddVehicle,
}: {
  handleAddVehicle: (vehicle: Vehicle) => void;
}) {
  const [locations, setLocations] = useState<any[]>([]);

  const submitVehicle = (values: any) => {
    fetch("http://localhost:8000/vehicle", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          try {
            handleAddVehicle(data);
          } catch (e) {
            console.error(e);
            toast.error("Voertuig kon niet worden toegevoegd, probeer opnieuw");
          }
          toast.success("Voertuig toegevoegd");
          console.log(data);
        }
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    fetch("http://localhost:8000/location", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setLocations(data);
          console.log(data);
        }
      })
      .catch((error) => console.error(error));
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      locationId: 0,
      plate: "",
      description: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    form.reset();
    submitVehicle(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="locationId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location ID</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="..." />
                  </SelectTrigger>
                  <SelectContent>
                    {locations?.map((location) => (
                      <SelectItem key={location.id} value={`${location.id}`}>
                        {location.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="plate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kenteken</FormLabel>
              <FormControl>
                <Input placeholder="AB-123-CD" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor={field.name}>
                Beschrijving (optioneel)
              </FormLabel>
              <FormControl>
                <Textarea
                  required={false}
                  {...field}
                  onChange={field.onChange}
                  value={field.value}
                  placeholder="Bijvoorbeeld: blauwe auto"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Voeg voertuig toe</Button>
      </form>
    </Form>
  );
}
