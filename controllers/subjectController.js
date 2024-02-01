const { UNAUTHORIZED_USER } = require('../errors')
const Subject = require('../models/subjectModel')
const User = require('../models/userModel')

exports.getSubjectById = async (req, res)=>{
    const data = (await Subject.find({common_id:req.params.commonId})
        .sort({version:-1})
        .limit(1) )[0]
    res.status(200).send({
        status:"success",
        data
    })
}

exports.getSubjectForUser = async (req, res, next)=>{
    let user = req.user
    if(!user ){
        user = await User.findById(req.body.user._id)
    }if(!user || !user.areaOfSpecialization){
        return next(new UNAUTHORIZED_USER("cann't resolve user or areaOfSpecialization at backend"))
    }

    const regExAr = user.areaOfSpecialization.map(term => new RegExp(`.*${term}.*`, 'i'))
    console.log(regExAr)
    const data =await Subject.find({title:{$in:regExAr}})

    res.status(200).send({
        status:'success',
        length:data.length,
        data
    })
}

exports.getAllSubjects = async function (req,res, next){
    let {search, page} = req.query
    const matchObj = {}

    if(search && search!==""){
        search = new RegExp(`${search}`)
        matchObj["$or"]=[
            {
                "title":{$regex:search,$options:"i"}
            },
            // {
            //     "modules.title":{$regex:search,$options:"i"}
            // }
        ]
    }
    
    const aggregateQuery = Subject.aggregate()
        .match(matchObj)
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