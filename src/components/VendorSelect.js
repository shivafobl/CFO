import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VendorSelect = ({ setSelectedVendor }) => {
  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    // Fetch vendors from the backend
    const fetchVendors = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/vendors');
        setVendors(response.data);
      } catch (error) {
        console.error('Error fetching vendors:', error);
      }
    };
    fetchVendors();
  }, []);

  return (
    <div>
      <h2>Select Vendor</h2>
      <select onChange={(e) => setSelectedVendor(e.target.value)}>
        {vendors.map((vendor) => (
          <option key={vendor.id} value={vendor.id}>
            {vendor.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default VendorSelect;
