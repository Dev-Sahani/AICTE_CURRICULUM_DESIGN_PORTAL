const express = require("express");
const router = express.Router();
const authController = require('../controllers/authController')

//Auth routes
router.get("/verify-token",authController.verifyByToken)

//Admin routes

router.route("/register-admin").post(authController.registerAdmin)
router.route("/send-otp").post(authController.sendOTP)
router.route("/verify-otp").post(authController.verifyOtp)
router.route("/login-admin").post(authController.login)
router.route("/register-user").post(
    authController.protect,
    authController.restrictTo("administrator"),
    authController.registerDev)
    

//Developer routes 

router.route("/login-developer").post(authController.login)
router.route('/send-otp-faculty').post(authController.sendOTP2)
router.route('/verify-otp-faculty').post(authController.verifyOtp2)

module.exports = router;