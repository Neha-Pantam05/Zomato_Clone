import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const FoodPartnerRegister = () => {
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const name = e.target.name.value;
    const contactName = e.target.contactName.value;
    const phone = e.target.phone.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    const respone = await axios.post("http://localhost:3000/api/auth/foodPartner/register", {
      name,
      contactName,
      phone,
      email,
      password
    },{
      withCredentials: true
    });

    console.log("Food Partner Registered Successfully", respone.data);
    navigate("/foodPartner/login");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-r from-orange-400 via-red-500 to-pink-500 px-4">
      <div className="bg-white w-full max-w-sm p-8 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Food Partner Register
        </h2>
        <form className="mt-6 space-y-4" 
        onSubmit={handleSubmit}>
          <input
            id="name"
            type="text"
            placeholder="Name"
            className="w-full bg-gray-100 p-3 rounded-lg focus:outline-none"
          />

          <input
            id="contactName"
            type="text"
            placeholder="Contact Name"
            className="w-full bg-gray-100 p-3 rounded-lg focus:outline-none"
          />

          <input
            id="phone"
            type="text"
            placeholder="Phone"
            className="w-full bg-gray-100 p-3 rounded-lg focus:outline-none"
          />

          <input
            id="email"
            type="email"
            placeholder="Email"
            className="w-full bg-gray-100 p-3 rounded-lg focus:outline-none"
          />

          <input
            id="password"
            type="password"
            placeholder="Password"
            className="w-full bg-gray-100 p-3 rounded-lg focus:outline-none"
          />

          <button className="w-full bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600"
          type="submit">
            Register
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?
          <span className="text-red-500 ml-1 cursor-pointer">
            <Link to="/foodPartner/login">Login</Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default FoodPartnerRegister;
