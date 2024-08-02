const { UNAUTHORIZED_USER, BAD_REQUEST, FORBIDDEN_REQ } = require("../errors");
const Subject = require("../models/subjectModel");
const Resource = require("../models/resourceModel");
const User = require("../models/userModel");
const Course = require("../models/courseModel");
const { pushNotification } = require("./notificationController");
const { toSuperScript } = require("../utils/typeConversion");

exports.protectByRole = (role) => {
  let error = false;
  const allowedRoles = ["view", "edit", "head"];
  if (!allowedRoles.includes(role)) error = error || true;

  const roleIndex = allowedRoles.indexOf(role);
  const errorMessage = new FORBIDDEN_REQ(
    "You don't have access for this action"
  );

  return async (req, res, next) => {
    if (error) return next(errorMessage);

    const { commonId } = req.params;

    const { courseId } = await Subject.findOne({ common_id: commonId }).select(
      "courseId"
    );

    for (const course of res.accessedCourse) {
      if (course.id?.toString() === courseId?.toString()) {
        const accessIndex = allowedRoles.indexOf(course.access);
        if (accessIndex === -1 || accessIndex < roleIndex)
          return next(errorMessage);
        else return next();
      }
    }

    next(errorMessage);
  };
};

async function findReferenceMaterials({ commonId }) {
  const data = (
    await Subject.find({ common_id: commonId })
      .sort({ version: -1 })
      .limit(1)
      .select("referenceMaterial")
  )[0];
  const ids = data?.referenceMaterial?.cur?.map((el) => el.cur);
  const addIds = data?.referenceMaterial?.add.map((el) => el.value);
  const delIndex = data?.referenceMaterial?.del.map((el) => el.index);

  const referenceMaterial = await Resource.find({ _id: { $in: ids } }).select(
    "-description"
  );
  const addReferenceMaterial = await Resource.find({
    _id: { $in: addIds },
  }).select("-description");

  return { referenceMaterial, addReferenceMaterial, delIndex };
}

exports.findReferenceMaterials = findReferenceMaterials;

exports.getSubjectById = async (req, res) => {
  const data = (
    await Subject.find({ common_id: req.params.commonId })
      .sort({ version: -1 })
      .limit(1)
  )[0];
  res.status(200).send({
    status: "success",
    data,
  });
};

const createSubject = async (data) => {
  [
    "common_id",
    "version",
    "title",
    "objectives",
    "prerequisites",
    "modules",
    "experiments",
    "referenceMaterial",
    "outcomes",
  ];

  if (!data || !data.title) throw new Error("Please Provide the title.");

  if (!data.courseId)
    throw new Error(
      "Please provide the course-id to which subject belong before adding the subject to this course."
    );
  const course = await Course.findOne({ common_id: data.courseId });
  if (!course)
    throw new Error(
      "Please provide the course-id to which subject belong before adding the subject to this course."
    );

  const sub = {};
  sub.title = {
    new: [],
    cur: data.title,
  };
  sub.courseId = data.courseId;

  for (let field of [
    "objectives",
    "prerequisites",
    "modules",
    "experiments",
    "referenceMaterial",
    "outcomes",
  ]) {
    let cur = [];
    if (data[field]) {
      cur = data[field].map((el) => ({
        new: [],
        cur: el,
      }));
    }

    sub[field] = {
      add: [],
      del: [],
      cur,
    };
  }
  // Error: if res1 is success and res got error => subject will be created with null as common_id
  const res1 = await Subject.create(sub);
  const sub2 = res1._doc;
  sub2.common_id = sub2._id.toString();
  sub2.version = 1;
  const res = await Subject.findByIdAndUpdate(sub2._id, sub2, { new: true });
  return res;
};
exports.createSubject = createSubject;

exports.postSubject = async (req, res) => {
  [
    "common_id",
    "version",
    "title",
    "objectives",
    "prerequisites",
    "modules",
    "experiments",
    "referenceMaterial",
    "outcomes",
  ];

  const data2 = await createSubject(req.body);

  res.status(200).send({
    status: "success",
    data: data2,
  });
};

