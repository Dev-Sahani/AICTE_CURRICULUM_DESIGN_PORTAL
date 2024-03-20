const mongoose = require("mongoose")

module.exports.editableTypeWrapper = (obj)=>({
    new:[{
        by:{
            type:mongoose.Types.ObjectId,
            ref:'User'
        },
        value:obj,
        _id:false
    }],
    cur:obj,
    _id:false
})
module.exports.editableArrayWrapper = (arr)=>({
    add:[{
        by:{
            type:mongoose.Types.ObjectId,
            ref:'User'
        },
        // index:Number,
        value:{type:arr[0].cur, _id:false},
        _id:false
    }],
    del:[{
        by:{
            type:mongoose.Types.ObjectId,
            ref:'User'
        },
        index:Number,
        _id:false
    }],
    cur:arr
})

module.exports.courseLevelEnum = ["undergraduate","postgraduate","diploma"]

module.exports.courseProgramEnum = ["Applied Arts and Crafts",
    "Architecture and Town Planning", "Architecture",
    "Town Planning", "Engineering & Technology", 
    "Hotel Management and Catering", "Management",
    "MCA", "Pharmacy"]

module.exports.resourseTypeEnum = ['book','e-book',
    'research-paper','notes','video','image','article','nptel']

module.exports.userRoleEnum = ["administrator","faculty","expert"]

module.exports.userGenderEnum = ["male","female","other"],

module.exports.accessEnum = ["head","edit","view"]