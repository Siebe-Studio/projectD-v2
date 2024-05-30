"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormField, FormItem, FormLabel, FormMessage, FormControl } from "@/components/ui/form";
import { toast } from "react-toastify";

const formSchema = z.object({
  location_id: z.number().int().positive({
    message: "Location ID moet een positief nummer zijn",
  }),
  plate: z.string().min(2, {
    message: "Kenteken moet minimaal 2 karakters bevatten",
  }),
  description: z.string().max(255, {
    message: "Maximaal 255 karakters",
  }),
});

export default function AddVehicleForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      plate: "",
      description: "",
      location_id: 1,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
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
          toast.success("Vehicle added successfully");
          form.reset();
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to add vehicle");
      });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="plate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Plate</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter plate" />
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
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="Enter description" />
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
              <FormLabel>Location ID</FormLabel>
              <FormControl>
                <Input {...field} type="number" placeholder="Enter location ID" />
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
