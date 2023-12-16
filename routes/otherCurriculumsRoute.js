const express = require("express");
const router = express.Router();
const {getAllCurriculum, addOtherCurriculum, deleteOtherCurriculum} = require('../controllers/otherCurriculumController')

router.route("/get-other-curriculums").get(getAllCurriculum) // with search functionality  
router.route("/add-other-curriculums").post(addOtherCurriculum)
router.route("/delete-other-curriculums") .delete(deleteOtherCurriculum)

module.exports = router;


