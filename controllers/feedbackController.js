const { StatusCodes } = require("http-status-codes");
const FeedbackQuestions = require("../models/feedbackQuestions");
const FeedbackResponse = require("../models/feedbackResponse");
const mongoose = require("mongoose");

async function getAllQuestions(req, res) {
    // Verifying User,
    // If student => one student = one feedback for each subject
    const result = await FeedbackQuestions.find({});
    res.status(StatusCodes.OK).json({response: result});
}

async function feedbackResponse(req, res) {
    const {courseId, subjectId, by, answers} = req.body;

    // check if valid id's
    if(!mongoose.Types.ObjectId.isValid(courseId) || !mongoose.Types.ObjectId.isValid(subjectId)  || !mongoose.Types.ObjectId.isValid(by) ) 
            return res.status(404).json({ msg: `No valid Ids` });
    
    // Getting isStudent variable from Token,
    const isStudent = true;

    const result = await FeedbackResponse.create({
        courseId, 
        subjectId,
        by,
        isStudent,
        answers,
    });

    res.status(StatusCodes.CREATED).json({message: "Response Successefully received!"})
}


async function getFeedbackAnalysis(req, res) {
    // First Verify user -> either admin or developers
    const {courseId, subjectId} = req.body;
    
    // Student analysis or educator analysis
    const student = true;
    
    const feedbacks = await FeedbackResponse.find({
        courseId,
        subjectId,
        isStudent: student,
    });

    const analysis = [];

    feedbacks.forEach((data) => {
        const n = 7;
        for(let questionNo = 1; questionNo <= n; questionNo++) 
        {
            const answer = data.answers[questionNo-1];
            if(!analysis[questionNo - 1]) 
            {
                if(answer.type === "rate" || answer.type === "true/false")
                {
                    analysis[questionNo - 1] = {
                        value: answer.value,
                        count : 1,
                    }
                } else 
                {
                    analysis[questionNo - 1] = [answer.value];
                }
            } 
            else {
                if(answer.type === "rate" || answer.type === "true/false")
                {
                    const ct = analysis[questionNo - 1].count;
                    analysis[questionNo - 1].value = (analysis[questionNo-1].value*ct + answer.value) / (ct+1)
                    analysis[questionNo - 1].count = ct + 1;
                } else 
                {
                    analysis[questionNo - 1].push(answer.value);
                }
            }
        }
    });

    res.status(StatusCodes.OK).json({analyzedValues: analysis});
}

/* ------------- TO-DO's ------------------
    1) Optimize
    2) Edit questions functionality
    3) Sentimental Analysis API
*/

module.exports = {
    getAllQuestions,
    feedbackResponse,
    getFeedbackAnalysis,
}