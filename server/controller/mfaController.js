const qrcode = require("qrcode");
const speakeasy = require("speakeasy");
const USER = require("../models/user.js");

//Generating MFA
const generateMfa = async (req, res) => {
  try {
    const currentUserId = req.user.userId;

    const secret = speakeasy.generateSecret({
      name: `Multi-fector auth (${req.user.email})`,
    });

    await USER.findByIdAndUpdate(currentUserId, {
      mfaSecret: secret.base32,
    });

    qrcode.toDataURL(secret.otpauth_url, (err, data_url) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: "Failed to generate QR code",
        });
      }

      res.status(200).json({
        success: true,
        message: "MFA QR CODE generated successfully",
        qrCodeUrl: data_url,
        window: 1,
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in generating MFA scanner",
    });
  }
};
//Verifying MFA
const verifyMfa = async (req, res) => {
  try {
    const currentUserId = req.user.userId;
    const { mfaCode } = req.body;

    if (!mfaCode) {
      return res.status(400).json({
        success: false,
        message: "MFA CODE is required",
      });
    }
    const user = await USER.findById(currentUserId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No user found",
      });
    }
    if (!user.mfaSecret) {
      return res.status(404).json({
        success: false,
        message: "No MFA setup found for this user",
      });
    }

    const isVerified = speakeasy.totp.verify({
      secret: user.mfaSecret,
      encoding: "base32",
      token: mfaCode,
    });

    if (!isVerified) {
      return res.status(400).json({
        success: false,
        message: "Invalid MFA code",
      });
    }
    user.mfaEnabled = true;
    await user.save();

    res.status(200).json({
      success: true,
      message: "MFA verified and Enabled Successfully.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in generatign MFA scanner",
    });
  }
};

module.exports = {
  generateMfa,
  verifyMfa,
};
