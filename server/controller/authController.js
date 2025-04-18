const USER = require("../models/user.js");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");

//Registration
const signupController = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const checkUser = await USER.findOne({ username, email });
    if (checkUser) {
      return res.status(409).json({
        success: false,
        message: "User alread exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new USER({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User signup successfully ",
      data: newUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in registation of user",
    });
  }
};
//Login
const signinController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await USER.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User with this email don't exist",
      });
    }
    const isMatch = await bcrypt.compare(password, user?.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid Password",
      });
    }

    if (user.mfaEnabled) {
      const { mfaCode } = req.body;

      const isValid = speakeasy.totp.verify({
        secret: user.mfaSecret,
        encoding: "base32",
        token: mfaCode,
      });

      if (!isValid) {
        return res.status(400).json({ message: "Invalid MFA code" });
      }
    }

    const token = JWT.sign(
      {
        userId: user?._id,
        username: user?.username,
        email: user?.email,
        mfaVerified: user.mfaEnabled ? true : false,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      })
      .status(200)
      .json({
        success: true,
        message: "Sign Up successfully.",
        token,
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in user login",
    });
  }
};
//Logout
const logoutController = async (req, res) => {
  try {
    res.clearCookie("token").status(200).json({
      success: true,
      message: "Logout successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in user logout",
    });
  }
};
const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "You are not authenticated",
      });
    }

    const decode = JWT.verify(token, process.env.JWT_SECRET);

    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in registation of user",
    });
  }
};

module.exports = {
  signinController,
  signupController,
  logoutController,
  authMiddleware,
};
