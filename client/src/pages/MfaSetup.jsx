import React from "react";
import MfaSetupComponent from "../components/MfaSetupComponent.jsx";
import MfaVerifyComponent from "../components/MfaVerifyComponent.jsx";

function MfaSetup() {
  return (
    <div className="h-screen w-screen flex justify-center items-center gap-16 flex-col">
      <MfaSetupComponent />
      <MfaVerifyComponent />
    </div>
  );
}

export default MfaSetup;
