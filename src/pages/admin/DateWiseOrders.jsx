import React, { useState } from "react";
import axios from "axios";

const DateWiseOrders = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

  const fetchOrders = async () => {
    if (!selectedDate) {
      setError("Please select a date");
      return;
    }

    try {
      const res = await axios.get(`http://localhost:5000/api/admin/orders-history?date=${selectedDate}`);
      setOrders(res.data);
      setError("");
    } catch (err) {
      console.error("Error fetching orders", err);
      setError("Failed to load order history");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Date-wise Orders History</h2>

      <div className="flex gap-4 mb-4 items-center">
        <input
          type="date"
          className="p-2 border rounded"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
        <button
          onClick={fetchOrders}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Fetch History
        </button>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      {orders.length > 0 ? (
        <table className="w-full border mt-4 text-left">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2">Employee Name</th>
              <th className="p-2">Vendor</th>
              <th className="p-2">Item</th>
              <th className="p-2">Quantity</th>
              <th className="p-2">Total Price</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, idx) => (
              <tr key={idx} className="border-t">
                <td className="p-2">{order.employee_name}</td>
                <td className="p-2">{order.vendor_name}</td>
                <td className="p-2">{order.item_name}</td>
                <td className="p-2">{order.quantity}</td>
                <td className="p-2">₹{order.total_price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="mt-4">No orders found for the selected date</p>
      )}
    </div>
  );
};

export default DateWiseOrders;
