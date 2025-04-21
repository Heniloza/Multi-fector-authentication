import React, { useEffect, useState } from "react";
import MfaSetupComponent from "../components/MfaSetupComponent.jsx";
import MfaVerifyComponent from "../components/MfaVerifyComponent.jsx";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "../store/authSlice/index.js";
import { useNavigate } from "react-router-dom";

function MfaSetup() {
  const { isLoggedIn, isAuthChecked, isMfaVerified } = useSelector(
    (state) => state.auth
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isMfaVerified) {
      navigate("/");
    } else if (!isLoggedIn) {
      navigate("/signin");
    }
  }, [navigate]);
  console.log(isMfaVerified);

  return (
    <div className="min-h-screen w-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Setup Two-Factor Authentication
      </h1>

      <div className="flex flex-col lg:flex-row gap-8 w-full max-w-6xl items-center justify-center">
        <div className="w-full lg:w-1/2">
          <MfaSetupComponent />
        </div>
        <div className="w-full lg:w-1/2">
          <MfaVerifyComponent />
        </div>
      </div>
    </div>
  );
}

export default MfaSetup;
