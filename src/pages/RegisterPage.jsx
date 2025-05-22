import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    employee_id: "",
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.status === 201) {
        setMessage("Registration successful! Please log in.");
        setTimeout(() => {
          navigate("/login");
        }, 2000); // Redirect to login after 2 seconds
      } else {
        setError(data.message || "Something went wrong");
      }
    } catch (err) {
      setError("An error occurred during registration.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-black via-red-900 to-orange-700">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-black">Employee Registration</h2>
        
        {message && <p className="text-green-500 text-center mb-4">{message}</p>}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1 font-semibold text-black">Employee ID</label>
            <input
              type="text"
              name="employee_id"
              className="w-full px-4 py-2 border rounded-lg"
              value={formData.employee_id}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-semibold text-black">Name</label>
            <input
              type="text"
              name="name"
              className="w-full px-4 py-2 border rounded-lg"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-semibold text-black">Email ID</label>
            <input
              type="email"
              name="email"
              className="w-full px-4 py-2 border rounded-lg"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-semibold text-black">Phone Number</label>
            <input
              type="tel"
              name="phone"
              className="w-full px-4 py-2 border rounded-lg"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block mb-1 font-semibold text-black">Password</label>
            <input
              type="password"
              name="password"
              className="w-full px-4 py-2 border rounded-lg"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-red-600 text-white font-semibold py-2 rounded-lg hover:bg-red-700 transition"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
