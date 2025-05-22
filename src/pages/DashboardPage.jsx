// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Utensils, Pizza, Salad } from 'lucide-react';



// const DashboardPage = () => {
//   const employeeId = localStorage.getItem('employeeId');
//   const user = JSON.parse(localStorage.getItem('user'));
//   const name = user?.name;

//   const [employeeName, setEmployeeName] = useState('');
//   const [vendors, setVendors] = useState([]);
//   const [vendorId, setVendorId] = useState('');
//   const [mealType, setMealType] = useState('');
//   const [menuItems, setMenuItems] = useState([]);
//   const [selectedItems, setSelectedItems] = useState([]);
//   const [orderSummary, setOrderSummary] = useState(null);
//   const [orderDate, setOrderDate] = useState('');

//   useEffect(() => {
//     if (employeeId) {
//       axios
//         .get(`http://localhost:5000/api/employees/${employeeId}`)
//         .then((res) => setEmployeeName(res.data.name))
//         .catch((err) => console.error('Error fetching name', err));
//     }
//   }, [employeeId]);

//   useEffect(() => {
//     axios
//       .get('http://localhost:5000/api/vendors')
//       .then((res) => setVendors(res.data))
//       .catch((err) => console.error('Error fetching vendors', err));
//   }, []);

//   useEffect(() => {
//     if (vendorId && mealType) {
//       axios
//         .get(`http://localhost:5000/api/menus?vendor_id=${vendorId}&meal_type=${mealType}`)
//         .then((res) => setMenuItems(res.data))
//         .catch((err) => console.error('Error fetching menu', err));
//     } else {
//       setMenuItems([]);
//     }
//   }, [vendorId, mealType]);

//   const toggleItem = (item) => {
//     setSelectedItems((prev) => {
//       const existingItem = prev.find((i) => i.id === item.id);
//       if (existingItem) {
//         return prev.map((i) =>
//           i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
//         );
//       }
//       return [...prev, { ...item, quantity: 1 }];
//     });
//   };

//   const removeItem = (item) => {
//     setSelectedItems((prev) =>
//       prev
//         .map((i) =>
//           i.id === item.id ? { ...i, quantity: i.quantity - 1 } : i
//         )
//         .filter((i) => i.quantity > 0)
//     );
//   };

//   const calculateTotal = () =>
//     selectedItems.reduce((acc, item) => acc + parseFloat(item.price) * item.quantity, 0);

//   const handleOrder = () => {
//     const newOrderNo = Math.floor(100000 + Math.random() * 900000);
//     const summary = {
//       orderNo: newOrderNo,
//       date: orderDate,
//       items: selectedItems.map((i) => ({
//         menu_item: i.menu_item,
//         quantity: i.quantity,
//       })),
//       total: calculateTotal(),
//     };
//     setOrderSummary(summary);

//     const token = localStorage.getItem('token');
//     axios
//       .post(
//         'http://localhost:5000/api/orders',
//         {
//           employeeId,
//           orderNo: newOrderNo,
//           date: orderDate,
//           items: summary.items,
//           total: summary.total,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       )
//       .then((response) => {
//         console.log('Order saved successfully:', response.data);
//         //alert('Order placed successfully');
//       })
//       .catch((err) => {
//         console.error('Error saving order:', err);
//         alert('Error placing order');
//       });

//     setSelectedItems([]);
//   };

//   const logout = () => {
//     localStorage.clear();
//     window.location.href = '/login';
//   };
//   const orderHistory = () => {
//    // localStorage.clear();
//     window.location.href = '/orderHistory';
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-orange-50 to-red-100 p-4">
//       <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-6 space-y-6">
//         {/* Header */}
//         <div className="flex justify-between items-center">
//           <h1 className="text-xl font-bold text-black">Welcome, {name || employeeName}</h1>
//           <button
//             onClick={orderHistory}
//             className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 place-items-end"
//           >
//             Order History
//           </button>
//           <button
//             onClick={logout}
//             className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
//           >
//             Logout
//           </button>
//         </div>

//         {/* Order History */}
//         {/* <OrderHistory employeeId={employeeId} /> */}

