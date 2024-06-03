"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormReturn } from "react-hook-form";
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
import { Input } from "@/components/products/ui/input";
import { Textarea } from "@/components/products/ui/textarea";
import { toast } from "sonner";
import React, { useEffect, useState } from "react";

const formSchema = z.object({
  location_id: z.number({
    required_error: "Locatie ID is verplicht",
  }).int(),
  plate: z.string().min(2, {
    message: "Kenteken moet minimaal 2 karakters bevatten",
  }),
  description: z.string().max(255, {
    message: "Maximaal 255 karakters",
  }).optional(),
});

export default function AddVehicleForm() {
  const [postVehicle, setPostVehicle] = useState<any>();

  const submitVehicle = (values: any) => {
    fetch("http://localhost:8000/vehicles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          toast.success("Voertuig toegevoegd");
          console.log(data);
        }
      })
      .catch((error) => console.error(error));
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      location_id: 1,
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
          name="location_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location ID</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value))}
                />
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
