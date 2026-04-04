import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [videos, setVideos] = useState([]);



  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/foodPartner/${id}`, {
        withCredentials: true,
      })
      .then((response) => {
        setProfile(response.data.foodPartner);
        setVideos(response.data.foodPartner.foodItems);
      });
  }, [id]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-r from-orange-500 via-red-500 to-pink-500 px-4">
      {/* Card */}
      <div className="bg-gray-100 w-full max-w-sm p-6 rounded-2xl shadow-lg">
        {/* Profile Top */}
        <div className="flex items-center gap-4">
          {/* Profile Image */}
          <div className="w-16 h-16 bg-gray-300 rounded-full">
            <img
              className="w-full h-full rounded-full object-cover"
              src={profile?.profileImage || "https://i.pinimg.com/736x/bc/a3/1c/bca31cd691d41b8654be34c86356279b.jpg"}
              alt="Profile"
            />
          </div>

          {/* Info */}
          <div>
            <h2 className="text-lg font-bold text-gray-800">{profile?.name}</h2>
            <p className="text-sm text-gray-500">{profile?.address}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="flex justify-between mt-6 text-center">
          <div>
            <p className="text-sm text-gray-500">Total Meals</p>
            <p className="bg-gray-200 px-3 py-1 rounded mt-1 font-semibold">
              {profile?.totalMeals}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Orders</p>
            <p className="bg-gray-200 px-3 py-1 rounded mt-1 font-semibold">
              {profile?.orders}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Customers Served</p>
            <p className="bg-gray-200 px-3 py-1 rounded mt-1 font-semibold">
              {profile?.customersServed}
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t mt-6 mb-4"></div>

        {/* Video Grid */}
        <section className="grid grid-cols-2 gap-4">
          {videos.map((v) => (
            <div key={v.id} className="w-full h-48 rounded-lg overflow-hidden">
            
              <video
                className="w-full h-48 rounded-lg object-cover"
                src={v.video}
                muted
              ></video>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default Profile;