//         {/* Selection Row */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//           <div>
//             <label className="block mb-1 text-gray-700">Select Meal Type</label>
//             <select
//               value={mealType}
//               onChange={(e) => setMealType(e.target.value)}
//               className="w-full border rounded px-2 py-1"
//             >
//               <option value="">-- Select --</option>
//               <option value="Lunch">Lunch</option>
//               <option value="Dinner">Dinner</option>
//             </select>
//           </div>
//           <div>
//             <label className="block mb-1 text-gray-700">Pick Date</label>
//             <input
//               type="date"
//               value={orderDate}
//               onChange={(e) => setOrderDate(e.target.value)}
//               className="w-full border rounded px-2 py-1"
//             />
//           </div>
//         </div>

//         {/* Vendor Selection */}
//         <div>
//           <h3 className="text-md font-semibold mb-2">Choose Vendor</h3>
//           <div className="flex gap-4">
//             {vendors.map((vendor) => (
//               <button
//                 key={vendor.id}
//                 onClick={() => setVendorId(vendor.id)}
//                 className={`p-3 rounded-lg border flex items-center space-x-2 ${
//                   vendorId === vendor.id ? 'bg-orange-200' : 'bg-white'
//                 }`}
//               >
//                 {vendor.name.includes('Pizza') ? (
//                   <Pizza />
//                 ) : vendor.name.includes('Meals') ? (
//                   <Utensils />
//                 ) : (
//                   <Salad />
//                 )}
//                 <span>{vendor.name}</span>
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Menu Items */}
//         {menuItems.length > 0 && (
//           <div>
//             <h3 className="text-md font-semibold text-black mb-2">Menu Items</h3>
//             <ul className="space-y-2">
//               {menuItems.map((item) => (
//                 <li key={item.id} className="flex justify-between items-center border-b pb-1">
//                   <label className="flex items-center gap-2">
//                     <input
//                       type="checkbox"
//                       checked={selectedItems.some((i) => i.id === item.id)}
//                       onChange={() => toggleItem(item)}
//                     />
//                     {item.menu_item}
//                   </label>
//                   <span className="text-black font-medium">₹{item.price}</span>
//                   {selectedItems.some((i) => i.id === item.id) && (
//                     <div className="flex items-center space-x-2">
//                       <button
//                         onClick={() => removeItem(item)}
//                         className="text-red-500 hover:text-red-600"
//                       >
//                         -
//                       </button>
//                       <span>{selectedItems.find((i) => i.id === item.id)?.quantity}</span>
//                       <button
//                         onClick={() => toggleItem(item)}
//                         className="text-green-500 hover:text-green-600"
//                       >
//                         +
//                       </button>
//                     </div>
//                   )}
//                 </li>
//               ))}
//             </ul>
//             <button
//               onClick={handleOrder}
//               disabled={!orderDate || selectedItems.length === 0}
//               className="mt-4 w-full bg-black text-white py-2 rounded hover:bg-gray-800"
//             >
//               Place Order
//             </button>
//           </div>
//         )}

//         {/* Order Summary */}
//         {orderSummary && (
//           <div className="mt-4 p-4 bg-orange-50 border rounded">
//             <h3 className="text-md font-bold text-red-600 mb-2">Order Summary</h3>
//             <p><strong>Order No:</strong> #{orderSummary.orderNo}</p>
//             <p><strong>Date:</strong> {orderSummary.date}</p>
//             <ul className="list-disc ml-6 mb-2 text-sm">
//               {orderSummary.items.map((item, i) => (
//                 <li key={i}>
//                   {item.menu_item} x {item.quantity}
//                 </li>
//               ))}
//             </ul>
//             <p className="font-bold text-black">Total: ₹{orderSummary.total.toFixed(2)}</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default DashboardPage;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Utensils, Pizza, Salad } from 'lucide-react';

// const DashboardPage = () => {
//   const employeeId = localStorage.getItem('employeeId');
//   const user = JSON.parse(localStorage.getItem('user'));
//   const name = user?.name;

