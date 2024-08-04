const {
  NOT_FOUND,
  BAD_REQUEST,
  CustomAPIError,
  FORBIDDEN_REQ,
} = require("../errors");
const mongoose = require("mongoose");
const Course = require("../models/courseModel");
const Subject = require("../models/subjectModel");
const User = require("../models/userModel");
const { createSubject } = require("./subjectController");
const { pushNotification } = require("./notificationController");

exports.protectCourseByRole = (role) => {
  let error = false;
  const allowedRoles = ["view", "edit", "head"];
  const roleIndex = allowedRoles.indexOf(role);

  if (!role || !allowedRoles.includes(role)) error = true;
  const errorMessage = new FORBIDDEN_REQ(
    "You don't have access to perform this action!"
  );

  return async (req, res, next) => {
    if (error) return next(errorMessage);

    const { commonId } = req.params;
    const { accessedCourse } = res;

    for (let course of accessedCourse) {
      if (course.id?.toString() === commonId?.toString()) {
        const accessIndex = allowedRoles.indexOf(course.access);
        if (accessIndex === -1 || accessIndex < roleIndex)
          return next(errorMessage);
        else return next();
      }
    }

    next(errorMessage);
  };
};

const findCourse = async ({ commonId, next, select }) => {
  const query = Course.find({ common_id: commonId })
    .sort({ version: -1 })
    .limit(1);

  if (select) query.select(select);
  const data = (await query)[0];

  if (!data) return next(new NOT_FOUND("The doc not found"));

  return data;
};

const createCourse = async (req, res, next) => {
  const { title, level, program } = req.body;
  if (!title || !level || !program)
    return next(new BAD_REQUEST("Please provide the necessary details."));

  const newCourse = {
    title: { new: [], cur: title },
    level: { new: [], cur: level },
    program: { new: [], cur: program },
  };

  const properties1 = [
    "description",
    "message",
    "preface",
    "acknowledgement",
    "rangeOfCredits",
  ];
  const properties2 = ["definitionOfCredits", "codesAndDef", "subjects", ""];

  for (const prop of properties1) {
    newCourse[prop] = {
      new: [],
      cur: "",
    };
  }
  for (const prop of properties2) {
    newCourse[prop] = {
      add: [],
      del: [],
      cur: [],
    };
  }

  newCourse.committee = [];
  newCourse.common_id = new mongoose.mongo.ObjectId("000000000000000000000000");

  const res1 = await Course.create(newCourse);
  if (!res1.common_id) {
    return next(
      new CustomAPIError("Cannot create course. Something went wrong", 500)
    );
  }
  try {
    const res2 = await User.findOneAndUpdate(
      { email: req.user._doc.email},
      {
        $push: {
          courses: {
            id: res1.common_id,
            // title: res1.title,
            // level: res1.level,
            // program: res1.program,
            access: "head",
          },
        },
      },
      { new: true }
    );

    if (res2?.courses?.length <= req?.user?.courses)
      throw new Error("Something went wrong.");
  } catch (err) {
    await Course.deleteOne({ common_id: res1.common_id });
    return next(
      new CustomAPIError(
        "Cannot update user profile. Something went wrong",
        500
      )
    );
  }

  res.status(200).send({ status: "success", data: {} });
};

const findCourseSubjects = async ({ commonId, next }) => {
  const course = await findCourse({
    commonId: commonId,
    next,
    select: "subjects",
  });
  const subjectsIds = course.subjects.cur.map((val) => val.cur.common_id);

  let data = await Subject.aggregate()
    .match({ common_id: { $in: subjectsIds } })
    .group({
      _id: "$common_id",
      maxVer: { $max: "$version" },
      docs: { $push: "$$ROOT" },
    })
    .project({
      doc: {
        $filter: {
          input: "$docs",
          as: "curDoc",
          cond: { $eq: ["$$curDoc.version", "$maxVer"] },
        },
      },
    })
    .unwind("doc");
  return data;
};

