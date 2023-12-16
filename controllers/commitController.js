const Course = require('../models/courseModel')
const Subject = require('../models/subjectModel')
const Push = require('../models/pushModel')
const mongoose = require('mongoose')
const {BAD_REQUEST} = require('../errors/index')

// class mongoTransaction{
//     constructor(){
//         this.session = undefined
//         mongoose.startSession().then(_session=>{
//             this.session = session
//         })
//     }
//     atomic = async function(func){
//         this.session = await mongoose.startSession();
//         session.startTransaction()
//         try {
//             func()
//             await session.commitTransaction();
//             session.endSession();
//         } catch (error) {
      
//             await session.abortTransaction();
//             session.endSession();
//             throw error;
//         }
//     }
// }

exports.postCommit = async (req, res, next)=>{
    const pushId = req.params.pushId

    const pushedChanges = await Push.findOne({_id:pushId})
    if(!pushedChanges)
        return next(new BAD_REQUEST("Invalid pushId"))

    const courseChanges = pushedChanges.course
    const courses = await Course.find({common_id:courseChanges.common_id})
        .sort({version:-1})
        .limit(1)
        .select({_id:0,__v:0})
    const course = courses?courses[0]:{}

    const subjectChanges = pushedChanges.subjects
    const subjectsIds = subjectChanges?subjectChanges.map((val)=>{
        return new mongoose.Types.ObjectId(val.common_id)
    }) : []
    const subAggregate = await Subject.aggregate([
        {
            $match:{common_id:{$in: subjectsIds}}
        },
        { 
            $group: { 
                _id: "$common_id",
                maxVer: { $max: "$version" },
                docs: { $push: "$$ROOT" } 
            }
        },
        { 
            $project: { 
                maxVer: 1,
                doc: { 
                    $filter: { 
                        input: "$docs",
                        as: "curDoc",
                        cond: { $eq: ["$$curDoc.version", "$maxVer"] }
                    }
                }
            }
        }
    ])
    
    const subjects = subAggregate.length!=0?subAggregate[0].doc : []
    for(const field in courseChanges){
        if(field==='subjects'){
            for(let i in courseChanges.subjects){
                const subChange = courseChanges.subjects[i]
                let ind = course.subjects.findIndex(
                    (val)=>val.common_id.toString()===subChange.common_id.toString())
                if(ind === -1){
                    course.subjects.push({})
                    ind = course.subjects.length-1
                }
                for(let key2 in subChange){
                    if(key2==="version" || key2==="common_id")continue;
                    course.subjects[ind][key2] = subChange[key2]
                }
            }
            continue;
        }
        if(field==="commite")continue;
        
        course[field] = courseChanges[field]
    }
    course.version ++
    course.dateOfCommit = Date.now()

    for(const i in subjectChanges){
        const curSub = subjectChanges[i]
        const filter = (val)=>val.common_id.toString()===curSub.common_id.toString()
        const subInd = subjects.findIndex(filter)
        const courseInd = course.subjects.findIndex(filter)
        if(courseInd === -1){
            return next(new BAD_REQUEST("invalid push data - push.subjects"))
        }

        for(const key in curSub){
            if(key==="version")continue;
            subjects[subInd][key] = curSub[key]
        }
        delete subjects[subInd]._id
        subjects[subInd].version ++
        course.subjects[courseInd].version = subjects[subInd].version
    }
    
    async function runAtomicTransaction() {
        const session = await mongoose.startSession();
        session.startTransaction()
      
        try { 
            const newCourse = new Course(course)
            newCourse.isNew = true
            await newCourse.save({session})

            if(subjects.length != 0)
            await Subject.insertMany(subjects,{session})
            
            await Push.deleteOne({_id:pushId},{session})
      
            await session.commitTransaction();
            session.endSession();
        } catch (error) {
      
            await session.abortTransaction();
            session.endSession();
            throw error;
        }
    }
    await runAtomicTransaction()

    res.status(200).send({
        status:"success"
    })
}

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

}