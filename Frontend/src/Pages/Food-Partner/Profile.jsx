import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const {profile} = useParams();
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-r from-orange-500 via-red-500 to-pink-500 px-4">
      {/* Card */}
      <div className="bg-gray-100 w-full max-w-sm p-6 rounded-2xl shadow-lg">
        {/* Profile Top */}
        <div className="flex items-center gap-4">
          {/* Profile Image */}
          <div className="w-16 h-16 bg-gray-300 rounded-full"></div>

          {/* Info */}
          <div>
            <h2 className="text-lg font-bold text-gray-800">Business Name</h2>
            <p className="text-sm text-gray-500">Address</p>
          </div>
        </div>

        {/* Stats */}
        <div className="flex justify-between mt-6 text-center">
          <div>
            <p className="text-sm text-gray-500">Total Meals</p>
            <p className="bg-gray-200 px-3 py-1 rounded mt-1 font-semibold">
              43
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Orders</p>
            <p className="bg-gray-200 px-3 py-1 rounded mt-1 font-semibold">
              120
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Customers Served</p>
            <p className="bg-gray-200 px-3 py-1 rounded mt-1 font-semibold">
              15K
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t mt-6 mb-4"></div>

        {/* Video Grid */}
        <div className="grid grid-cols-3 gap-2">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className="bg-gray-300 h-24 rounded flex items-center justify-center text-xs text-gray-600"
            >
              video
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
