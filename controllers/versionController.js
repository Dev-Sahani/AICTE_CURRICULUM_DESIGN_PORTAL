const Course = require('../models/courseModel')
const Subject = require('../models/subjectModel')
const Push = require('../models/pushModel')

exports.postCommit = async (req, res, next)=>{
    const pushId = req.params.pushId

    const pushChanges = await Push.findOne({_id:pushId})
    if(!pushChanges){
        return next(new BAD_REQUEST("Invalid pushId"))
    }

    const courseChanges = pushChanges.course
    const subjectChanges = pushChanges.subjects
    const course = await Course.findOne({_id:courseChanges.id}).sort({versionId:-1}).limit(1)
    const subjects = await Subject.findMany({versionId:{$in:courseChanges.subjects}})

    course.versionId = course._id + "" + (course.versionId.split('.')[1]*1+1)
    for(const field in courseChanges){
        if(field==='subjects')continue;
        if(field==="commite")continue;

        course[field] = courseChanges[field]
    }
    course.dateOfCommit = Date.now()

    for(let i=0; i<subjects.length; i++){
        const courseSubInd = course.subjects.findIndex((val)=>val.versionId===subjects[i].versionId)
        const verId = course.subjects[courseSubInd].versionId.split('.')
        course.subjects[courseSubInd].versionId = verId[0] + "" + (verId[1]*1+1)
        
        const subChangeInd = subjectChanges.findIndex((val)=>val.versionId===subjects[i].versionId)
        
        for(const field in subjectChanges[subChangeInd]){
            // if(field === "module")
            subjects[i][field] = subjectChanges[subChangeInd][field]
        }
    }
    const newCourse = await Course.create(course)
    try{
        if(subjects.length != 0)
            await Subject.insertMany(subjects)
    }catch(err){
        await Course.deleteOne({_id:newCourse._id})
        throw err;
    }

    res.status(200).send({
        status:"success"
    })
}

exports.getAllCommits = async (req, res, next)=>{
    // req = {body:{_id:""}}
    const commits = Course.find({_id:req.body._id}).select(datesOfCommits)
    res.status(200).send({
        data:{
            commits
        }
    })
}

exports.getCommit = async (req, res, next)=>{
    // req = {body:{
    //     versionId:"",
    // }}
    const course = await Course.findOne({versionId:req.body.versionId})
    res.status(200).send({
        data:{
            course
        }
    })
}

exports.resetToCommit = async (req, res, next)=>{
    
}