const express = require("express");
const router = express.Router();
const authController = require('../controllers/authController')

//login
router.get("/verify-token",authController.verifyByToken)
router.route("/login").post(authController.login)
router.post("/logout", authController.logout)

//otp for register
router.route("/send-otp").post(authController.sendOTP)

//register
router.route("/register-admin").post(authController.registerAdmin)
router.route("/register-user").post(
    authController.protect,
    authController.restrictTo("administrator"),
    authController.registerDev)

module.exports = router;