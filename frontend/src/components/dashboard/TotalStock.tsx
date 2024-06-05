"use client";

import { PieChart, Pie, Tooltip, Legend } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";

export default function TotalStock() {
  const [stockData, setStockData] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://localhost:8000/dashboard/getTotalStock", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setStockData(data);
          console.log(data);
        }
      })
      .catch((error) => console.error(error))
  }, []);

  return (
    <Card className="h-fit w-fit">
      <CardHeader>
        <CardTitle>Totale voorraad</CardTitle>
        <CardDescription>Voorraad van alle bussen en locaties</CardDescription>
      </CardHeader>
      <CardContent>
        <h1 className="font-bold text-5xl">{stockData}</h1>
      </CardContent>
    </Card>
  );
}
