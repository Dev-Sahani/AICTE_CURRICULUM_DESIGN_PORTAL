const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  subjectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject",
    required: true,
  },
  by: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  studentData: {
    type: Boolean,
    default: true,
  },
  questionNo: {
    type: Number,
    required: true
  },
  questionType: {
    type: String,
    required: true,
    enum: ["descriptive", "rate", "true/false", "select"]
  },
  value: {
    type: mongoose.Schema.Types.Mixed,
  },
  year: {
    type: Number,
    default: () => new Date().getFullYear()
  }
});

const FeedbackResponse = mongoose.model('Feedback_response', feedbackSchema);

module.exports = FeedbackResponse;
