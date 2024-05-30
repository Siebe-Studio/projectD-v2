import { WarehouseTable } from "@/components/warehouse/Warehouse"
export default function WarehousePage({params}: {params: { id: string}}) {
    return (
        <div className="flex flex-col w-full h-full max-h-full p-4 gap-6">
            <h1>WarehousePage: {params.id}</h1>
            <WarehouseTable/>
        </div>
    );
}