exports.findCourse = findCourse;
exports.createCourse = createCourse;
exports.findCourseSubjects = findCourseSubjects;

exports.getAllCoursesUserWise = async (req, res, next) => {
  let { search, program, level, page } = req.query;
  let ids = [];
  const matchObj = {};
  if (req.user?.role !== "administrator") {
    ids = req.user?.courses.map((el) => el.id?._id);
    matchObj.common_id = { $in: ids };
  }

  if (search && search !== "") {
    search = new RegExp(`${search}`);
    matchObj["$or"] = [
      {
        "title.cur": { $regex: search, $options: "i" },
      },
      {
        "description.cur": { $regex: search, $options: "i" },
      },
    ];
  }
  if (program && program !== "") {
    matchObj["program.cur"] = program;
  }
  if (["undergraduate", "postgraduate", "diploma"].includes(level)) {
    matchObj["level.cur"] = level;
  }

  const aggregateQuery = Course.aggregate()
    .match(matchObj)
    .project({
      common_id: 1,
      title: 1,
      version: 1,
      description: 1,
      level: 1,
      program: 1,
    })
    .group({
      _id: "$common_id",
      maxVer: { $max: "$version" },
      docs: { $push: "$$ROOT" },
    })
    .project({
      doc: {
        $filter: {
          input: "$docs",
          as: "curDoc",
          cond: { $eq: ["$$curDoc.version", "$maxVer"] },
        },
      },
    })
    .unwind("doc");
  if (page && Number.isInteger(page * 1)) {
    aggregateQuery.skip((page - 1) * 12).limit(12);
  }

  const data = (await aggregateQuery).map((val) => val.doc);

  res.status(200).send({
    status: "success",
    length: data.length,
    data: data,
  });
};

exports.getCourse = async (req, res, next) => {
  const data = await findCourse({ commonId: req.params.commonId, next });
  res.status(200).send({
    status: "success",
    data,
  });
};

exports.getBasicInfo = async (req, res, next) => {
  const data = await findCourse({
    commonId: req.params.commonId,
    next,
    select: "-version -subjects -categories -semesters",
  });
  // const data = (await Course.find({common_id:req.params.commonId})
  //     .sort({version:-1})
  //     .limit(1)
  //     .select("-version -subjects -categories -semesters"))

  res.status(200).send({
    status: "success",
    data,
  });
};
exports.getCategory = async (req, res, next) => {
  const data = await findCourse({
    commonId: req.params.commonId,
    next,
    select: "subjects categories common_id",
  });
  // const data = (await Course.find({common_id:req.params.commonId})
  //     .sort({version:-1})
  //     .limit(1)
  //     .select("subjects categories common_id") )[0]

  res.status(200).send({
    status: "success",
    data: {
      categories: data.categories,
      common_id: data.common_id,
    },
  });
};
exports.getSemester = async (req, res, next) => {
  const data = await findCourse({
    commonId: req.params.commonId,
    next,
    select: "subjects semesters common_id",
  });
  // const data = (await Course.find({common_id:req.params.commonId})
  //     .sort({version:-1})
  //     .limit(1)
  //     .select("subjects semesters common_id") )[0]

  res.status(200).send({
    status: "success",
    data: {
      semesters: data.semesters,
      common_id: data.common_id,
    },
  });
};
exports.getSubjects = async (req, res, next) => {
  const data = await findCourseSubjects({ commonId: req.params.commonId });

  // data.forEach((val, index)=>{
  //     const ind = course.subjects.findIndex((subVal)=>subVal.common_id===val.common_id)
  //     for(const key in course.subjects[ind]){
  //         if(["common_id","version","title",""].includes(key))continue;
  //         data[index][key] = course.subjects[ind][key]
  //     }
  // })

  res.status(200).send({
    status: "success",
    length: data.length,
    data,
  });
};

