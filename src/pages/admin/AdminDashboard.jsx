import React from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const buttons = [
    { label: "Vendor Management", path: "/admin/vendors" },
    { label: "Send Emails to Vendors", path: "/admin/send-emails" },
    { label: "Most Bought Items", path: "/admin/most-bought" },
    { label: "Date-wise Orders History", path: "/admin/orders-history" },
    { label: "Notifications to Employees", path: "/admin/notifications" },
    { label: "Settings", path: "/admin/settings" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Admin Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-xl mx-auto">
        {buttons.map((btn) => (
          <button
            key={btn.label}
            onClick={() => navigate(btn.path)}
            className="bg-orange-600 text-white py-4 rounded-xl shadow hover:bg-orange-700 transition"
          >
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
