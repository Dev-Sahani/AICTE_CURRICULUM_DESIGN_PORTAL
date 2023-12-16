const express = require("express");
const pushController = require('../controllers/pushController')

const router = express.Router();

//push by designer

router.post("/", pushController.pushChanges)
router.delete("cancel-push/:pushId", pushController.cancelPush)

module.exports = router;