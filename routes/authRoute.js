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

router.route('/send-otp-faculty').post(authController.sendOTP2)
router.route('/verify-otp-faculty').post(authController.verifyOtp2)
router.route('/register-faculty').post(authController.registerFaculty)
router.route('/login-faculty')
    .post(authController.loginFaculty)


module.exports = router;