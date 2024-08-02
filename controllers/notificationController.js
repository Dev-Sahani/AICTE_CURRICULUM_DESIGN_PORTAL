const Notification = require("../models/notificationModal");
const User = require("../models/userModel");
const { BAD_REQUEST } = require("../errors");
const { getIo } = require("../socket/index");

async function getNotificationByUserId(req, res, next) {
  const result = await Notification.find({
    userIds: req.user._doc._id,
  }).sort({ timestamp: -1 });

  result.forEach((res) => (res.userIds = undefined));

  res.status(200).json({
    data: result,
  });
}

async function pushNotification({
  heading,
  message,
  target,
  isCourse = true,
  link = "",
}) {
  let userIds = [];
  if (isCourse) {
    const users = await User.find({
      "courses.id": { $in: [target] },
    });
    userIds = users.map((user) => user._id);
  } else {
    userIds = [target];
  }

  const newNotification = await Notification.create({
    heading,
    message,
    link,
    userIds,
  });

  const io = getIo();
  await io.to(target).emit("new-notification", {
    ...newNotification._doc,
    userIds: undefined,
  });
}

async function pushNotificationController(req, res, next) {
  const { heading, message, target, isCourse, link } = req.body;
  if (!heading || !message || !target) {
    throw new BAD_REQUEST(
      "Please provide all necessary details like heading, message and target audience."
    );
  }

  await pushNotification({ heading, message, target, isCourse, link });

  res.status(200).json({
    message: "Notification successfully created.",
  });
}

async function deleteNotification(req, res, next) {
  const { notificationId } = req.body;
  if (!notificationId) throw new Error("Please pass notificationId");

  const result = await Notification.findOneAndUpdate(
    { _id: notificationId },
    { $pull: { userIds: req.user?._doc?._id } },
    { new: true, runValidators: true }
  );

  if (result && result.userIds.length === 0) {
    await Notification.deleteOne({ _id: notificationId });
  }

  res.status(200).json({ message: "Notification successfully deleted." });
}

module.exports = {
  getNotificationByUserId,
  pushNotification,
  pushNotificationController,
  deleteNotification,
};
