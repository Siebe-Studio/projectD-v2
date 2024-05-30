import { WarehouseTable } from "@/components/warehouse/Warehouse"
export default function WarehousePage({params}: {params: { id: string}}) {
    return (
        <div>
            <h1>WarehousePage: {params.id}</h1>
            <WarehouseTable/>
        </div>
    );
}