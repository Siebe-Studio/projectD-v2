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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/products/ui/card";
import { toast } from "sonner";

import React, { useEffect, useState } from "react";

const formSchema = z.object({
  productId: z.coerce.number().int().positive({
    message: "Locatie is verplicht",
  }),
});

export default function Preperation() {
  const [products, setProducts] = useState<any[]>([]);

  const submitBusPreperation = (values: any) => {
    fetch("http://localhost:8000/vehicle/addToBus", {
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

  useEffect(() => {
    fetch("http://localhost:8000/product", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setProducts(data);
          console.log(data);
        }
      })
      .catch((error) => console.error(error));
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productId: 0,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    form.reset();
    submitBusPreperation(values);
  }

  return (
    <main className="flex flex-col w-full h-full max-h-full p-4 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Bus Vullen</CardTitle>
          <CardDescription>
            Je kan hier een bus selecteren en die vullen met producten
          </CardDescription>
        </CardHeader>
        <CardContent>
            <p>Selecteer een product</p>
            
        </CardContent>
      </Card>
    </main>
  );
}
