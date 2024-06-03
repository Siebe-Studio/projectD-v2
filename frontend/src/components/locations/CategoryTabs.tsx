import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { WarehouseDataTable } from "@/components/locations/WarehouseDataTable";
import { VehiclesDataTable } from "@/components/locations/ehiclesDataTable";
import { LocationsDataTable } from "@/components/locations/LocationsDataTable";

export function GetCategoryTabs() {
  return (
    <Tabs defaultValue="warehouse" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="warehouse">Warehouse</TabsTrigger>
        <TabsTrigger value="vehicles">Vehicles</TabsTrigger>
        <TabsTrigger value="locations">Locaties</TabsTrigger>
      </TabsList>

      <TabsContent value="warehouse">
        <WarehouseDataTable />
      </TabsContent>

      <TabsContent value="vehicles">
        <VehiclesDataTable />
      </TabsContent>

      <TabsContent value="locations">
        <LocationsDataTable />
      </TabsContent>
    </Tabs>
  );
}
