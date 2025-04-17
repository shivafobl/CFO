import React from "react";

const RegisterPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-black via-red-900 to-orange-700">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-black">Employee Registration</h2>
        <form>
          <div className="mb-4">
            <label className="block mb-1 font-semibold text-black">Employee ID</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-semibold text-black">Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-semibold text-black">Email ID</label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-semibold text-black">Phone Number</label>
            <input
              type="tel"
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block mb-1 font-semibold text-black">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-lg"
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
