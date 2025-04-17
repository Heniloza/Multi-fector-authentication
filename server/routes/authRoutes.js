const express = require("express");
const {
  signupController,
  signinController,
  logoutController,
  authMiddleware,
} = require("../controller/authController");

const router = express.Router();

router.post("/signup", signupController);
router.post("/signin", signinController);
router.post("/logout", logoutController);
router.get("/checkAuth", authMiddleware, (req, res) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    message: "User is authenticated.",
    user,
  });
});

module.exports = router;
