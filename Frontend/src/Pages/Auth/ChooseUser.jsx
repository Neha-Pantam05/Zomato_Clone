import React from "react";
import { Link } from "react-router-dom";


const ChooseUser = () => {

  

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-r from-pink-500 via-red-500 to-orange-400">

      <div className="bg-white p-10 rounded-2xl shadow-xl text-center w-80">

        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Choose User Type
        </h1>

        <p className="text-gray-500 mb-6">
          Please select the type of user
        </p>

        <div className="flex flex-col gap-4">

          <button className="bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition">
            <Link to="/user/register">Normal User</Link>
          </button>

          <button className="bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition">
            <Link to="/foodPartner/register">Food Partner</Link>
          </button>

        </div>

      </div>

    </div>
  );
};

export default ChooseUser;