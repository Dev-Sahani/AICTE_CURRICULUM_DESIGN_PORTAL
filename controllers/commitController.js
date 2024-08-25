const Course = require("../models/courseModel");
const { NOT_FOUND } = require("../errors/index");
const { pushNotification } = require("./notificationController");

exports.getAllCommits = async (req, res, next) => {
  const common_id = req.params.commonId;
  const commits = await Course.find({ common_id: common_id }).select({
    title: 1,
    version: 1,
    dateOfCommit: 1,
  });
  res.status(200).send({
    data: {
      commits,
    },
  });
};

exports.getCommit = async (req, res, next) => {
  const common_id = req.params.commonId;
  const ver = req.params.version;
  const course = await Course.findOne({ common_id: common_id, version: ver });
  res.status(200).send({
    data: {
      course,
    },
  });
};

exports.resetToCommit = async (req, res, next) => {
  const { commonId, version } = req.params;

  let lastCourse = (
    await Course.find({ common_id: commonId }).sort({ version: -1 }).limit(1)
  )[0];

  await Course.deleteMany({
    common_id: commonId,
    version: { $gt: version },
  });

  pushNotification({
    heading: `The course ${lastCourse.title.cur} has roll backed to its previous version.`,
    message: `Click to see the new version.`,
    isCourse: true,
    target: commonId,
    link: `${process.env.CLIENT_URL}/curriculum/${commonId}`,
  });

  res.status(200).send({
    status: "success",
  });
};

exports.save = async (req, res, next) => {
  const cId = req.params.commonId;
  //finding last version

  let lastCourse = (
    await Course.find({ common_id: cId }).sort({ version: -1 }).limit(1)
  )[0];
  // console.log(newCourse)

  // lastCourse = lastCourse._doc;
  const newCourse = lastCourse._doc;
  if (!newCourse) {
    return next(new NOT_FOUND("course with common_id not found"));
  }
  newCourse.version++;

  //clearing new/del/add fields from data
  for (let field in newCourse) {
    if (newCourse[field].add !== undefined) {
      newCourse[field].add = undefined;
    }
    if (newCourse[field].del !== undefined) {
      newCourse[field].del = undefined;
    }
    if (newCourse[field].new !== undefined) {
      newCourse[field].new = [];
    }
    if (Array.isArray(newCourse[field].cur)) {
      for (let i in newCourse[field].cur) {
        newCourse[field].cur[i].new = undefined;
      }
    }
  }
  delete newCourse._id;
  delete newCourse.id;
  // inserting new version
  await Course.create(newCourse);

  pushNotification({
    heading: `New version of ${lastCourse.title.cur} is available.`,
    message: `Click to see the new version.`,
    isCourse: true,
    target: lastCourse.common_id.toString(),
    link: `${process.env.CLIENT_URL}/curriculum/${lastCourse.common_id}`,
  });

  res.status(200).send({
    status: "success",
    data: lastCourse,
  });
};
