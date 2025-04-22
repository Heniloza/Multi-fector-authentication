import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../config";

function MfaSetupComponent() {
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMfa = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/mfa/generate`, {
          withCredentials: true,
        });

        const data = response?.data;
        console.log(data);

        if (data.success) {
          setQrCodeUrl(data.qrCodeUrl);
        } else {
          setError(data.message);
        }
      } catch (error) {
        setError("Failed to generate MFA QR Code");
      } finally {
        setLoading(false);
      }
    };

    fetchMfa();
  }, []);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Two-Factor Authentication
        </h2>

        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : error ? (
          <p className="text-red-500 font-medium">{error}</p>
        ) : (
          <>
            <p className="text-gray-600 mb-4">
              Scan the QR code below with your authenticator app:
            </p>
            <div className="flex justify-center mb-4">
              <img
                src={qrCodeUrl}
                alt="MFA QR Code"
                className="rounded-lg border border-gray-300 p-2"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default MfaSetupComponent;
