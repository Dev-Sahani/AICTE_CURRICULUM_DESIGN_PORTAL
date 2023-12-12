const mongoose = require('mongoose')

const subjectSchema = new mongoose.Schema({
    common_id:{
        type:mongoose.SchemaTypes.ObjectId,
        require:[true,"subject's common_id is missing"]
    },
    version:{
        type:Number,
        default:1
    },
    title:{
        type:String,
        require:[true, "Subject's Title is Missing"]
    },
    objectives:[String],
    prerequisites:[String],
    modules:[{
        title:{
            type:String,
            require:[true, "Subject's Title is Missing"]
        },
        topics:[String],
    }],
    referenceMaterial:[mongoose.SchemaTypes.ObjectId],
    outcomes:[String],
    // alternativeCourses:[]
})


//Indexes of database
subjectSchema.index(["common_id","version"],{
    unique:true
})


const Subject = new mongoose.model("Subject", subjectSchema)

module.exports = Subject