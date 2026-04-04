import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserRegister = () => {

  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    const response = await axios.post("http://localhost:3000/api/auth/user/register",{
      fullName: name,
      email,
      password
    },{
      withCredentials: true
  })

    console.log("User Registered Successfully", response.data);
    navigate("/user/login");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-r from-pink-500 via-red-500 to-orange-400 px-4">

      <div className="bg-white w-full max-w-sm p-8 rounded-2xl shadow-xl">

        <h2 className="text-3xl font-bold text-center text-gray-800 pb-4">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-2">
          <input
          id="name"
            type="text"
            placeholder="FullName"
            className="w-full bg-gray-100 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
          />

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
            
            Register
          </button>
         
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?
          <span   
          className="text-red-500 font-medium ml-1 cursor-pointer">
            <Link to="/user/login">
            Login
            </Link>
          </span>
        </p>

      </div>

    </div>
  );
};

export default UserRegister;