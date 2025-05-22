import React, { useState } from "react";
import axios from "axios";

const EmployeeNotifications = () => {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const sendNotification = async () => {
    if (!message.trim()) {
      setStatus("Message cannot be empty");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/admin/notifications", {
        message,
      });
      setStatus("Notification sent to all employees successfully");
      setMessage("");
    } catch (error) {
      console.error("Error sending notification", error);
      setStatus("Failed to send notification");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Send Notification to Employees</h2>

      <textarea
        rows="4"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="e.g., The canteen will be closed on 15th August."
        className="w-full p-3 border rounded mb-4"
      />

      <button
        onClick={sendNotification}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Send Notification
      </button>

      {status && <p className="mt-4 text-blue-700">{status}</p>}
    </div>
  );
};

export default EmployeeNotifications;
