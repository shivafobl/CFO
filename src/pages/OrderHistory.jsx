// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// function OrderHistory({ employeeId }) {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchHistory = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         if (!employeeId) {
//           throw new Error('Employee ID is required');
//         }
//         const res = await axios.get(`http://localhost:5000/api/orders/${employeeId}`);
//         setOrders(res.data);
//       } catch (err) {
//         console.error('Error fetching order history:', err);
//         setError('Failed to fetch order history. Please try again later.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (employeeId) {
//       fetchHistory();
//     }
//   }, [employeeId]);

//   if (loading) {
//     return <div className="p-6 text-center">Loading order history...</div>;
//   }

//   if (error) {
//     return <div className="p-6 text-center text-red-500">{error}</div>;
//   }

//   const formatDate = (dateString) => {
//     if (!dateString) return 'N/A';
//     const date = new Date(dateString);
//     return date.toString() === 'Invalid Date' ? 'N/A' : date.toLocaleDateString();
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">Your Order History</h2>

//       {orders.length === 0 ? (
//         <p className="text-gray-500 text-center">No orders found.</p>
//       ) : (
//         <div className="space-y-4">
//           {orders.map((order, index) => (
//             <div key={index} className="bg-white rounded-xl shadow p-4 border border-gray-200">
//               <div className="flex justify-between items-center mb-2">
//                 <div className="font-semibold text-lg">Order No: #{order.order_no}</div>
//                 <div className="text-sm text-gray-600">
//                   Order Placed Date: {formatDate(order.order_time)}
//                 </div>
//               </div>
//               <div className="mb-2">
//                 <span className="font-medium">Total Amount:</span> ₹{order.total_amount}
//               </div>
//               <div className="mb-2">
//                 <span className="font-medium">Order Pickup Date:</span> {formatDate(order.order_date)}
//               </div>
//               <ul className="list-disc ml-5 text-sm text-gray-700">
//                 {order.items.map((item, idx) => (
//                   <li key={idx} className="mb-1">
//                     {item.item} × {item.quantity}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default OrderHistory;
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function OrderHistory({ employeeId }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true);
      setError(null);
      try {
        if (!employeeId) {
          throw new Error('Employee ID is required');
        }
        const res = await axios.get(`http://localhost:5000/api/orders/${employeeId}`);
        setOrders(res.data);
      } catch (err) {
        console.error('Error fetching order history:', err);
        setError('Failed to fetch order history. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (employeeId) {
      fetchHistory();
    }
  }, [employeeId]);

  if (loading) {
    return <div className="p-6 text-center bg-gray-100">Loading order history...</div>;
  }

  if (error) {
    return <div className="p-6 text-center text-red-500 bg-gray-100">{error}</div>;
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toString() === 'Invalid Date' ? 'N/A' : date.toLocaleDateString();
  };

  return (
    <div className="p-6 bg-gray-100">
      <h2 className="text-red-500 text-2xl font-bold mb-4">Your Order History</h2>

      {orders.length === 0 ? (
        <p className="text-gray-500 text-center">No orders found.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order, index) => (
            <div key={index} className="bg-orange-500 text-white rounded-xl shadow p-4 border border-gray-200">
              <div className="flex justify-between items-center mb-2">
                <div className="font-semibold text-lg">Order No: #{order.order_no}</div>
                <div className="text-sm text-gray-600">
                  Order Placed Date: {formatDate(order.order_time)}
                </div>
              </div>
              <div className="mb-2">
                <span className="font-medium">Total Amount:</span> ₹{order.total_amount}
              </div>
              <div className="mb-2">
                <span className="font-medium">Order Pickup Date:</span> {formatDate(order.order_date)}
              </div>
              <ul className="list-disc ml-5 text-sm text-gray-700">
                {order.items.map((item, idx) => (
                  <li key={idx} className="mb-1">
                    {item.item} × {item.quantity}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default OrderHistory;