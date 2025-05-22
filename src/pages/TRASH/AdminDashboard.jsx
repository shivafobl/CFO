// // import React, { useEffect, useState } from 'react';
// // import axios from 'axios';

// // const AdminDashboard = () => {
// //   const [orders, setOrders] = useState([]);
// //   const [summary, setSummary] = useState([]);
// //   const [filterDate, setFilterDate] = useState('');
// //   const [filterMeal, setFilterMeal] = useState('');
// //   const [searchTerm, setSearchTerm] = useState('');

// //   useEffect(() => {
// //     fetchOrders();
// //     fetchSummary();
// //   }, []);

// //   const fetchOrders = async () => {
// //     try {
// //       const res = await axios.get('http://localhost:5000/api/admin/orders');
// //       setOrders(res.data);
// //     } catch (err) {
// //       console.error('Failed to fetch orders:', err);
// //     }
// //   };

// //   const fetchSummary = async () => {
// //     try {
// //       const res = await axios.get('http://localhost:5000/api/admin/summary');
// //       setSummary(res.data);
// //     } catch (err) {
// //       console.error('Failed to fetch summary:', err);
// //     }
// //   };

// //   const filteredOrders = orders.filter(order => {
// //     const matchesDate = filterDate ? order.order_date === filterDate : true;
// //     const matchesMeal = filterMeal ? order.meal_type === filterMeal : true;
// //     const matchesSearch = searchTerm
// //       ? order.employee_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //         order.employee_id.toLowerCase().includes(searchTerm.toLowerCase())
// //       : true;
// //     return matchesDate && matchesMeal && matchesSearch;
// //   });

// //   return (
// //     <div className="p-6">
// //       <h1 className="text-3xl font-bold mb-4 text-orange-700">Admin Dashboard</h1>

// //       {/* Filters */}
// //       <div className="flex flex-wrap gap-4 mb-6">
// //         <input
// //           type="date"
// //           className="border px-3 py-2 rounded"
// //           value={filterDate}
// //           onChange={(e) => setFilterDate(e.target.value)}
// //         />
// //         <select
// //           className="border px-3 py-2 rounded"
// //           value={filterMeal}
// //           onChange={(e) => setFilterMeal(e.target.value)}
// //         >
// //           <option value="">All Meals</option>
// //           <option value="breakfast">Breakfast</option>
// //           <option value="lunch">Lunch</option>
// //           <option value="dinner">Dinner</option>
// //         </select>
// //         <input
// //           type="text"
// //           className="border px-3 py-2 rounded"
// //           placeholder="Search by name or ID"
// //           value={searchTerm}
// //           onChange={(e) => setSearchTerm(e.target.value)}
// //         />
// //       </div>

// //       {/* Orders Table */}
// //       <div className="mb-10">
// //         <h2 className="text-xl font-semibold mb-2">All Orders</h2>
// //         <div className="overflow-x-auto bg-white shadow-md rounded-lg">
// //           <table className="min-w-full text-sm text-left">
// //             <thead className="bg-orange-100">
// //               <tr>
// //                 <th className="px-4 py-2">Date</th>
// //                 <th className="px-4 py-2">Meal</th>
// //                 <th className="px-4 py-2">Employee</th>
// //                 <th className="px-4 py-2">Items</th>
// //                 <th className="px-4 py-2">Total Price</th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {filteredOrders.map((order, index) => (
// //                 <tr key={index} className="border-b hover:bg-gray-100">
// //                   <td className="px-4 py-2">{order.order_date}</td>
// //                   <td className="px-4 py-2 capitalize">{order.meal_type}</td>
// //                   <td className="px-4 py-2">{order.employee_name} ({order.employee_id})</td>
// //                   <td className="px-4 py-2">{order.items.join(', ')}</td>
// //                   <td className="px-4 py-2">₹{order.total_price}</td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         </div>
// //       </div>

