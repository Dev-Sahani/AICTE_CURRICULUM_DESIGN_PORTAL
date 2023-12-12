const Push = require("../models/pushModel.js")
const Course = require("../models/courseModel.js")
const Subject = require("../models/subjectModel.js")
const BAD_REQUEST = require('../errors/index.js')

exports.pushChanges = async (req,res, next)=>{
    // req = {
    //     body:{
    //         course:{},
    //         subjects:[{}]
    //     }
    // }

    const subjects = req.body.subjects
    const pushChanges = await Push.create({
        course: req.body.course,
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