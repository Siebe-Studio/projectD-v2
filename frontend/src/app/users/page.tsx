"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

import { UserTable } from "@/components/users/UsersTable";
import AddUserDialog from "@/components/users/AddUserDialog";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Users() {
  const { data: session } = useSession();
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setUsers(data);
          console.log(data);
        }
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="flex flex-col w-full h-full max-h-full p-4 gap-6">
      <div className="flex w-fi">
        <Card>
          <CardHeader>
            <CardTitle>User toevoegen</CardTitle>
          </CardHeader>
            <CardContent>
                <AddUserDialog/>
            </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
          <CardDescription>Overzicht van alle users</CardDescription>
        </CardHeader>
        <CardContent>
          <UserTable data={users} />
        </CardContent>
      </Card>
    </main>
  );
}
