const Push = require("../models/pushModel.js")
const Course = require("../models/courseModel.js")
const Subject = require("../models/subjectModel.js")
const {BAD_REQUEST} = require('../errors/index.js')

exports.pushChanges = async (req,res, next)=>{
    // req = {
    //     body:{
    //         course:{},
    //         subjects:[{}]
    //     }
    // }
    const course = req.body.course
    const subjects = req.body.subjects
    if(!course.common_id)
        return next(new BAD_REQUEST("common_id or version is missing in course"))
    for(let i=0;subjects && i<subjects.length; i++){
        if(!subjects[i].common_id){
            return next(new BAD_REQUEST("common_id or version is missing in subject"))
        }
    }
    const pushChanges = await Push.create({
        course,
        subjects
        // by: req.user.id
    })
    //notify about a push request
        //send pushChanges.id in notification
    
    //send response
    res.status(200).json({
        status:"success",
        data:pushChanges
    })
}

exports.cancelPush = async(req,res, next)=>{
    const pushId = req.params.pushId
    //delete push from notifications/chats

    //delete push from push schema
    await Push.deleteOne({_id:pushId})

    res.status(201).json({
        status:"success"
    })
}