//   const [employeeName, setEmployeeName] = useState('');
//   const [vendors, setVendors] = useState([]);
//   const [vendorId, setVendorId] = useState('');
//   const [mealType, setMealType] = useState('');
//   const [menuItems, setMenuItems] = useState([]);
//   const [selectedItems, setSelectedItems] = useState([]);
//   const [orderSummary, setOrderSummary] = useState(null);
//   const [orderDate, setOrderDate] = useState('');

//   useEffect(() => {
//     if (employeeId) {
//       axios
//         .get(`http://localhost:5000/api/employees/${employeeId}`)
//         .then((res) => setEmployeeName(res.data.name))
//         .catch((err) => console.error('Error fetching name', err));
//     }
//   }, [employeeId]);

//   useEffect(() => {
//     axios
//       .get('http://localhost:5000/api/vendors')
//       .then((res) => setVendors(res.data))
//       .catch((err) => console.error('Error fetching vendors', err));
//   }, []);

//   useEffect(() => {
//     if (vendorId && mealType) {
//       axios
//         .get(`http://localhost:5000/api/menus?vendor_id=${vendorId}&meal_type=${mealType}`)
//         .then((res) => setMenuItems(res.data))
//         .catch((err) => console.error('Error fetching menu', err));
//     } else {
//       setMenuItems([]);
//     }
//   }, [vendorId, mealType]);

//   const toggleItem = (item) => {
//     setSelectedItems((prev) => {
//       const existingItem = prev.find((i) => i.id === item.id);
//       if (existingItem) {
//         return prev.map((i) =>
//           i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
//         );
//       }
//       return [...prev, { ...item, quantity: 1 }];
//     });
//   };

//   const removeItem = (item) => {
//     setSelectedItems((prev) =>
//       prev
//         .map((i) =>
//           i.id === item.id ? { ...i, quantity: i.quantity - 1 } : i
//         )
//         .filter((i) => i.quantity > 0)
//     );
//   };

//   const calculateTotal = () =>
//     selectedItems.reduce((acc, item) => acc + parseFloat(item.price) * item.quantity, 0);

//   const handleOrder = () => {
//     const newOrderNo = Math.floor(100000 + Math.random() * 900000);
//     const summary = {
//       orderNo: newOrderNo,
//       date: orderDate,
//       items: selectedItems.map((i) => ({
//         menu_item: i.menu_item,
//         quantity: i.quantity,
//       })),
//       total: calculateTotal(),
//     };
//     setOrderSummary(summary);

//     const token = localStorage.getItem('token');
//     axios
//       .post(
//         'http://localhost:5000/api/orders',
//         {
//           employeeId,
//           orderNo: newOrderNo,
//           date: orderDate,
//           items: summary.items,
//           total: summary.total,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       )
//       .then((response) => {
//         console.log('Order saved successfully:', response.data);
//         //alert('Order placed successfully');
//       })
//       .catch((err) => {
//         console.error('Error saving order:', err);
//         alert('Error placing order');
//       });

//     setSelectedItems([]);
//   };

//   const logout = () => {
//     localStorage.clear();
//     window.location.href = '/login';
//   };

//   const orderHistory = () => {
//     window.location.href = '/orderHistory';
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-orange-50 to-red-100 p-4">
//       <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-6 space-y-6">
//         {/* Header */}
//         <div className="flex justify-between items-center">
//           <h1 className="text-xl font-bold text-black">Welcome, {name || employeeName}</h1>
//           <div className="flex space-x-4">
//             <button
//               onClick={orderHistory}
//               className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
//             >
//               Order History
//             </button>
//             <button
//               onClick={logout}
//               className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
//             >
//               Logout
//             </button>
//           </div>
//         </div>

//         {/* Selection Row */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//           <div>
//             <label className="block mb-1 text-gray-700">Select Meal Type</label>
//             <select
//               value={mealType}
//               onChange={(e) => setMealType(e.target.value)}
//               className="w-full border rounded px-2 py-1"
//             >
//               <option value="">-- Select --</option>
//               <option value="Lunch">Lunch</option>
//               <option value="Dinner">Dinner</option>
//             </select>
//           </div>
//           <div>
//             <label className="block mb-1 text-gray-700">Pick Date</label>
//             <input
//               type="date"
//               value={orderDate}
//               onChange={(e) => setOrderDate(e.target.value)}
//               className="w-full border rounded px-2 py-1"
//             />
//           </div>
//         </div>

