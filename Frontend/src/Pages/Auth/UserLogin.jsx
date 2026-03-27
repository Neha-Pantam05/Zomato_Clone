import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserLogin = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    
    const response = await axios.post(
      "http://localhost:3000/api/auth/user/login",
      {
        email,
        password,
      },
      {
        withCredentials: true,
      },
    );
    console.log("User Logged In Successfully", response.data);
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-r from-pink-500 via-red-500 to-orange-400 px-4">
      <div className="bg-white w-full max-w-sm p-8 rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Welcome Back
        </h2>

        <p className="text-center text-gray-500 text-sm mt-2 mb-6">
          Login to your account
        </p>

        <form className="space-y-4"
        onSubmit={handleSubmit}>
          <input
          id="email"
            type="email"
            placeholder="Email"
            className="w-full bg-gray-100 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
          />

          <input
          id="password"
            type="password"
            placeholder="Password"
            className="w-full bg-gray-100 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
          />

          <button className="w-full bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition"
          type="submit"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Don’t have an account?
          <span className="text-red-500 font-medium ml-1 cursor-pointer">
            <Link to="/user/register">Register</Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default UserLogin;
