import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "../store/authSlice";

function Profile() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md text-center">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">
          Your Details
        </h1>
        <div className="space-y-4 text-left">
          <p className="text-gray-600">
            <span className="font-semibold">Username:</span>{" "}
            {user?.username || "N/A"}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Email:</span> {user?.email || "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
