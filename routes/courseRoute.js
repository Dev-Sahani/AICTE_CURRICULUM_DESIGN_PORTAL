const express = require("express");
const router = express.Router();
const courseController = require('../controllers/courseController')
const authController = require('../controllers/authController')

router.get("/",
    courseController.getAllCourses) // wiht search functionality 
router.route("/:commonId")
    .get(courseController.getCourse)

router.patch("/update-by-user/:commonId",authController.protect, courseController.updateByUser)
router.get("/basic-info/:commonId", authController.protect, courseController.getBasicInfo)
router.get("/categories/:commonId", authController.protect, courseController.getCategory)
router.get("/semesters/:commonId", authController.protect, courseController.getSemester)
router.get("/subjects/:commonId", authController.protect, courseController.getSubjects)
// router.route("/course").get()
// router.route("/:commonId/designers")
//     .get()
//     .post()
//     .patch()
//     .delete()

router.patch("/accept-updates/:commonId", authController.protect, courseController.acceptUpdates)


module.exports = router;