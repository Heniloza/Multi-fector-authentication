import React, { useEffect, useState } from "react";
import axios from "axios";

function MfaSetupComponent() {
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMfa = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/mfa/generate",
          {
            withCredentials: true,
          }
        );

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
    <div>
      <h2>Two fector authentication</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <p>Scan the QR code below with your authenticator app:</p>
          <img src={qrCodeUrl} alt="MFA QR Code" />
          <p>
            If you can't scan the code, copy the key:{" "}
            {localStorage.getItem("userEmail")}
          </p>
        </>
      )}
    </div>
  );
}

export default MfaSetupComponent;
