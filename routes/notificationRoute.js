const express = require("express");
const router = express.Router();
const {
  getNotificationByUserId,
  pushNotification,
  deleteNotification,
} = require("../controllers/notificationController");
const { protect } = require("../controllers/authController");

router.get("/", protect, getNotificationByUserId);
router.post("/", protect, pushNotification);
router.delete("/", protect, deleteNotification);

module.exports = router;
