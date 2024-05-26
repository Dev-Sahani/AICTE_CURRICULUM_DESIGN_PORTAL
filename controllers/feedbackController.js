const { StatusCodes } = require("http-status-codes");
const FeedbackQuestions = require("../models/feedbackQuestions");
const FeedbackResponse = require("../models/feedbackResponse");
const mongoose = require("mongoose");


async function getAllQuestions(req, res) {
    // Verify user  -----------------------------------
    // One faculty = one feedback per subject ---------

    // const data = FeedbackQuestions.find({$subjectId: {subjectId}});
    const data = await FeedbackQuestions.find({});
    
    res.status(StatusCodes.OK).json({questions: data});
}


async function postFeedback(req, res) {
    const {subjectId, by, answers} = req.body;
    // TO-DO ---------------------------------------------
    // const isStudent = true;

    answers.forEach((ans, index, array) => {
        array[index] = {
          subjectId,
          by,
          questionNo: ans.questionNo,
          questionType: ans.questionType,
          value: ans.value,
        };
    });

    const result = await FeedbackResponse.insertMany(answers);
    
    // console.log(result); 
    res.status(StatusCodes.CREATED).json({message: "Feedback Accepted", dataSent: req.body.answers})
}

async function getFeedbackAnalysis(req, res) {
    // TO-DO -------------------------------
    // Verify User 
    const {subjectId } = req.params;
    
    const data = await FeedbackResponse.aggregate([
        {
            $match: {
                subjectId: {$eq: new mongoose.Types.ObjectId(subjectId)},
                // studentData: {$eq: student}, 
            }
        },
        {
          $project: {
            year: 1,
            questionNo: 1,
            questionType: 1,
            value: 1,
            integersValues: {
              $cond: {
                if: { $in: ["$questionType", ["rate", "true/false"]] },
                then: "$value",
                else: null
              }
            },
            nonIntegersValues: {
              $cond: {
                if: { $in: ["$questionType", ["rate", "true/false"]] },
                then: null,
                else: "$value"
              }
            }
          }
        },
        {
          $group: {
            _id: { year: "$year", questionNo: "$questionNo" , questionType: "$questionType"},
            integersValues: { $avg: "$integersValues" },
            nonIntegersValues: { $push: "$nonIntegersValues" }
          }
        },
        { $project: {
          _id: 0,
          fields: "$_id",
          integersValues: 1,
          nonIntegersValues: {
              $cond: {
                  if: {$eq: ["$integersValues", null]},
                  then: "$nonIntegersValues",
                  else: null,
              }
          }
        }
    }]);
    // console.log(data);

    res.status(StatusCodes.OK).json({data,});
}

/* ------------- TO-DO's ------------------
    1) Optimize
    2) Edit questions functionality
    3) Sentimental Analysis API
*/

module.exports = {
    getAllQuestions,
    postFeedback,
    getFeedbackAnalysis,
}
