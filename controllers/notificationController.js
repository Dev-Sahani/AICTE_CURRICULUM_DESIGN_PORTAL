const Notification = require("../models/notificationModal");
const User = require("../models/userModel");
const { BAD_REQUEST } = require("../errors");
const { getIo } = require("../socket/index");

async function getNotificationByUserId(req, res, next) {
  // const courseIds = req.user?._doc?.courses.map(course => course.id);
  const result = await Notification.find({
    userIds: req.user?._doc?.userId,
  });

  result.forEach((res) => (res.userIds = undefined));

  res.status(200).json({
    data: result,
  });
}

async function pushNotification(req, res, next) {
  const { heading, message, target, isCourse, link } = req.body;
  if (!heading || !message || !target) {
    throw new BAD_REQUEST(
      "Please provide all necessary details like heading, message and target audience."
    );
  }
  let userIds = [];
  if (isCourse) {
    const users = await User.find({
      "courses.id": { $in: [target] },
    });
    userIds = users.map((user) => user._id || user.userId);
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
  io.to(target).emit("new-notification", {
    ...newNotification,
    userIds: undefined,
  });

  res.status(200).json({
    message: "Notification successfully created.",
  });
}

async function deleteNotification(req, res, next) {
  const { notificationId } = req.body;
  const result = await Notification.findOneAndUpdate(
    { _id: notificationId },
    { $pull: { userIds: req.user?._doc?.userId } },
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
  deleteNotification,
};
