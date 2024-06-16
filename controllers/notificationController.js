const { StatusCodes } = require("http-status-codes");
const Notification = require("../models/notificationModel");

exports.getAllNotifications = async function(req, res) {
    try {
        const notifications = await Notification.find({});
        res.status(StatusCodes.OK).json({ data: notifications });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
}

exports.createNotification = async function (req, res) {
    try {
        const { userId, message } = req.body;
        if (!userId || !message) {
            res.status(StatusCodes.BAD_REQUEST).json({ error: 'Incomplete data provided' });
        } else {
            const newNotification = new Notification({ userId, message });
            const savedNotification = await newNotification.save();
            res.status(StatusCodes.CREATED).json({ data: savedNotification });
        }
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
}

exports.deleteNotificationById = async function (req, res) {
    try {
        const notificationId = req.params.id;
        const deletedNotification = await Notification.findByIdAndDelete(notificationId);

        if (!deletedNotification) {
            res.status(StatusCodes.NOT_FOUND).json({ error: 'Notification not found' });
        } else {
            res.status(StatusCodes.NO_CONTENT).send();
        }
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
}
 