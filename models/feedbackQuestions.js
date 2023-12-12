const mongoose = require('mongoose');

const feedbackQuestionsSchema = new mongoose.Schema({})

const FeedbackQuestions = mongoose.model('Feedback_questions', feedbackQuestionsSchema);

module.exports = FeedbackQuestions;