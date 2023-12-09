const express = require("express");
const router = express.Router();


router.route("/get-other-curriculums").get(getAllCurriculum) // with search functionality  
router.route("/add-other-curriculums").post(addOtherCurriculum)
router.route("/delete-other-curriculums") .delete(deleteOtherCurriculum)

module.exports = router;


