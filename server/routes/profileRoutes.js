const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../controller/authController");
const {
  getProfile,
  updateProfile,
  changePassword,
} = require("../controller/userController");
const mfaMiddleware = require("../middleware/mfaMiddleware");

router.get("/get", authMiddleware, mfaMiddleware, getProfile);
router.put("/update", authMiddleware, mfaMiddleware, updateProfile);
router.put("/change-password", authMiddleware, mfaMiddleware, changePassword);

module.exports = router;
