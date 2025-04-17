const express = require("express");
const { generateMfa, verifyMfa } = require("../controller/mfaController.js");
const { authMiddleware } = require("../controller/authController.js");
const router = express.Router();

router.get("/generate", authMiddleware, generateMfa);
router.post("/verify", authMiddleware, verifyMfa);

module.exports = router;
