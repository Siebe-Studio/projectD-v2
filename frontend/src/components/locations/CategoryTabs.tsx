import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { WarehouseDataTable } from "@/components/locations/WarehouseList"
import { VehiclesDataTable } from "@/components/locations/Vehicles"

export function GetCategoryTabs() {
  return (
    <Tabs defaultValue="account" className="w-full">
      <TabsList className="grid w-full flex-col felx grid-cols-2">
        <TabsTrigger value="warehouse">Warehouse</TabsTrigger>
        <TabsTrigger value="vehicles">Vehicles</TabsTrigger>
      </TabsList>

      <TabsContent value="warehouse">
      <WarehouseDataTable/>
      </TabsContent>

      <TabsContent value="vehicles">
      <VehiclesDataTable/>
      </TabsContent>
    </Tabs>
  )
}
