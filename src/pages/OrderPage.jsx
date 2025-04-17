// src/pages/OrderPage.jsx
import React, { useState } from 'react';

function OrderPage() {
  const [selectedItem, setSelectedItem] = useState('');
  const [quantity, setQuantity] = useState(1);

  const menu = ['Idli', 'Dosa', 'Chapati', 'Rice', 'Pongal'];

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Send order data to backend
    console.log(`Ordered ${quantity} x ${selectedItem}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-xl font-bold mb-4 text-center">Place Your Order</h2>

        <label className="block mb-2 font-medium">Select Item</label>
        <select
          value={selectedItem}
          onChange={(e) => setSelectedItem(e.target.value)}
          className="w-full mb-4 p-2 border border-gray-300 rounded"
          required
        >
          <option value="">-- Choose an item --</option>
          {menu.map((item, index) => (
            <option key={index} value={item}>{item}</option>
          ))}
        </select>

        <label className="block mb-2 font-medium">Quantity</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          min="1"
          className="w-full mb-4 p-2 border border-gray-300 rounded"
          required
        />

        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
        >
          Submit Order
        </button>
      </form>
    </div>
  );
}

export default OrderPage;
