"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner"
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Naam moet minimaal 5 karakters bevatten",
  }),
  email: z.string().email({
    message: "Ongeldig emailadres",
  }),
  role: z.string().min(2, {
    message: "Kies een rol",
  })
});

export default async function UpdateUserForm({userId}: {userId: string}) {
  const { data: session } = useSession();

  const [categories, setCategories] = useState<any[]>([]);
  const [postUser, setPostUser] = useState<any>();
  const [loading, setLoading] = useState(true);

  const submitUser = (values: any) => {
    fetch("http://localhost:8000/user/" + userId, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorisation": `Bearer ${session?.user}`
      },
      body: JSON.stringify(values),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          toast.success("User geupdate");
          console.log(data);
        }
      })
      .catch((error) => console.error(error));
  };

  await fetch("http://localhost:8000/user/" + userId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorisation": `Bearer ${session?.user}`
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setPostUser(data);
          console.log(data);
        }
      })
      .catch((error) => console.error(error));
  

  // 1. Define your form.
const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        name: postUser.name,
        email: postUser.email,
        role: postUser.role,
    },
});

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    submitUser(values);
    form.reset();
    
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
                <Input placeholder="Jaapie" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="voorbeeld@voorbeeld.nl" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor={field.name}>Rol</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem key="User" value="User">User</SelectItem>
                    <SelectItem key="MagazijnMedewerker" value="MagazijnMedewerker">MagazijnMedewerker</SelectItem>
                    <SelectItem key="Admin" value="Admin">Admin</SelectItem>
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
