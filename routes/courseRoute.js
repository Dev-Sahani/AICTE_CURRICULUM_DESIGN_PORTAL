const express = require("express");
const router = express.Router();
const courseController = require('../controllers/courseController')
const authController = require('../controllers/authController')

router.get("/",
    courseController.getAllCourses) // wiht search functionality 
router.get("/:commonId", courseController.getCourse)
router.get("/basic-info/:commonId", courseController.getBasicInfo)
router.get("/categories/:commonId", courseController.getCategory)
router.get("/semesters/:commonId", courseController.getSemester)
router.get("/subjects/:commonId", courseController.getSubjects)
// router.route("/course").get()
// router.route("/:commonId/designers")
//     .get()
//     .post()
//     .patch()
//     .delete()


module.exports = router;