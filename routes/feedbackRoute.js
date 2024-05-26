const express = require("express");
const router = express.Router();

const {
    getAllQuestions,
    postFeedback,
    getFeedbackAnalysis,
} = require("../controllers/feedbackController");


router.route("/form")
    .get(getAllQuestions)
    .post(postFeedback);

router.route("/analysis/:subjectId").get(getFeedbackAnalysis);

module.exports = router;