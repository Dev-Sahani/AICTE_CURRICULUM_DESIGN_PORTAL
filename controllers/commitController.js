const Course = require('../models/courseModel')
const Subject = require('../models/subjectModel')
const Push = require('../models/pushModel')
const mongoose = require('mongoose')
const {BAD_REQUEST} = require('../errors/index')

exports.postCommit = async (req, res, next)=>{
    const pushId = req.params.pushId

    const pushedChanges = await Push.findOne({_id:pushId})
    if(!pushedChanges){
        return next(new BAD_REQUEST("Invalid pushId"))
    }

    const courseChanges = pushedChanges.course
    const courses = await Course.find({common_id:courseChanges.common_id})
        .sort({version:-1})
        .limit(1)
        .select({_id:0,__v:0})
    const course = courses?courses[0]:{}

    const subjectChanges = pushedChanges.subjects
    const subjectsIds = courseChanges.subjects?courseChanges.subjects.map((val)=>{
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
        if(field==='subjects')continue;
        if(field==="commite")continue;
        
        course[field] = courseChanges[field]
    }
    course.version ++
    course.dateOfCommit = Date.now()

    console.log("commitController/subjects",subjects)
    console.log("commitController/course.subjects",course.subjects)
    console.log("commitController/courseChanges.subjects",courseChanges.subjects)
    console.log("commitController/subjectsChange",subjectChanges)

    for(let i=0; i<subjects.length; i++){
        delete subjects[i]._id;
        delete subjects[i].__v;

        const courseSubInd = course.subjects.findIndex((val)=>val.common_id===subjects[i].common_id)
        const courseChangeSubInd = courseChanges.subjects.findIndex((val)=>val.common_id===subjects[i].common_id)
        const subChangeInd = (subjectChanges && subjectChanges.length>0)?
            subjectChanges.findIndex((val)=>val.common_id===subjects[i].common_id)
            :-1
        if(subChangeInd === -1){
            course.subjects.push({
                ...courseChanges.subjects[courseChangeSubInd],
                version:1
            })
            //remove ith element from subjects
            subjects.splice(i,1)
            i--;
            continue;
        }
        
        for(const key in courseChanges.subjects[courseChangeSubInd]){
            course.subjects[courseSubInd][key] = courseChanges.subjects[courseChangeSubInd][key]
        }
        course.subjects[courseSubInd].version ++
        subjects[i].version ++
        

        for(const field in subjectChanges[subChangeInd]){
            if(field === "version" || field==="common_id")continue;
            subjects[i][field] = subjectChanges[subChangeInd][field]
        }
    }

    console.log("commitController/subjects",subjects)
    console.log("commitController/course.subjects",course.subjects)
    
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
      
          // If all operations are successful, commit the transaction
            await session.commitTransaction();
            session.endSession();
        } catch (error) {
          // If any operation fails, abort the transaction
        //   console.log("\ncontroller/commitController/postCommit/catch\n")
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