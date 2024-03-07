const express = require("express");
const router = express.Router();
const courseController = require('../controllers/courseController')
const authController = require('../controllers/authController')
const userController = require('../controllers/userController')

router.get("/",
    courseController.getAllCourses) // wiht search functionality 

const onIdRouter = express.Router({mergeParams:true})

router.use("/:commonId",authController.protect, onIdRouter)

onIdRouter
    .get("/",courseController.getCourse)
    .get("/basic-info", courseController.getBasicInfo)
    .get("/categories", courseController.getCategory)
    .get("/semesters", courseController.getSemester)
    .get("/subjects", courseController.getSubjects)
    .patch("/update-by-user/", courseController.updateByUser)
    .patch("/accept-updates/", courseController.acceptUpdates)
    .get("/users", userController.getCourseUser)
    .patch("/users", userController.addCourseUser)
    .delete("/users", userController.deleteCourseUser)

module.exports = router;