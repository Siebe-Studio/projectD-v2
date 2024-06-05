import { useState, useEffect } from "react";

interface Item {
  id: string;
  name: string;
}

interface VehicleItemsProps {
  vehicleId: string;
}

export default function VehicleItems({ vehicleId }: VehicleItemsProps) {
  const [items, setItems] = useState<Item[]>([]);
  const [allItems, setAllItems] = useState<Item[]>([]);
  const [selectedItemId, setSelectedItemId] = useState<string>("");

  useEffect(() => {
    fetch(`http://localhost:8000/vehicles/${vehicleId}/items`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setItems(data);
        } else {
          setItems([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching items for vehicle:", error);
        setItems([]);
      });

    fetch("http://localhost:8000/items")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched all items:", data); // Debug log
        if (Array.isArray(data)) {
          setAllItems(data);
        } else {
          setAllItems([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching all items:", error);
        setAllItems([]);
      });
  }, [vehicleId]);

  const handleAddItem = () => {
    if (!selectedItemId) return;

    fetch(`http://localhost:8000/item/${selectedItemId}/assign-to-vehicle/${vehicleId}`, {
      method: "PUT",
    })
      .then((res) => res.json())
      .then((data) => {
        setItems((prevItems) => [...prevItems, data]);
      })
      .catch((error) => {
        console.error("Error assigning item to vehicle:", error);
      });
  };

  return (
    <div>
      <h3>Items verbonden aan voertuig {vehicleId}</h3>
      <ul>
        {items.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
      <h3>Voeg een item toe aan voertuig {vehicleId}</h3>
      <div>
        <label htmlFor="itemId">Item ID</label>
        <select
          id="itemId"
          value={selectedItemId}
          onChange={(e) => setSelectedItemId(e.target.value)}
        >
          <option value="">Selecteer een item</option>
          {allItems.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
      <button onClick={handleAddItem}>Voeg Item Toe</button>
    </div>
  );
}