//         {/* Vendor Selection */}
//         <div>
//           <h3 className="text-md font-semibold mb-2">Choose Vendor</h3>
//           <div className="flex gap-4">
//             {vendors.map((vendor) => (
//               <button
//                 key={vendor.id}
//                 onClick={() => setVendorId(vendor.id)}
//                 className={`p-3 rounded-lg border flex items-center space-x-2 ${
//                   vendorId === vendor.id ? 'bg-orange-200' : 'bg-white'
//                 }`}
//               >
//                 {vendor.name.includes('Pizza') ? (
//                   <Pizza />
//                 ) : vendor.name.includes('Meals') ? (
//                   <Utensils />
//                 ) : (
//                   <Salad />
//                 )}
//                 <span>{vendor.name}</span>
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Menu Items */}
//         {menuItems.length > 0 && (
//           <div>
//             <h3 className="text-md font-semibold text-black mb-2">Menu Items</h3>
//             <ul className="space-y-2">
//               {menuItems.map((item) => (
//                 <li key={item.id} className="flex justify-between items-center border-b pb-1">
//                   <label className="flex items-center gap-2">
//                     <input
//                       type="checkbox"
//                       checked={selectedItems.some((i) => i.id === item.id)}
//                       onChange={() => toggleItem(item)}
//                     />
//                     {item.menu_item}
//                   </label>
//                   <span className="text-black font-medium">₹{item.price}</span>
//                   {selectedItems.some((i) => i.id === item.id) && (
//                     <div className="flex items-center space-x-2">
//                       <button
//                         onClick={() => removeItem(item)}
//                         className="text-red-500 hover:text-red-600"
//                       >
//                         -
//                       </button>
//                       <span>{selectedItems.find((i) => i.id === item.id)?.quantity}</span>
//                       <button
//                         onClick={() => toggleItem(item)}
//                         className="text-green-500 hover:text-green-600"
//                       >
//                         +
//                       </button>
//                     </div>
//                   )}
//                 </li>
//               ))}
//             </ul>
//             <button
//               onClick={handleOrder}
//               disabled={!orderDate || selectedItems.length === 0}
//               className="mt-4 w-full bg-black text-white py-2 rounded hover:bg-gray-800"
//             >
//               Place Order
//             </button>
//           </div>
//         )}

//         {/* Order Summary */}
//         {orderSummary && (
//           <div className="mt-4 p-4 bg-orange-50 border rounded">
//             <h3 className="text-md font-bold text-red-600 mb-2">Order Summary</h3>
//             <p><strong>Order No:</strong> #{orderSummary.orderNo}</p>
//             <p><strong>Date:</strong> {orderSummary.date}</p>
//             <ul className="list-disc ml-6 mb-2 text-sm">
//               {orderSummary.items.map((item, i) => (
//               <li key={i}>
//                 {item.menu_item} x {item.quantity}
//               </li>
//             ))}
//             </ul>
//             <p className="font-bold text-black">Total: ₹{orderSummary.total.toFixed(2)}</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default DashboardPage;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Utensils, Pizza, Salad } from 'lucide-react';

