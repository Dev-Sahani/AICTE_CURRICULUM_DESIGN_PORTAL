const express = require("express");
const router = express.Router();
const authController = require('../controllers/authController')

router.route("/login").get(authController.login)
router.route("/register").post(authController.register)
router.route("/verify-administrator")
router.route("/verify-faculty")
router.route("/verify-expert")

module.exports = router;