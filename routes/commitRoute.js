const express = require("express");
const commitController = require("../controllers/commitController.js")
const router = express.Router();

//commits and approval by admin

router.post("/:pushId", commitController.postCommit)
router.get('/get-all-commits/:course_common_id', commitController.getAllCommits)

router.get("/get-prev-commit/:course_common_id/:version")

router.route("/reset-commit/:course_common_id/:version")

module.exports = router;