const DashboardPage = () => {
  const employeeId = localStorage.getItem('employeeId');
  const user = JSON.parse(localStorage.getItem('user'));
  const name = user?.name;

  const [employeeName, setEmployeeName] = useState('');
  const [vendors, setVendors] = useState([]);
  const [vendorId, setVendorId] = useState('');
  const [mealType, setMealType] = useState('');
  const [menuItems, setMenuItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [orderSummary, setOrderSummary] = useState(null);
  const [orderDate, setOrderDate] = useState('');
  const [errors, setErrors] = useState({});
  const [showSummary, setShowSummary] = useState(false);


  useEffect(() => {
    if (employeeId) {
      axios
        .get(`http://localhost:5000/api/employees/${employeeId}`)
        .then((res) => setEmployeeName(res.data.name))
        .catch((err) => console.error('Error fetching name', err));
    }
  }, [employeeId]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/vendors')
      .then((res) => setVendors(res.data))
      .catch((err) => console.error('Error fetching vendors', err));
  }, []);

  useEffect(() => {
    let newErrors = {};
    if (!mealType) {
      newErrors.mealType = 'Please select a meal type';
    }
    if (!orderDate) {
      newErrors.orderDate = 'Please select a date';
    }
    if (!vendorId) {
      newErrors.vendorId = 'Please choose a vendor';
    }
    if (selectedItems.length === 0) {
      newErrors.selectedItems = 'Please select at least one item';
    }
    setErrors(newErrors);
  }, [mealType, orderDate, vendorId, selectedItems]);

  useEffect(() => {
    if (vendorId && mealType) {
      axios
        .get(`http://localhost:5000/api/menus?vendor_id=${vendorId}&meal_type=${mealType}`)
        .then((res) => setMenuItems(res.data))
        .catch((err) => console.error('Error fetching menu', err));
    } else {
      setMenuItems([]);
    }
  }, [vendorId, mealType]);

  const toggleItem = (item) => {
    setSelectedItems((prev) => {
      const existingItem = prev.find((i) => i.id === item.id);
      if (existingItem) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeItem = (item) => {
    setSelectedItems((prev) =>
      prev
        .map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity - 1 } : i
        )
        .filter((i) => i.quantity > 0)
    );
  };

  const calculateTotal = () =>
    selectedItems.reduce((acc, item) => acc + parseFloat(item.price) * item.quantity, 0);

  const handleOrder = () => {
    const newOrderNo = Math.floor(100000 + Math.random() * 900000);
    const summary = {
      orderNo: newOrderNo,
      date: orderDate,
      items: selectedItems.map((i) => ({
        menu_item: i.menu_item,
        quantity: i.quantity,
      })),
      total: calculateTotal(),
    };
    setOrderSummary(summary);
    setShowSummary(true);

setTimeout(() => {
  setShowSummary(false);
}, 10000);

    const token = localStorage.getItem('token');
    axios
      .post(
        'http://localhost:5000/api/orders',
        {
          employeeId,
          orderNo: newOrderNo,
          date: orderDate,
          items: summary.items,
          total: summary.total,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log('Order saved successfully:', response.data);
        //alert('Order placed successfully');
      })
      .catch((err) => {
        console.error('Error saving order:', err);
        alert('Error placing order');
      });

    setSelectedItems([]);
  };

  const logout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  const orderHistory = () => {
    window.location.href = '/orderHistory';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-red-100 p-4">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold text-black">Welcome, {name || employeeName}</h1>
          <div className="flex space-x-4">
            <button
              onClick={orderHistory}
              className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
            >
              Order History
            </button>
            <button
              onClick={logout}
              className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Selection Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 text-gray-700">Select Meal Type</label>
            <select
              value={mealType}
              onChange={(e) => setMealType(e.target.value)}
              className="w-full border rounded px-2 py-1"
            >
              <option value="">-- Select --</option>
              <option value="Lunch">Lunch</option>
              <option value="Dinner">Dinner</option>
            </select>
            {errors.mealType && <p className="text-red-500 text-sm">{errors.mealType}</p>}
          </div>
          <div>
            <label className="block mb-1 text-gray-700">Pick Date</label>
            <input
              type="date"
              value={orderDate}
              onChange={(e) => setOrderDate(e.target.value)}
              className="w-full border rounded px-2 py-1"
            />
            {errors.orderDate && <p className="text-red-500 text-sm">{errors.orderDate}</p>}
          </div>
        </div>

        {/* Vendor Selection */}
<div>
  <h3 className="text-md font-semibold mb-2">Choose Vendor</h3>
  <div className="flex flex-row flex-wrap gap-4">
    {vendors.map((vendor) => (
      <button
        key={vendor.id}
        onClick={() => setVendorId(vendor.id)}
        className={`p-3 rounded-lg border flex items-center space-x-2 whitespace-nowrap ${
          vendorId === vendor.id ? 'bg-orange-200' : 'bg-white'
        }`}
      >
        {vendor.name.includes('Pizza') ? (
          <Pizza />
        ) : vendor.name.includes('Meals') ? (
          <Utensils />
        ) : (
          <Salad />
        )}
        <span>{vendor.name}</span>
      </button>
    ))}
  </div>
  {errors.vendorId && <p className="text-red-500 text-sm">{errors.vendorId}</p>}
</div>

        
        {/* Vendor Selection */}

        {/* <div>
          <h3 className="text-md font-semibold mb-2">Choose Vendor</h3>
          <div className="flex flex-row gap-4">
            {vendors.map((vendor) => (
              <button
                key={vendor.id}
                onClick={() => setVendorId(vendor.id)}
                className={`p-3 rounded-lg border flex items-center space-x-2 ${
                  vendorId === vendor.id ? 'bg-orange-200' : 'bg-white'
                }`}
              >
                {vendor.name.includes('Pizza') ? (
                  <Pizza />
                ) : vendor.name.includes('Meals') ? (
                  <Utensils />
                ) : (
                  <Salad />
                )}
                <span>{vendor.name}</span>
              </button>
            ))}
          </div>
          {errors.vendorId && <p className="text-red-500 text-sm">{errors.vendorId}</p>}
        </div> */}

        {/* Menu Items */}
        {menuItems.length > 0 && (
          <div>
            <h3 className="text-md font-semibold text-black mb-2">Menu Items</h3>
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.id} className="flex justify-between items-center border-b pb-1">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedItems.some((i) => i.id === item.id)}
                      onChange={() => toggleItem(item)}
                    />
                    {item.menu_item}
                  </label>
                  <span className="text-black font-medium">₹{item.price}</span>
                  {selectedItems.some((i) => i.id === item.id) && (
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => removeItem(item)}
                        className="text-red-500 hover:text-red-600"
                      >
                        -
                      </button>
                      <span>{selectedItems.find((i) => i.id === item.id)?.quantity}</span>
                      <button
                        onClick={() => toggleItem(item)}
                        className="text-green-500 hover:text-green-600"
                      >
                        +
                      </button>
                    </div>
                  )}
                </li>
              ))}
            </ul>
            {errors.selectedItems && <p className="text-red-500 text-sm">{errors.selectedItems}</p>}
            <button
              onClick={handleOrder}
              disabled={Object.keys(errors).length > 0}
              className="mt-4 w-full bg-black text-white py-2 rounded hover:bg-gray-800"
            >
              Place Order
            </button>
          </div>
        )}

        {/* Order Summary */}
        {/* {orderSummary && (
          <div className="mt-4 p-4 bg-green-500 border rounded">
            <h3 className="text-md font-bold text-red-600 mb-2">Order Summary</h3>
            <p><strong>Order No:</strong> #{orderSummary.orderNo}</p>
            <p><strong>Date:</strong> {orderSummary.date}</p>
            <ul className="list-disc ml-6 mb-2 text-sm">
              {orderSummary.items.map((item, i) => (
                <li key={i}>
                  {item.menu_item} x {item.quantity}
                </li>
              ))}
            </ul>
            <p className="font-bold text-black">Total: ₹{orderSummary.total.toFixed(2)}</p>
          </div>
        )} */}
        {showSummary && orderSummary && (
  <div className="fixed top-5 right-5 bg-green-100 border border-green-400 text-green-800 p-4 rounded shadow-md z-50 transition-opacity duration-300">
    <h3 className="text-md font-bold mb-2">Order Summary</h3>
    <p><strong>Order No:</strong> #{orderSummary.orderNo}</p>
    <p><strong>Date:</strong> {orderSummary.date}</p>
    <ul className="list-disc ml-6 mb-2 text-sm">
      {orderSummary.items.map((item, i) => (
        <li key={i}>
          {item.menu_item} x {item.quantity}
        </li>
      ))}
    </ul>
    <p className="font-bold">Total: ₹{orderSummary.total.toFixed(2)}</p>
  </div>
)}

      </div>
    </div>
  );
};

export default DashboardPage;