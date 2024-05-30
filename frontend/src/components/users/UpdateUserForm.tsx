"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { boolean, z } from "zod";

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

export default function UpdateUserForm({user}: {user: any}) {
  const { data: session } = useSession();
  const [postUser, setPostUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const submitUser = async (values: any) => {
    try {
      const response = await fetch("http://localhost:8000/user/" + user.user.id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${session?.user}`,
        },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      toast.success("User geupdate");
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user.user.name,
      email: user.user.email,
      role: user.user.role,
    },
  });

  useEffect(() => {
    if (postUser) {
      form.reset({
        name: postUser.name,
        email: postUser.email,
        role: postUser.role,
      });
    }
  }, [postUser, form]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    submitUser(values);
    form.reset();
  };

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
                    <SelectValue defaultValue={user.user.role} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem key="USER" value="USER">User</SelectItem>
                    <SelectItem key="STOCKMANAGER" value="STOCKMANAGER">MagazijnMedewerker</SelectItem>
                    <SelectItem key="ADMIN" value="ADMIN">Admin</SelectItem>
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
