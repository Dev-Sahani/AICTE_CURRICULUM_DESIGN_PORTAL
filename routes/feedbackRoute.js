const express = require("express");
const router = express.Router();

const {
    getAllQuestions,
    feedbackResponse,
    getFeedbackAnalysis,
} = require("../controllers/feedbackController");


router.route("/form")
    .get(getAllQuestions)
    .post(feedbackResponse);

router.route("/analysis").get(getFeedbackAnalysis);

module.exports = router;