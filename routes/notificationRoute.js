const express = require("express");
const router = express.Router();
const notificationController = require('../controllers/notificationController');

router.route("/")
    .post(notificationController.createNotification)
    .get(notificationController.getAllNotifications);

router.route("/:id")
    .get(notificationController.getNotificationById)
    .delete(notificationController.deleteNotificationById);

module.exports = router;
