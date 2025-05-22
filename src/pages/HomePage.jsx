import React from "react";
import { useNavigate } from "react-router-dom";
import background from "../images/background.jpg"; // Ensure this path is correct

const HomePage = () => {
const navigate = useNavigate();

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `url(${background})`,
      }}
    >
      <div className="bg-black bg-opacity-60 p-10 rounded-xl shadow-xl text-center">
        <h1 className="text-6xl font-extrabold text-white mb-10" style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
          <span className="text-red-500 drop-shadow-md">C</span>
          <span className="text-white drop-shadow-md">F</span>
          <span className="text-orange-500 drop-shadow-md">O</span>
        </h1>
        <div className="flex justify-center space-x-6">
          <button
            onClick={() => navigate("/login")}
            className="bg-white text-black-600 font-bold px-6 py-2 rounded-full shadow-lg hover:bg-gray-200 transition"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/register")}
            className="bg-white text-black-600 font-bold px-6 py-2 rounded-full shadow-lg hover:bg-gray-200 transition"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
