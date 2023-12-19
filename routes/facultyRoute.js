const express = require("express");
const router = express.Router();
const facultyController = require('../controllers/facultyController')

router.route("/")
    .post(facultyController.postFaculty)
    .patch(facultyController.patchFaculty)
    .get(facultyController.getFacultyByQuery)

router.get("/:id", facultyController.getFacultyById)
// router.get("get-faculty-in-course/:commonId", ()=>{})
// FIXIT: router.get("get-faculty-of-institue/:instituteName", facultyController.getFacultyByInstituteId)
// router.get("get-faculty-with-specialization/:specialization", facultyController.getFacultyWithSpecialization)


module.exports = router;