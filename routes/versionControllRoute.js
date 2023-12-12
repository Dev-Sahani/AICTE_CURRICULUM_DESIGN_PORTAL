const express = require("express");
const router = express.Router();

//push by designer

router.route("/push")
router.route("cancel-push/:pushId")

//commits and approval by admin

router.route("/commit/:pushId")
router.route("/get-to-prev-commit/:prevVersion")
router.route("/reset-to-prev-commit/:prevVersion")

module.exports = router;