import React, { useState } from 'react';
import axios from 'axios';

const OrderForm = ({ userId, vendorId, menuItems }) => {
  const [selectedMenuItem, setSelectedMenuItem] = useState('');
  const [orderDate, setOrderDate] = useState('');
  const [mealType, setMealType] = useState('Lunch');
  const [message, setMessage] = useState('');

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:5000/api/orders',
        {
          employee_id: userId,
          vendor_id: vendorId,
          menu_id: selectedMenuItem,
          order_date: orderDate,
          meal_type: mealType,
        }
      );
      setMessage('Order placed successfully');
    } catch (error) {
      setMessage('Error placing order');
    }
  };

  return (
    <div>
      <h2>Place Order</h2>
      <form onSubmit={handleOrderSubmit}>
        <select onChange={(e) => setSelectedMenuItem(e.target.value)}>
          {menuItems.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name} - {item.price}
            </option>
          ))}
        </select>
        <input
          type="date"
          value={orderDate}
          onChange={(e) => setOrderDate(e.target.value)}
        />
        <select onChange={(e) => setMealType(e.target.value)}>
          <option value="Lunch">Lunch</option>
          <option value="Dinner">Dinner</option>
        </select>
        <button type="submit">Submit Order</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default OrderForm;
