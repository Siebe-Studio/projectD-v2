import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LocationsDataTable } from "@/components/locations/All_Locations"
import { WarehouseDataTable } from "@/components/locations/Warehouse"
import { VehiclesDataTable } from "@/components/locations/Vehicles"
import { ClientsDataTable } from "@/components/locations/Clients"
import { HistoryDataTable } from "@/components/locations/History"

export function GetCategoryTabs() {
  return (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="all">All</TabsTrigger>
        <TabsTrigger value="warehouse">Warehouse</TabsTrigger>
        <TabsTrigger value="vehicles">Vehicles</TabsTrigger>
        <TabsTrigger value="clients">Clients</TabsTrigger>
        <TabsTrigger value="history">History</TabsTrigger>
      </TabsList>

      <TabsContent value="all">
      <LocationsDataTable/>
      </TabsContent>

      <TabsContent value="warehouse">
      <WarehouseDataTable/>
      </TabsContent>

      <TabsContent value="vehicles">
      <VehiclesDataTable/>
      </TabsContent>

      <TabsContent value="clients">
      <ClientsDataTable/>
      </TabsContent>

      <TabsContent value="history">
      <HistoryDataTable/>
      </TabsContent>
    </Tabs>
  )
}
