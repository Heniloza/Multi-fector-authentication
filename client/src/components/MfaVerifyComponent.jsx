import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function MfaVerifyComponent() {
  const [mfaCode, setMfaCode] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8000/api/mfa/verify",
        { mfaCode },
        { withCredentials: true }
      );

      const data = response.data;

      if (data.success) {
        setSuccess("MFA verified and enabled successfully!");
        setError("");
        toast.success("Successfully Loggedin");
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
    <div className="mfa-verify-container">
      <h2>Enter the code from your Authenticator App</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter MFA code"
          value={mfaCode}
          onChange={(e) => setMfaCode(e.target.value)}
          required
        />
        <button type="submit">Verify MFA</button>
      </form>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
    </div>
  );
}

export default MfaVerifyComponent;
