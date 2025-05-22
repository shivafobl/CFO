import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
 // Adjust the import path as necessary

// Adjust the import path as necessary
const LoginPage = () => {
  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); // For handling login errors

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", 
        {
        employee_id: employeeId,
        password,
      });

      if (response.status === 200) {
        // Save the JWT token (you can also save it in localStorage or context)
        localStorage.setItem("token", response.data.token);
        localStorage.setItem('employeeId', response.data.employeeId); // 👈 must set this
        localStorage.setItem("user", JSON.stringify(response.data.user));
        console.log(response.data.user);
        // Redirect to the homepage/dashboard
        navigate("/dashboard");
      }
    } catch (err) {
      setError("Invalid Employee ID or Password");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-black via-red-900 to-orange-700">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-black">Employee Login</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block mb-1 font-semibold text-black">Employee ID</label>
            <input
              type="text"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block mb-1 font-semibold text-black">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-orange-600 text-white font-semibold py-2 rounded-lg hover:bg-orange-700 transition"
          >
            Login
          </button>
        </form>
        <p className="text-sm text-blue-600 cursor-pointer mt-2" onClick={() => navigate('/forgot-password')}>
  Forgot Password?
</p>

      </div>
    </div>
  );
};

export default LoginPage;
