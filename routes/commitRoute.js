const express = require("express");
const commitController = require("../controllers/commitController.js");
const { protectCourseByRole } = require("../controllers/courseController.js");
const router = express.Router();

router.post(
  "/save/:commonId",
  protectCourseByRole("head"),
  commitController.save
);

router.get("/get-all-commits/:commonId", commitController.getAllCommits);

router.delete(
  "/reset-commit/:commonId/:version",
  protectCourseByRole("head"),
  commitController.resetToCommit
);

module.exports = router;
