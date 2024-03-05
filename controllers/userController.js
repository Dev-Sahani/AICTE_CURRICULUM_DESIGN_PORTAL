const { BAD_REQUEST } = require('../errors/index')
const User = require('../models/userModel')
const factoryController = require('./factoryController')
const filterAPI =require('../utils/filterAPI')

exports.getAllUser = async (req, res, next)=>{
    const {search, areaOfSpecialization} = req.query
    const flt = {}
    if (search) {
        const exp = new RegExp(`${search}`, 'i');
        flt["$or"] = [{"name":{$regex:exp}}, {"email":{ $regex: exp }}]
    }
    const query = User.find(flt)
    const filteredQuery = new filterAPI(query,req.query)
        .sort()
        .select()
        .paging()
    const data = await filteredQuery.query
    res.status(200).send({
        status:"success",
        length:data.length,
        data
    })
}

exports.getUser = factoryController.getOne(User)

exports.postUser = factoryController.postOne(User)

exports.patchUser = async (req, res, next)=>{
    const fieldsToExclude = ["userId","password","role","headIn","editorIn",
        "viewerIn","passwordChangedAt","passwordResetToken","passwordResetTokenExpire","active"]
    if(Object.keys(req.body).some((val)=>fieldsToExclude.includes(val))){
        return next(new BAD_REQUEST("Cannot update some property of user like 'password' or 'userId' through this route"))
    }
    const user = {
        name:req.body.name,
        email:req.body.email,
        gender:req.body.gender,
        dob:req.body.dob
    }
    //FIXME:
    const resp = await User.findByIdAndUpdate(req.params.id,user)

    res.status(200).send(resp)
}

exports.deleteUser = async (req, res, next)=>{
    const id = req.params.id
    const isUserExists = (await User.findById(id).select("userId"))?true:false
    if(!isUserExists){
        return next(new BAD_REQUEST("There is no such user with given Id"))
    }

    const data = await User.findByIdAndUpdate(id, {
        active:false
    })
}

exports.getCourseUser = async (req, res, next)=>{
    const commonId = req.params.commonId
    // console.log("commonId",commonId, new mongoose.SchemaTypes.ObjectId(commonId))
    const users = await User.find({
        "courses.id": { $in:[commonId] } 
    })
    
    res.status(200).send({
        status:"success",
        data:users
    })
}

exports.addCourseUser = async (req, res, next)=>{
    const commonId = req.params.commonId
    const id = req.body._id
    const access = req.body.access

    if(!id)return next(new BAD_REQUEST("Please provide the userId"))
    if(!["head","edit","view"].includes(access)){
        return next(new BAD_REQUEST("request body must have access with value 'head','editor','view'"))
    }
    const exists = await User.findOne({
        _id:id,
        "courses.id":commonId
    })
    let result;
    if(exists){
        result = await User.updateOne(
            { _id: id, 'courses.id': commonId },
            { $set: { 'courses.$.access': access } },
            { new: true }
        )
    }else{
        result = await User.findByIdAndUpdate(id,{
            "$push":{
                "courses":{
                    "id":commonId,
                    "access":access
                }
            }
        },{
            new:true
        })
    }
    res.status(200).send({
        status:"success",
        data:result
    })
}

exports.deleteCourseUser = async (req,res, next)=>{
    const commonId = req.params.commonId
    const id = req.body._id

    const result = await User.updateOne(
        { _id: id },
        { $pull: { courses: { id: commonId } } }
    )
    res.status(200).send({
        status:"success",
        data:result
    })
}