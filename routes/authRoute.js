const express = require("express");
const router = express.Router();
const authController = require('../controllers/authController')

router.route("/register").post(authController.register)
router.route("/send-otp").post(authController.sendOTP)
router.route("/verify-otp").post(authController.verifyOtp)
router.route("/login-admin").get(authController.loginAdmin)
router.route("/register-user").post(
    authController.protect,
    authController.restrictTo("administrator"),
    authController.registerUser)
    

router.route("/login-developer").post(authController.loginDev)


module.exports = router;