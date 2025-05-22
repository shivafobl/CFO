import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const MostBoughtItems = () => {
  const [items, setItems] = useState([]);
  const [date, setDate] = useState('');
  const navigate = useNavigate();

  const fetchMostBoughtItems = async () => {
    try {
      const response = await axios.get(`/api/items/most-bought?date=${date}`);
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching most bought items:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Most Bought Items</h1>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          onClick={() => navigate('/admin/dashboard')}
        >
          Back to Dashboard
        </button>
      </div>

      <div className="bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">Most Bought Items</h2>
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
            onClick={fetchMostBoughtItems}
          >
            Fetch Items
          </button>
        </div>
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left">Item Name</th>
              <th className="text-left">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item.name}>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MostBoughtItems;