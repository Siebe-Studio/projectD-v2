"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
  FormField,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const formSchema = z.object({
  plate: z.string().min(2, {
    message: "Kenteken moet minimaal 2 karakters bevatten",
  }),
  description: z.string().min(2, {
    message: "Omschrijving moet minimaal 2 karakters bevatten",
  }),
  location_id: z.number().min(1, {
    message: "Locatie ID moet een geldig nummer zijn",
  }),
});

export default function UpdateVehicleForm({ vehicle }: { vehicle: any }) {
  const { data: session } = useSession();
  const [postVehicle, setPostVehicle] = useState<any>(null);

  const submitVehicle = async (values: any) => {
    try {
      const response = await fetch(`http://localhost:8000/vehicles/${vehicle.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${session?.accessToken}`,
        },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      toast.success("Voertuig geüpdatet");
      setPostVehicle(data);
    } catch (error) {
      console.error(error);
    }
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      plate: vehicle.plate,
      description: vehicle.description,
      location_id: vehicle.location_id,
    },
  });

  useEffect(() => {
    if (postVehicle) {
      form.reset({
        plate: postVehicle.plate,
        description: postVehicle.description,
        location_id: postVehicle.location_id,
      });
    }
  }, [postVehicle, form]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    submitVehicle(values);
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
              <FormLabel>Omschrijving</FormLabel>
              <FormControl>
                <Input placeholder="Omschrijving van het voertuig" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Locatie ID</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Locatie ID"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
