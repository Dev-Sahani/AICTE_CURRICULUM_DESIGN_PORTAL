const Course = require('../models/courseModel');
const Subject = require('../models/subjectModel');

exports.getAllCourses = async (req,res,next)=>{
    let {search, program, level, page} = req.query
    const matchObj = {}

    if(search && search!==""){
        search = new RegExp(`${search}`)
        matchObj["$or"]=[
            {
                "title":{$regex:search,$options:"i"}
            },
            {
                "description":{$regex:search,$options:"i"}
            }
        ]
    }
    if(program && program!==""){
        matchObj["program"] = program
    }
    if(["undergraduate", "postgraduate", "diploma"].includes(level)){
        matchObj.level = level
    }
    
    const aggregateQuery = Course.aggregate()
        .match(matchObj)
        .project({
            common_id:1,
            title:1,
            version:1,
            description:1,
            level:1,
            program:1
        })
        .group({ 
            _id: "$common_id",
            maxVer: { $max: "$version" },
            docs: { $push: "$$ROOT" } 
        })
        .project({
            doc: { 
                $filter: { 
                    input: "$docs",
                    as: "curDoc",
                    cond: { $eq: ["$$curDoc.version", "$maxVer"] }
                }
            }
        })
        .unwind("doc")
    if(page && Number.isInteger(page*1)){
        aggregateQuery.skip((page-1)*12).limit(12)
    }
        

    const data = (await aggregateQuery).map(val=>val.doc)
    
    res.status(200).send({
        status:"success",
        length:data.length,
        data:data
    })
}

exports.getCourse = async (req, res)=>{
    const data = (await Course.find({common_id:req.params.commonId})
        .sort({version:-1})
        .limit(1) )[0]
    res.status(200).send({
        status:"success",
        data
    })
}

exports.getBasicInfo = async(req, res, next)=>{
    const data = (await Course.find({common_id:req.params.commonId})
        .sort({version:-1})
        .limit(1)
        .select("-version -subjects -categories -semesters"))

    res.status(200).send({
        status:"success",
        data
    })
}
exports.getCategory = async(req, res, next)=>{
    const data = (await Course.find({common_id:req.params.commonId})
        .sort({version:-1})
        .limit(1)
        .select("subjects categories common_id") )[0]
    
    res.status(200).send({
        status:"success",
        data:{
            categories:data.categories,
            common_id:data.common_id
        }
    })
}
exports.getSemester = async(req, res, next)=>{
    const data = (await Course.find({common_id:req.params.commonId})
        .sort({version:-1})
        .limit(1)
        .select("subjects semesters common_id") )[0]
    
    res.status(200).send({
        status:"success",
        data:{
            semesters:data.semesters,
            common_id:data.common_id
        }
    })
}
exports.getSubjects = async(req, res, next)=>{
    const subjectsIds = (await Course.find({common_id:req.params.commonId})
        .sort({version:-1})
        .limit(1)
        .select("subjects"))[0].subjects.map((val)=>val.common_id)
    
    const data = await Subject.find({common_id:{$in:subjectsIds}})
    res.status(200).send({
        status:"success",
        length:data.length,
        data
    })
}