// //       {/* Demand Summary */}
// //       <div>
// //         <h2 className="text-xl font-semibold mb-2">Demand Summary</h2>
// //         <div className="overflow-x-auto bg-white shadow-md rounded-lg">
// //           <table className="min-w-full text-sm text-left">
// //             <thead className="bg-orange-100">
// //               <tr>
// //                 <th className="px-4 py-2">Date</th>
// //                 <th className="px-4 py-2">Meal</th>
// //                 <th className="px-4 py-2">Item</th>
// //                 <th className="px-4 py-2">Quantity</th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {summary.map((row, index) => (
// //                 <tr key={index} className="border-b hover:bg-gray-100">
// //                   <td className="px-4 py-2">{row.order_date}</td>
// //                   <td className="px-4 py-2 capitalize">{row.meal_type}</td>
// //                   <td className="px-4 py-2">{row.item_name}</td>
// //                   <td className="px-4 py-2">{row.total_quantity}</td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default AdminDashboard;



// import React from "react";
// import { useNavigate } from "react-router-dom";

// const AdminDashboard = () => {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem("adminToken");
//     navigate("/admin/login");
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-8">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-3xl font-bold">Admin Dashboard</h1>
//         <button
//           className="bg-red-500 text-white px-4 py-2 rounded-lg"
//           onClick={handleLogout}
//         >
//           Logout
//         </button>
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         <button
//           className="bg-blue-600 text-white py-4 px-6 rounded-xl shadow hover:bg-blue-700"
//           onClick={() => navigate("/admin/vendors")}
//         >
//           Vendor Management
//         </button>
//         <button
//           className="bg-green-600 text-white py-4 px-6 rounded-xl shadow hover:bg-green-700"
//           onClick={() => navigate("/admin/email-vendor")}
//         >
//           Send Emails to Vendor
//         </button>
//         <button
//           className="bg-purple-600 text-white py-4 px-6 rounded-xl shadow hover:bg-purple-700"
//           onClick={() => navigate("/admin/most-bought")}
//         >
//           Most Bought Items
//         </button>
//         <button
//           className="bg-orange-600 text-white py-4 px-6 rounded-xl shadow hover:bg-orange-700"
//           onClick={() => navigate("/admin/date-wise-orders")}
//         >
//           Date-wise Orders History
//         </button>
//         <button
//           className="bg-gray-700 text-white py-4 px-6 rounded-xl shadow hover:bg-gray-800"
//           onClick={() => navigate("/admin/settings")}
//         >
//           Settings
//         </button>
//         <button
//           className="bg-pink-600 text-white py-4 px-6 rounded-xl shadow hover:bg-pink-700"
//           onClick={() => navigate("/admin/notify-employees")}
//         >
//           Notifications to Employees
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;


import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-lg"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <button
          className="bg-blue-600 text-white py-4 px-6 rounded-xl shadow hover:bg-blue-700"
          onClick={() => navigate('/admin/vendors')}
        >
          Vendor Management
        </button>
        <button
          className="bg-green-600 text-white py-4 px-6 rounded-xl shadow hover:bg-green-700"
          onClick={() => navigate('/admin/email-vendor')}
        >
          Send Emails to Vendor
        </button>
        <button
          className="bg-purple-600 text-white py-4 px-6 rounded-xl shadow hover:bg-purple-700"
          onClick={() => navigate('/admin/most-bought')}
        >
          Most Bought Items
        </button>
        <button
          className="bg-orange-600 text-white py-4 px-6 rounded-xl shadow hover:bg-orange-700"
          onClick={() => navigate('/admin/date-wise-orders')}
        >
          Date-wise Orders History
        </button>
        <button
          className="bg-gray-700 text-white py-4 px-6 rounded-xl shadow hover:bg-gray-800"
          onClick={() => navigate('/admin/settings')}
        >
          Settings
        </button>
        <button
          className="bg-pink-600 text-white py-4 px-6 rounded-xl shadow hover:bg-pink-700"
          onClick={() => navigate('/admin/notify-employees')}
        >
          Notifications to Employees
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;