import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FoodPartnerLogin = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    // Make API call to login endpoint
    const response = await axios.post("http://localhost:3000/api/auth/foodPartner/login", {
      email: email,
      password: password
    },{
      withCredentials: true
    });
    console.log("Food Partner Logged In Successfully", response.data);
    navigate("/create-food");
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-r from-orange-400 via-red-500 to-pink-500 px-4">

      <div className="bg-white w-full max-w-sm p-8 rounded-2xl shadow-xl">

        <h2 className="text-2xl font-bold text-center text-gray-800">
          Food Partner Login
        </h2>

        <p className="text-center text-gray-500 text-sm mt-2 mb-6">
          Login to manage your restaurant
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            id="email"
            placeholder="Email"
            className="w-full bg-gray-100 p-3 rounded-lg focus:outline-none"
          />

          <input
            type="password"
            id="password"
            placeholder="Password"
            className="w-full bg-gray-100 p-3 rounded-lg focus:outline-none"
          />

          <button className="w-full bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600"
          type="submit">
            Login
          </button>

        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          New partner?
          <span className="text-red-500 ml-1 cursor-pointer">
            <Link to="/foodPartner/register">
              Register
            </Link>
          </span>
        </p>

      </div>

    </div>
  );
};

export default FoodPartnerLogin;
