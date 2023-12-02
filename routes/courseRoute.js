const express = require("express");
const router = express.Router();


router.route("/get-all-courses") // wiht search functionality 
router.route("/add-course")
router.route("/delete-course")
router.route("update-course") // ??? 
router.route("/get-developers") // including admins

module.exports = router;