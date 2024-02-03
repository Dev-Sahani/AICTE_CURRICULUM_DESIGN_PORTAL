const Course = require('../models/courseModel')
const { NOT_FOUND} = require('../errors/index')

exports.getAllCommits = async (req, res, next)=>{
    const common_id = req.params.course_common_id
    const commits = await Course.find({common_id:common_id}).select({title:1,version:1,dateOfCommit:1})
    res.status(200).send({
        data:{
            commits
        }
    })
}

exports.getCommit = async (req, res, next)=>{
    const common_id = req.params.course_common_id;
    const ver = req.params.version;
    const course = await Course.findOne({common_id:common_id, version:ver})
    res.status(200).send({
        data:{
            course
        }
    })
}

exports.resetToCommit = async (req, res, next)=>{
    const {course_common_id, version} = req.params

    await Course.deleteMany({common_id:course_common_id, version:{$gt:version}})

    res.status(200).send({
        status:"success"
    })
}

exports.save = async (req, res, next)=>{
    const cId = req.params.course_common_id
    //finding last version

    let lastCourse = (await Course.find({common_id:cId})
    .sort({version:-1})
    .limit(1))[0]
    // console.log(lastCourse)
    lastCourse = lastCourse._doc
    if(!lastCourse){
        return next(new NOT_FOUND("course with common_id not found"))
    }
    lastCourse.version ++;

    //clearing new/del/add fields from data
    for(let field in lastCourse){
        if(lastCourse[field].add !== undefined){
            lastCourse[field].add = undefined
        }
        if(lastCourse[field].del !== undefined){
            lastCourse[field].del = undefined
        }
        if(lastCourse[field].new !== undefined){
            lastCourse[field].new = []
        }
        if(Array.isArray(lastCourse[field].cur)){
            for(let i in lastCourse[field].cur){
                lastCourse[field].cur[i].new = undefined
            }
        }
    }
    delete lastCourse._id
    delete lastCourse.id
    // inserting new version
    await Course.create(lastCourse)

    res.status(200).send({
        status:"success",
        data:lastCourse
    })
}