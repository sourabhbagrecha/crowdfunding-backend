const express = require("express");
const router = express.Router();
const authControllers = require("../../controllers/auth");


router.post("/register", authControllers.register);
router.post("/register-panelist", authControllers.registerPanelist);
router.post("/login", authControllers.login);
router.post("/sendotp", authControllers.sendOTP);
router.post("/auth-otp", authControllers.authenticateOTP);

module.exports = router;