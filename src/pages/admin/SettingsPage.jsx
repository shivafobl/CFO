import React, { useState, useEffect } from "react";
import axios from "axios";

const SettingsPage = () => {
  const [canteenOpen, setCanteenOpen] = useState(true);
  const [cutoffTime, setCutoffTime] = useState("10:00");
  const [supportEmail, setSupportEmail] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    // Fetch current settings from backend
    const fetchSettings = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/admin/settings");
        const settings = res.data;
        setCanteenOpen(settings.canteen_open);
        setCutoffTime(settings.cutoff_time);
        setSupportEmail(settings.support_email);
      } catch (err) {
        console.error("Failed to fetch settings", err);
      }
    };

    fetchSettings();
  }, []);

  const saveSettings = async () => {
    try {
      await axios.put("http://localhost:5000/api/admin/settings", {
        canteen_open: canteenOpen,
        cutoff_time: cutoffTime,
        support_email: supportEmail,
      });
      setStatus("Settings updated successfully");
    } catch (err) {
      console.error("Error updating settings", err);
      setStatus("Failed to update settings");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Admin Settings</h2>

      <div className="mb-4">
        <label className="block mb-1 font-semibold">Canteen Status</label>
        <select
          value={canteenOpen ? "open" : "closed"}
          onChange={(e) => setCanteenOpen(e.target.value === "open")}
          className="w-full p-2 border rounded"
        >
          <option value="open">Open</option>
          <option value="closed">Closed</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-semibold">Order Cut-off Time</label>
        <input
          type="time"
          value={cutoffTime}
          onChange={(e) => setCutoffTime(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-semibold">Support Email</label>
        <input
          type="email"
          value={supportEmail}
          onChange={(e) => setSupportEmail(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      <button
        onClick={saveSettings}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Save Settings
      </button>

      {status && <p className="mt-4 text-green-700">{status}</p>}
    </div>
  );
};

export default SettingsPage;
