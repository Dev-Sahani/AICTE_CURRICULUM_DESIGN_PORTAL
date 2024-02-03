const express = require("express");
const commitController = require("../controllers/commitController.js")
const router = express.Router();

router.post("/save/:course_common_id",commitController.save)

router.get('/get-all-commits/:course_common_id',
    commitController.getAllCommits)

router.delete("/reset-commit/:course_common_id/:version",
    commitController.resetToCommit)

module.exports = router;