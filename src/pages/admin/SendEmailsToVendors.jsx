import React, { useEffect, useState } from "react";
import axios from "axios";

const SendEmailToVendor = () => {
  const [vendors, setVendors] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    // Fetch vendors from backend
    const fetchVendors = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/admin/vendors");
        setVendors(res.data);
      } catch (err) {
        console.error("Error fetching vendors", err);
      }
    };
    fetchVendors();
  }, []);

  const handleSendEmail = async () => {
    if (!selectedVendor || !subject || !message) {
      setStatus("Please fill all fields");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/admin/send-email", {
        vendorId: selectedVendor,
        subject,
        message,
      });
      setStatus("Email sent successfully");
      setSubject("");
      setMessage("");
    } catch (err) {
      console.error("Error sending email", err);
      setStatus("Failed to send email");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Send Email to Vendor</h2>

      <div className="mb-4">
        <label className="block font-semibold mb-1">Select Vendor</label>
        <select
          className="w-full p-2 border rounded"
          value={selectedVendor}
          onChange={(e) => setSelectedVendor(e.target.value)}
        >
          <option value="">-- Select Vendor --</option>
          {vendors.map((vendor) => (
            <option key={vendor.id} value={vendor.id}>
              {vendor.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block font-semibold mb-1">Subject</label>
        <input
          type="text"
          className="w-full p-2 border rounded"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block font-semibold mb-1">Message</label>
        <textarea
          rows="5"
          className="w-full p-2 border rounded"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>

      <button onClick={handleSendEmail} className="bg-blue-600 text-white px-4 py-2 rounded">
        Send Email
      </button>

      {status && <p className="mt-4 text-sm font-semibold">{status}</p>}
    </div>
  );
};

export default SendEmailToVendor;