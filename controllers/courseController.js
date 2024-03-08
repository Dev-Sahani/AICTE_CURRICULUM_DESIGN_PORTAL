const { NOT_FOUND, BAD_REQUEST } = require('../errors');
const Course = require('../models/courseModel');
const Subject = require('../models/subjectModel');

exports.getAllCourses = async (req,res,next)=>{
    let {search, program, level, page} = req.query
    const matchObj = {}

    if(search && search !== ""){
        search = new RegExp(`${search}`)
        matchObj["$or"]=[
            {
                "title.cur":{$regex:search,$options:"i"}
            },
            {
                "description.cur":{$regex:search,$options:"i"}
            }
        ]
    }
    if(program && program !== ""){
        matchObj["program.cur"] = program
    }
    if(["undergraduate", "postgraduate", "diploma"].includes(level)){
        matchObj["level.cur"] = level
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

exports.getCourse = async (req, res, next)=>{
    const data = (await Course.find({common_id:req.params.commonId})
        .sort({version:-1})
        .limit(1) )[0]

    if(!data)return next(new NOT_FOUND("The doc not found"));

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
    const course = (await Course.find({common_id:req.params.commonId})
        .sort({version:-1})
        .limit(1)
        .select("subjects"))[0]
    const subjectsIds = course.subjects.cur.map((val)=>val.cur.common_id)
    
    let data = await (Subject.aggregate()
    .match({common_id:{$in:subjectsIds}}).group({ 
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
    .unwind("doc"))

    // data.forEach((val, index)=>{
    //     const ind = course.subjects.findIndex((subVal)=>subVal.common_id===val.common_id)
    //     for(const key in course.subjects[ind]){
    //         if(["common_id","version","title",""].includes(key))continue;
    //         data[index][key] = course.subjects[ind][key]
    //     }
    // })

    res.status(200).send({
        status:"success",
        length:data.length,
        data
    })
}

exports.updateByUser = async (req, res, next) =>{
    let {data, isnew , del , prop} = req.body

    if(prop === undefined || !((del===undefined) ^ (data===undefined)))return next(new BAD_REQUEST("improper request body"))
    
    let ind = -1
    if(prop.indexOf('.') !== -1){
        [prop,ind] = prop.split('.')
        ind *= 1;
    }
    if(["_id","id","version","common_id","__v","dateOfCommit"].includes(prop)){
        return next(new BAD_REQUEST("No editing allowed on this prop"))
    }

    //find the course By id and update the Course
    const userId = req.user._id
    const courseCommonId = req.params.commonId
    const course = (await Course.find({common_id:courseCommonId})
        .sort({version:-1})
        .limit(1))[0]

    if(!course)return next(new BAD_REQUEST("Invalid Course Id"))
    if(!course[prop])return next(new BAD_REQUEST("Field does not exists"))
    if(del){
        if (!course[prop].del)
            return next(new BAD_REQUEST("cannot delete from a non array field"));
        if(ind >= course[prop].cur.length)
                return next(new BAD_REQUEST("index range out of bond"))

        await Course.findOneAndUpdate({_id:course._id},{
            "$push":{
                [`${prop}.del`]:{
                    by:userId,
                    index:ind
                }
            }
        })
    }else if(isnew){
        if (!course[prop].add)
            return next(new BAD_REQUEST("cannot add to a non array field"));
        
        await Course.findOneAndUpdate({_id:course._id},{
            "$push":{
                [`${prop}.add`]:{
                    by:userId,
                    value:data
                }
            }
        })
    }else{
        if(ind !== -1){
            if (!course[prop].add)
                return next(new BAD_REQUEST(`cannot update element at index ${ind} for a non array field`));
            if(ind >= course[prop].cur.length)
                return next(new BAD_REQUEST("index range out of bond"))
            await Course.findOneAndUpdate({_id:course._id},{
                "$push":{
                    [`${prop}.cur.${ind}.new`]:{
                        by:userId,
                        value:data
                    }
                }
            })
        }
        else{
            await Course.findOneAndUpdate({_id:course._id},{
                "$push":{
                    [`${prop}.new`]:{
                        by:userId,
                        value:data
                    }
                }
            })
        }
    }
    res.status(200).send({
        status:"success"
    })
}

exports.acceptUpdates = async function(req,res,next){
    //req.body = {
    //  prop:"prop.ind",
    //  index:
    //  del:
    //  isnew
    // }

    let {index, isnew , del , prop} = req.body
    if(prop===undefined || index===undefined)return next(new BAD_REQUEST("improper request body"))

    let ind = -1
    if(prop.indexOf('.') !== -1){
        [prop,ind] = prop.split('.')
        ind *= 1;
    }
    if(["_id","id","version","common_id","__v","dateOfCommit"].includes(prop)){
        return next(new BAD_REQUEST("No editing allowed on this prop"))
    }

    //find the course By id and update the Course
    const courseCommonId = req.params.commonId
    const course = (await Course.find({common_id:courseCommonId})
        .sort({version:-1})
        .limit(1))[0]
    
    if(!course)return next(new BAD_REQUEST("Invalid Course Id"))
    if(!course[prop])return next(new BAD_REQUEST("Field does not exists"))
    if(del){
        if (!course[prop].del)
            return next(new BAD_REQUEST("cannot delete from a non array field"));
        if(index >= course[prop].del.length)
            return next(new BAD_REQUEST("index range out of bond"))

        const delInd = (course[prop].del[index].index)*1
        for(let i in course[prop].del){
            if(course[prop].del[i].index > delInd){
                course[prop].del[i].index --;
            }
        }
        course[prop].del.splice(index,1)
        course[prop].cur.splice(delInd, 1)
        await Course.findOneAndUpdate({_id:course._id},{
            "$set":{
                [`${prop}.del`]:course[prop].del,
                [`${prop}.cur`]:course[prop].cur
            }
        })
    }else if(isnew){
        if (!course[prop].add)
            return next(new BAD_REQUEST("cannot add to a non array field"));
        if(index >= course[prop].add.length)
            return next(new BAD_REQUEST("index range out of bond"))
        
        const current = {
            new:[],
            cur:course[prop].add.splice(index, 1)[0].value
        }

        await Course.findOneAndUpdate({_id:course._id},{
            "$set":{
                [`${prop}.add`]:course[prop].add,
            },
            "$push":{
                [`${prop}.cur`]:current
            }
        })
    }else{
        if(ind !== -1){
            if (!course[prop].add)
                return next(new BAD_REQUEST(`cannot update element at index ${ind} for a non array field`));
            if(ind >= course[prop].cur.length)
                return next(new BAD_REQUEST("index range out of bond"))
            
            const val = course[prop].cur[ind].new[index].value
            if(typeof(val) === 'object'){
                for(let i in course[prop].cur[ind].cur){
                    if(val[i]===undefined){
                        val[i]=course[prop].cur[ind].cur[i]
                    }
                }
            }
            
            await Course.findOneAndUpdate({_id:course._id},{
                "$set":{
                    [`${prop}.cur.${ind}.cur`]:val
                }
            })
        }
        else{
            if(index >= course[prop].new.length)
                return next(new BAD_REQUEST("index range out of bond"))
            await Course.findOneAndUpdate({_id:course._id},{
                "$set":{
                    [`${prop}.cur`]:course[prop].new[index].value
                }
            })
        }
    }
    res.status(200).send({
        status:"success"
    })
}