const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const { generatePDF, generateHTML } = require("../pdfCreation/index");

router.get("/", authController.protect, courseController.getAllCoursesUserWise); // wiht search functionality

router.post("/", authController.protect, courseController.createCourse);

const onIdRouter = express.Router({ mergeParams: true });

router.use("/:commonId", authController.protect, onIdRouter);

onIdRouter
  .get(
    "/",
    authController.protect,
    courseController.protectCourseByRole("view"),
    courseController.getCourse
  )
  .get(
    "/basic-info",
    authController.protect,
    courseController.protectCourseByRole("view"),
    courseController.getBasicInfo
  )
  .get(
    "/categories",
    authController.protect,
    courseController.protectCourseByRole("view"),
    courseController.getCategory
  )
  .get(
    "/semesters",
    authController.protect,
    courseController.protectCourseByRole("view"),
    courseController.getSemester
  )
  .get(
    "/subjects",
    authController.protect,
    courseController.protectCourseByRole("view"),
    courseController.getSubjects
  )
  .patch(
    "/update-by-user/",
    authController.protect,
    courseController.protectCourseByRole("edit"),
    courseController.updateByUser
  )
  .patch(
    "/accept-updates",
    authController.protect,
    courseController.protectCourseByRole("head"),
    courseController.acceptUpdates
  )
  .get("/users", authController.protect, userController.getCourseUser)
  .patch(
    "/users",
    authController.protect,
    courseController.protectCourseByRole("head"),
    userController.addCourseUser
  )
  .delete(
    "/users",
    authController.protect,
    courseController.protectCourseByRole("head"),
    userController.deleteCourseUser
  );

onIdRouter.get("/pdf", authController.protect, async (req, res, next) => {
  const commonId = req.params.commonId;

  await generatePDF(commonId, res, next);
  // res.status(200)
});

onIdRouter.get("/pdf-html", authController.protect, async (req, res, next) => {
  const commonId = req.params.commonId;

  await generateHTML(commonId, res, next);
  res.status(200).type("html").send({
    html,
  });
  // res.setHeader('content-type', )
});

module.exports = router;
