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

export default function StockSplitChart() {
  const [stockData, setStockData] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://localhost:8000/dashboard/getStockSplitData", {
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
    <Card>
      <CardHeader>
        <CardTitle>Voorraad verdeling</CardTitle>
        <CardDescription>Waar ligt de voorraad?</CardDescription>
      </CardHeader>
      <CardContent>
        <PieChart width={400} height={300}>
          <Pie
            data={stockData}
            dataKey="_count.items"
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label
          />
          <Tooltip />
          <Legend />
        </PieChart>
      </CardContent>
    </Card>
  );
}
