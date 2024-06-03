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
import { Input } from "@/components/products/ui/input";
import { Textarea } from "@/components/products/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/products/ui/select";
import { toast } from "sonner";

import React, { useEffect, useState } from "react";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Naam moet minimaal 5 karakters bevatten",
  }),
  description: z.string().max(255, {
    message: "Maximaal 255 karakters",
  }),
  price: z.coerce.number().int().positive({
    message: "Moet hoger dan 0 zijn",
  }),
  categoryId: z.coerce.number().int().positive({
    message: "Categorie is verplicht",
  }),
});

export default function AddProductForm({
  handleAddProduct,
}: {
  handleAddProduct: Function;
}) {
  const [categories, setCategories] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);
  const submitProduct = (values: any) => {
    fetch("http://localhost:8000/product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          try{
            handleAddProduct(data);
          }
          catch(e){
            console.error(e);
            toast.error("Product kon niet worden toegevoegd, probeer opnieuw");
          }
          toast.success("Product toegevoegd");
          console.log(data);
        }
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    fetch("http://localhost:8000/category", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setCategories(data);
          console.log(data);
        }
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      categoryId: 0,
      price: 0,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    form.reset();
    submitProduct(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Naam</FormLabel>
              <FormControl>
                <Input placeholder="Warmtepomp LMN..." {...field} />
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
                  placeholder="Ex. 200kg, wit, 2000 kW/h"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Prijs</FormLabel>
              <FormControl>
                <Input placeholder="999" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor={field.name}>Categorie</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="..." />
                  </SelectTrigger>
                  <SelectContent>
                    {categories?.map((category) => (
                      <SelectItem key={category.id} value={`${category.id}`}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