exports.updateByUser = async (req, res, next) => {
  let { data, isnew, del, prop } = req.body;

  if (prop === undefined || !((del === undefined) ^ (data === undefined)))
    return next(new BAD_REQUEST("improper request body"));

  let ind = -1;
  if (prop.indexOf(".") !== -1) {
    [prop, ind] = prop.split(".");
    ind *= 1;
  }
  if (
    ["_id", "id", "version", "common_id", "__v", "dateOfCommit"].includes(prop)
  ) {
    return next(new BAD_REQUEST("No editing allowed on this prop"));
  }

  //find the course By id and update the Course
  const userId = req.user._id;
  const courseCommonId = req.params.commonId;
  const course = await findCourse({
    commonId: courseCommonId,
    next,
  });
  // const course = (await Course.find({common_id:courseCommonId})
  //     .sort({version:-1})
  //     .limit(1))[0]

  if (!course) return next(new BAD_REQUEST("Invalid Course Id"));
  if (!course[prop]) return next(new BAD_REQUEST("Field does not exists"));
  if (del) {
    if (!course[prop].del)
      return next(new BAD_REQUEST("cannot delete from a non array field"));
    if (ind >= course[prop].cur.length || ind < 0)
      return next(new BAD_REQUEST("index range out of bond"));

    await Course.findOneAndUpdate(
      { _id: course._id },
      {
        $push: {
          [`${prop}.del`]: {
            by: userId,
            index: ind,
          },
        },
      }
    );
  } else if (isnew) {
    if (!course[prop].add)
      return next(new BAD_REQUEST("cannot add to a non array field"));

    await Course.findOneAndUpdate(
      { _id: course._id },
      {
        $push: {
          [`${prop}.add`]: {
            by: userId,
            value: data,
          },
        },
      }
    );
  } else {
    if (ind !== -1) {
      if (!course[prop].add)
        return next(
          new BAD_REQUEST(
            `cannot update element at index ${ind} for a non array field`
          )
        );
      if (ind >= course[prop].cur.length)
        return next(new BAD_REQUEST("index range out of bond"));
      await Course.findOneAndUpdate(
        { _id: course._id },
        {
          $push: {
            [`${prop}.cur.${ind}.new`]: {
              by: userId,
              value: data,
            },
          },
        }
      );
    } else {
      await Course.findOneAndUpdate(
        { _id: course._id },
        {
          $push: {
            [`${prop}.new`]: {
              by: userId,
              value: data,
            },
          },
        }
      );
    }
  }
  res.status(200).send({
    status: "success",
  });
};