exports.getSubjectForUser = async (req, res, next) => {
  let user = req.user;
  if (!user) {
    user = await User.findById(req.body.user._id);
  }
  if (!user || !user.areaOfSpecialization) {
    return next(
      new UNAUTHORIZED_USER(
        "cann't resolve user or areaOfSpecialization at backend"
      )
    );
  }

  const regExAr = user.areaOfSpecialization.map(
    (term) => new RegExp(`.*${term}.*`, "i")
  );

  const data = await Subject.find({ title: { $in: regExAr } });

  res.status(200).send({
    status: "success",
    length: data.length,
    data,
  });
};

exports.getAllSubjects = async function (req, res, next) {
  let { search, page } = req.query;
  const matchObj = {};

  if (search && search !== "") {
    search = new RegExp(`${search}`);
    matchObj["$or"] = [
      {
        title: { $regex: search, $options: "i" },
      },
      // {
      //     "modules.title":{$regex:search,$options:"i"}
      // }
    ];
  }

  const aggregateQuery = Subject.aggregate()
    .match(matchObj)
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

exports.getReferenceMaterial = async function (req, res, next) {
  const commonId = req.params.commonId;

  const data = await findReferenceMaterials({ commonId });

  res.status(200).send({
    status: "success",
    data,
  });
};

exports.updateByUser = async (req, res, next) => {
  let { data, isnew, del, prop } = req.body;
  if (prop === undefined || (del === undefined && data === undefined))
    return next(new BAD_REQUEST("improper request body"));

  let ind = -1;
  if (prop.indexOf(".") != -1) {
    [prop, ind] = prop.split(".");
    ind *= 1;
  }

  if (
    ["_id", "id", "version", "common_id", "__v", "dateOfCommit"].includes(prop)
  ) {
    return next(new BAD_REQUEST("No editing allowed on this prop"));
  }
  // if(prop === "modules"){
  //     return next(new BAD_REQUEST("modules field cannot be update by this route use another route"))
  // }

  //find the course By id and update the Course
  const userId = req.user._id;
  const subCommonId = req.params.commonId;
  const sub = (
    await Subject.find({ common_id: subCommonId })
      .sort({ version: -1 })
      .limit(1)
  )[0];

  if (!sub) return next(new BAD_REQUEST("Invalid sub Id"));
  if (!sub[prop]) return next(new BAD_REQUEST("Field does not exists"));
  if (del) {
    if (!sub[prop].del)
      return next(new BAD_REQUEST("cannot delete from a non array field"));
    if (ind >= sub[prop].cur.length)
      return next(new BAD_REQUEST("index range out of bond"));

    await Subject.findOneAndUpdate(
      { _id: sub._id },
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
    if (!sub[prop].add)
      return next(new BAD_REQUEST("cannot add to a non array field"));

    if (
      prop === "referenceMaterial" &&
      sub[prop]?.add?.find((r) => r.value === data) !== undefined
    )
      return res.status(200);

    await Subject.findOneAndUpdate(
      { _id: sub._id },
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
    if (ind != -1) {
      if (!sub[prop].add)
        return next(
          new BAD_REQUEST(
            `cannot update element at index ${ind} for a non array field`
          )
        );
      if (ind >= sub[prop].cur.length)
        return next(new BAD_REQUEST("index range out of bond"));

      await Subject.findOneAndUpdate(
        { _id: sub._id },
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
      await Subject.findOneAndUpdate(
        { _id: sub._id },
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
  if (prop == undefined || index == undefined)
    return next(new BAD_REQUEST("improper request body"));

  let ind = -1;
  if (prop.indexOf(".") != -1) {
    [prop, ind] = prop.split(".");
    ind *= 1;
  }
  if (
    ["_id", "id", "version", "common_id", "__v", "dateOfCommit"].includes(prop)
  ) {
    return next(new BAD_REQUEST("No editing allowed on this prop"));
  }
  if (prop === "modules") {
    return next(
      new BAD_REQUEST(
        "modules field cannot be update by this route use another route"
      )
    );
  }

  //find the subject By id and update the subject
  const subCommonId = req.params.commonId;
  const sub = (
    await Subject.find({ common_id: subCommonId })
      .sort({ version: -1 })
      .limit(1)
  )[0];

  if (!sub) return next(new BAD_REQUEST("Invalid sub Id"));
  if (!sub[prop]) return next(new BAD_REQUEST("Field does not exists"));

  if (del) {
    if (!sub[prop].del)
      return next(new BAD_REQUEST("cannot delete from a non array field"));
    if (index >= sub[prop].del.length)
      return next(new BAD_REQUEST("index range out of bond"));

    const delInd = sub[prop].del[index].index * 1;
    sub[prop].del = sub[prop].del.filter(({ index, by }) => index !== delInd);

    for (let i in sub[prop].del) {
      if (sub[prop].del[i].index > delInd) {
        sub[prop].del[i].index--;
      }
    }

    sub[prop].cur.splice(delInd, 1);

    await Subject.findOneAndUpdate(
      { _id: sub._id },
      {
        $set: {
          [`${prop}.del`]: sub[prop].del,
          [`${prop}.cur`]: sub[prop].cur,
        },
      }
    );
  } else if (isnew) {
    if (!sub[prop].add)
      return next(new BAD_REQUEST("cannot add to a non array field"));
    if (index >= sub[prop].add.length)
      return next(new BAD_REQUEST("index range out of bond"));

    const current = {
      new: [],
      cur: sub[prop].add.splice(index, 1)[0].value,
    };

    await Subject.findOneAndUpdate(
      { _id: sub._id },
      {
        $set: {
          [`${prop}.add`]: sub[prop].add,
        },
        $push: {
          [`${prop}.cur`]: current,
        },
      }
    );
  } else {
    if (ind !== -1) {
      if (!sub[prop].add)
        return next(
          new BAD_REQUEST(
            `cannot update element at index ${ind} for a non array field`
          )
        );
      if (ind >= sub[prop].cur.length)
        return next(new BAD_REQUEST("index range out of bond"));

      const val = sub[prop].cur[ind].new[index].value;
      if (typeof val === "object") {
        for (let i in sub[prop].cur[ind].cur) {
          if (val[i] == undefined) {
            val[i] = sub[prop].cur[ind].cur[i];
          }
        }
      }

      await Subject.findOneAndUpdate(
        { _id: sub._id },
        {
          $set: {
            [`${prop}.cur.${ind}.cur`]: val,
          },
        }
      );
    } else {
      if (index >= sub[prop].new.length)
        return next(new BAD_REQUEST("index range out of bond"));
      await Subject.findOneAndUpdate(
        { _id: sub._id },
        {
          $set: {
            [`${prop}.cur`]: sub[prop].new[index].value,
          },
        }
      );
    }
  }

  const course = await Course.findOne({
    common_id: sub.courseId,
  });

  pushNotification({
    heading: `The ${course.title.cur} course has some changes.`,
    message: `${
      del ? "One of the value of " : "The"
    } '${prop}' propery of the ${sub.title.cur} suject has ${
      del ? "been deleted" : isnew ? "new value" : "been changed"
    }. Click to view changes.`,
    isCourse: true,
    target: sub.courseId.toString(),
    link: `${process.env.CLIENT_URL}/curriculum/${sub.courseId}/subjects/${sub.common_id}`,
  });

  res.status(200).send({
    status: "success",
  });
};

exports.modulesUpdateByUser = async function (req, res, next) {
  let { data, index, isnew, del } = req.body;
  if (
    (isnew === undefined && del === undefined) ||
    (isnew && (!data || !data.topics || !data.title)) ||
    (del && !index)
  )
    return next(new BAD_REQUEST("improper request body"));

  const userId = req.user._id;
  const subCommonId = req.params.commonId;
  const sub = (
    await Subject.find({ common_id: subCommonId })
      .sort({ version: -1 })
      .limit(1)
  )[0];

  if (!sub) return next(new BAD_REQUEST("Invalid sub Id"));

  if (del) {
    if (index === undefined || index >= sub.modules.cur.length)
      return next(new BAD_REQUEST("index range out of bond"));

    await Subject.findOneAndUpdate(
      { _id: sub._id },
      {
        $push: {
          ["modules.del"]: {
            by: userId,
            index: index,
          },
        },
      }
    );
  } else {
    const path =
      index === undefined ? "modules.add" : `modules.cur.${index}.new`;

    data.topics = data.topics?.filter((t) => t !== "" && t !== " ");

    await Subject.findOneAndUpdate(
      { _id: sub._id },
      {
        $push: {
          [path]: {
            by: userId,
            value: data,
          },
        },
      }
    );
  }

  res.status(200).send({
    status: "success",
  });
};

exports.acceptModulesUpdates = async function (req, res, next) {
  let { moduleIndex, changeIndex, isnew, del } = req.body;
  if (
    isnew === undefined &&
    del === undefined &&
    changeIndex === undefined &&
    moduleIndex === undefined
  )
    return next(new BAD_REQUEST("improper request body"));

  //find the subject By id and update the subject
  const subCommonId = req.params.commonId;
  const sub = (
    await Subject.find({ common_id: subCommonId })
      .sort({ version: -1 })
      .limit(1)
  )[0];

  if (!sub) return next(new BAD_REQUEST("Invalid sub Id"));

  let moduleNumber = 0;

  if (del) {
    if (changeIndex === undefined || changeIndex >= sub.modules.del.length)
      return next(new BAD_REQUEST("index range out of bond"));

    const delInd = sub.modules.del[changeIndex].index * 1;
    moduleNumber = delInd;

    sub.modules.del = sub.modules.del.filter(
      ({ index, by }) => index !== delInd
    );

    for (let i in sub.modules.del) {
      if (sub.modules.del[i].index > delInd) {
        sub.modules.del[i].index--;
      }
    }

    sub.modules.cur.splice(delInd, 1);

    await Subject.findOneAndUpdate(
      { _id: sub._id },
      {
        $set: {
          ["modules.del"]: sub.modules.del,
          ["modules.cur"]: sub.modules.cur,
        },
      }
    );
  } else if (isnew) {
    if (changeIndex >= sub.modules.add.length)
      return next(new BAD_REQUEST("index range out of bond"));

    moduleNumber = sub.modules.cur.length;
    const current = {
      new: [],
      cur: sub.modules.add.splice(changeIndex, 1)[0].value,
    };

    await Subject.findOneAndUpdate(
      { _id: sub._id },
      {
        $set: {
          ["modules.add"]: sub.modules.add,
        },
        $push: {
          ["modules.cur"]: current,
        },
      }
    );
  } else {
    if (
      moduleIndex >= sub.modules.cur.length &&
      changeIndex >= sub.modules.cur[moduleIndex].new.length
    )
      return next(new BAD_REQUEST("index range out of bond"));

    moduleNumber = moduleIndex;

    await Subject.findOneAndUpdate(
      { _id: sub._id },
      {
        $set: {
          [`modules.cur.${moduleIndex}.cur`]: sub.modules.cur[
            moduleIndex
          ].new.splice(changeIndex, 1)[0].value,
          [`modules.cur.${moduleIndex}.new`]: sub.modules.cur[moduleIndex].new,
        },
      }
    );
  }

  const course = await Course.findOne({
    common_id: sub.courseId,
  });

  pushNotification({
    heading: `${sub.title.cur} subject of course ${course.title.cur} has some changes.`,
    message: `${toSuperScript(
      moduleNumber + 1
    )} module of the subject has been ${
      del ? "deleted" : isnew ? "added" : "changed"
    }.`,
    isCourse: true,
    target: sub.courseId.toString(),
    link: `${process.env.CLIENT_URL}/curriculum/${sub.courseId}/subjects/${sub.common_id}`,
  });

  res.status(200).send({
    status: "success",
  });
};
