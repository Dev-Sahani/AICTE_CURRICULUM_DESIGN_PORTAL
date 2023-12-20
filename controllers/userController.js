const { BAD_REQUEST } = require('../errors/index')
const User = require('../models/userModel')
const factoryController = require('./factoryController')
const filterAPI =require('../utils/filterAPI')

exports.getAllUser = async (req, res, next)=>{
    const {name, areaOfSpecialization} = req.query
    const flt = {}
    if (name) {
        const exp = new RegExp(`^${name}`, 'i');
        flt.name = { $regex: exp };
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
    const fieldsToExclude = ["userId","password","role","adminIn","editorIn",
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

