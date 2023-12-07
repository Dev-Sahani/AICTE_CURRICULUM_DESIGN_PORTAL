const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  },
  subjectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject",
    required: true,
  },
  by: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  isStudent: {
    type: Boolean,
    default: true,
  },
  answers: [
    {
      question_no: Number,
      type: {
        type: String,
      },
      value: {
        type: mongoose.Schema.Types.Mixed,
      },
    },
  ],
});

const FeedbackResponse = mongoose.model('Feedback_response', feedbackSchema);

module.exports = FeedbackResponse;
