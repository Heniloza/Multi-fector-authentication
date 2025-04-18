const USER = require("../models/user");
const bcrypt = require("bcryptjs");

const getProfile = async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Profile Data Fetched",
    user: req.user,
  });
};

const updateProfile = async (req, res) => {
  try {
    const currentUserId = req.user.userId;
    const { username } = req.body;

    const existingUser = await USER.findOne({ username });
    if (existingUser && existingUser._id.toString() !== currentUserId) {
      return res.status(400).json({
        success: false,
        message: "Username already in use",
      });
    }

    const updatedUser = await USER.findByIdAndUpdate(
      currentUserId,
      {
        username,
        email,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "User Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "error in Updating profile",
    });
  }
};

const changePassword = async (req, res) => {
  try {
    const currentUserId = req.user.userId;
    const { currentPassword, newPassword } = req.body;

    const user = await USER.findById(currentUserId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(currentPassword, newPassword);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Incorrect current password",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "error in Updating password",
    });
  }
};
module.exports = { getProfile, updateProfile, changePassword };
