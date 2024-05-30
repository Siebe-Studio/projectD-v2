import { GetCategoryTabs } from "@/components/locations/CategoryTabs"

export default async function Location() {
    return (
        <div className="flex flex-col w-full h-full max-h-full p-4 gap-6">
        <GetCategoryTabs/>
        </div>
    )
}