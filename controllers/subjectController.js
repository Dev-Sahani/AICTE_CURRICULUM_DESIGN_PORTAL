const { UNAUTHORIZED_USER } = require('../errors')
const Subject = require('../models/subjectModel')
const User = require('../models/userModel')
const factoryContorller  = require('./factoryController')

exports.getSubjectById = factoryContorller.getOne(Subject)

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