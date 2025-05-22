import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const DateWiseOrdersHistory = () => {
  const [orders, setOrders] = useState([]);
  const [date, setDate] = useState('');
  const navigate = useNavigate();

  const fetchOrdersHistory = async () => {
    try {
      const response = await axios.get(`/api/orders/history?date=${date}`);
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders history:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Date-wise Orders History</h1>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          onClick={() => navigate('/admin/dashboard')}
        >
          Back to Dashboard
        </button>
      </div>

      <div className="bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">Orders History</h2>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="date">
            Date
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2"
            onClick={fetchOrdersHistory}
          >
            Fetch Orders
          </button>
        </div>
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left">Order ID</th>
              <th className="text-left">Vendor Name</th>
              <th className="text-left">Total Amount</th>
              <th className="text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.vendor_name}</td>
                <td>{order.total_amount}</td>
                <td>{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DateWiseOrdersHistory;