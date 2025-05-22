import React, { useEffect, useState } from "react";
import axios from "axios";

const MostBoughtItems = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");

  const fetchMostBoughtItems = async () => {
    if (!selectedDate) {
      setError("Please select a date");
      return;
    }

    try {
      const res = await axios.get(`http://localhost:5000/api/admin/most-bought-items?date=${selectedDate}`);
      setItems(res.data);
      setError("");
    } catch (err) {
      console.error("Failed to fetch items", err);
      setError("Error fetching most bought items");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Most Bought Items</h2>

      <div className="flex items-center gap-4 mb-4">
        <input
          type="date"
          className="p-2 border rounded"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
        <button onClick={fetchMostBoughtItems} className="bg-green-600 text-white px-4 py-2 rounded">
          Fetch Items
        </button>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      {items.length > 0 ? (
        <table className="w-full border mt-4 text-left">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2">Item Name</th>
              <th className="p-2">Vendor</th>
              <th className="p-2">Total Orders</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.item_id} className="border-t">
                <td className="p-2">{item.item_name}</td>
                <td className="p-2">{item.vendor_name}</td>
                <td className="p-2">{item.total_orders}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="mt-4">No data to show</p>
      )}
    </div>
  );
};

export default MostBoughtItems;