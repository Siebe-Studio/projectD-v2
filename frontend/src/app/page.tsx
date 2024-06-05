"use client";

import { useSession } from "next-auth/react";

import StockSplitChart from "@/components/dashboard/StockSplitChart";
import TotalStock from "@/components/dashboard/TotalStock";

export default function Home() {
  const { data: session } = useSession();
  return (
    <main className="flex min-h-screen flex-col p-4 gap-4">
      <div className="flex flex-col w-full ml-3 mt-3">
        <h1 className="text-3xl">Hallo, {session?.user.name}</h1>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <StockSplitChart />
        <TotalStock />
      </div>
    </main>
  );
}