exports.acceptUpdates = async function (req, res, next) {
  //req.body = {
  //  prop:"prop.ind",
  //  index:
  //  del:
  //  isnew
  // }

  let { index, isnew, del, prop } = req.body;
  if (prop === undefined || index === undefined)
    return next(new BAD_REQUEST("improper request body"));

  let ind = -1;
  if (prop.indexOf(".") !== -1) {
    [prop, ind] = prop.split(".");
    ind *= 1;
  }
  if (
    ["_id", "id", "version", "common_id", "__v", "dateOfCommit"].includes(prop)
  ) {
    return next(new BAD_REQUEST("No editing allowed on this prop"));
  }

  //find the course By id and update the Course
  const courseCommonId = req.params.commonId;
  const course = await findCourse({
    commonId: courseCommonId,
    next,
  });
  // const course = (await Course.find({common_id:courseCommonId})
  //     .sort({version:-1})
  //     .limit(1))[0]

  if (!course) return next(new BAD_REQUEST("Invalid Course Id"));
  if (!course[prop]) return next(new BAD_REQUEST("Field does not exists"));

  let subjectName;
  if (del) {
    if (!course[prop].del)
      return next(new BAD_REQUEST("cannot delete from a non array field"));

    if (index >= course[prop].del.length)
      return next(new BAD_REQUEST("index range out of bond"));

    const delInd = course[prop].del[index].index * 1;

    course[prop].del = course[prop].del.filter(
      (update) => update?.index * 1 !== delInd
    );

    for (let i in course[prop].del) {
      if (course[prop].del[i].index > delInd) {
        course[prop].del[i].index--;
      }
    }
    let common_id = undefined;
    if (prop === "subjects") {
      common_id = course[prop].cur[delInd].cur.common_id;
      subjectName = course[prop].cur[delInd].cur.title;
    }
    course[prop].cur.splice(delInd, 1);

    await Course.findOneAndUpdate(
      { _id: course._id },
      {
        $set: {
          [`${prop}.del`]: course[prop].del,
          [`${prop}.cur`]: course[prop].cur,
        },
      }
    );

    if (common_id !== undefined) {
      await Subject.deleteMany({ common_id: common_id });
    }
  } else if (isnew) {
    if (!course[prop].add)
      return next(new BAD_REQUEST("cannot add to a non array field"));
    if (index >= course[prop].add.length)
      return next(new BAD_REQUEST("index range out of bond"));

    const current = {
      new: [],
      cur: course[prop].add.splice(index, 1)[0].value,
    };

    if (prop === "subjects") {
      try {
        const new_sub = await createSubject({
          ...req.body,
          courseId: courseCommonId,
        });
        current.cur.common_id = new_sub.common_id;
        subjectName = new_sub.title.cur;
      } catch (err) {
        return res.status(500).send({ message: "Cannot create the subject." });
      }
    }

    try {
      await Course.findOneAndUpdate(
        { _id: course._id },
        {
          $set: {
            [`${prop}.add`]: course[prop].add,
          },
          $push: {
            [`${prop}.cur`]: current,
          },
        }
      );
    } catch (err) {
      if (prop === "subjects") {
        await Subject.deleteMany({ common_id: new_sub.common_id });
        return res.status(500).send({ message: "Cannot update the course." });
      }
    }
  } else {
    if (ind !== -1) {
      if (!course[prop].add)
        return next(
          new BAD_REQUEST(
            `cannot update element at index ${ind} for a non array field`
          )
        );
      if (ind >= course[prop].cur.length)
        return next(new BAD_REQUEST("index range out of bond"));

      const valueToRemove = course[prop].cur[ind].new[index];
      const val = JSON.parse(JSON.stringify(valueToRemove.value));
      if (typeof val === "object") {
        for (let i in course[prop].cur[ind].cur) {
          if (val[i] === undefined) {
            val[i] = course[prop].cur[ind].cur[i];
          }
        }

        if (prop === "subjects") {
          subjectName = val.title;
        }
      }

      await Course.findOneAndUpdate(
        { _id: course._id },
        {
          $set: {
            [`${prop}.cur.${ind}.cur`]: val,
          },
          $pull: {
            [`${prop}.cur.${ind}.new`]: valueToRemove,
          },
        }
      );
    } else {
      if (index >= course[prop].new.length)
        return next(new BAD_REQUEST("index range out of bond"));

      course = await Course.findOneAndUpdate(
        { _id: course._id },
        {
          $set: {
            [`${prop}.cur`]: course[prop].new[index].value,
          },
          $pull: {
            [`${prop}.new`]: course[prop].new[index],
          },
        },
        { new: true }
      );
    }
  }

  let message = `${
    del ? "One of the value of " : "The"
  } '${prop}' propery of the course has ${
    del ? "been deleted" : isnew ? "new value" : "been changed"
  }.`;

  if (prop === "subjects") {
    message = `The ${subjectName} subject ${
      isnew
        ? "has been added to the course"
        : del
        ? "has been removed from the coures"
        : "in the course has some changes."
    }`;
  }

  pushNotification({
    heading: `Course ${course.title.cur} has some changes.`,
    message,
    isCourse: true,
    target: course.common_id.toString(),
    link: `${process.env.CLIENT_URL}/curriculum/${course.common_id}`,
  });

  res.status(200).send({
    status: "success",
  });
};
