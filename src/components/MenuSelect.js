import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MenuSelect = ({ vendorId, mealType, setMenuItems }) => {
  useEffect(() => {
    if (vendorId && mealType) {
      // Fetch menu items for the selected vendor and meal type
      const fetchMenu = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/menus/${vendorId}?meal_type=${mealType}`);
          setMenuItems(response.data);
        } catch (error) {
          console.error('Error fetching menu items:', error);
        }
      };
      fetchMenu();
    }
  }, [vendorId, mealType, setMenuItems]);

  return (
    <div>
      <h2>Select Menu</h2>
      {/* Add logic to display available menu items */}
    </div>
  );
};

export default MenuSelect;
