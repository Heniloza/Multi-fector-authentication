const USER = require("../models/user.js");

const mfaMiddleware = async (req, res, next) => {
  try {
    const user = await USER.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No User Found",
      });
    }

    if (user.mfaEnabled && !req.user.mfaVerified) {
      return res.status(400).json({
        success: false,
        message: "MFA Verification is Required",
      });
    }

    next();
  } catch (error) {
    console.log(ero);
    res.status(500).json({
      success: false,
      message: "Error in Checking MFA Verification",
    });
  }
};

module.exports = mfaMiddleware;
