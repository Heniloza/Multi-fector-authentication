const qrcode = require("qrcode");
const speakeasy = require("speakeasy");
const USER = require("../models/user.js");

//Generating MFA
const generateMfa = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in generatign MFA scanner",
    });
  }
};
//Verifying MFA
const verifyMfa = async (req, res) => {
  try {
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
    verifyMfa
}
