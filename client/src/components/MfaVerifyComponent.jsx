import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setMfaVerified } from "../store/authSlice";
import { API_URL } from "../../config";

function MfaVerifyComponent() {
  const [mfaCode, setMfaCode] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        `${API_URL}/api/mfa/verify`,
        { mfaCode },
        { withCredentials: true }
      );

      const data = response.data;

      if (data.success) {
        setSuccess("MFA verified and enabled successfully!");
        setError("");
        toast.success("Successfully Loggedin");
        dispatch(setMfaVerified(true));
        navigate("/");
      } else {
        setError(data.message);
        setSuccess("");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to verify MFA code");
      setSuccess("");
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Enter the code from your Authenticator App
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Enter MFA code"
            value={mfaCode}
            onChange={(e) => setMfaCode(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Verify MFA
          </button>
        </form>

        {error && <p className="text-red-500 font-medium mt-4">{error}</p>}
        {success && (
          <p className="text-green-500 font-medium mt-4">{success}</p>
        )}
      </div>
    </div>
  );
}

export default MfaVerifyComponent;
