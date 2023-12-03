const mongoose = require('mongoose')

const subjectSchema = new mongoose.Schema({
    title:{
        type:String,
        require:[true, "Subject's Title is Missing"]
    },
    objective:String,
    prerequisites:[String],
    modules:[mongoose.SchemaTypes.ObjectId],
    // modules:[{
    //     id:mongoose.SchemaTypes.ObjectId,
    //     version:{
    //         type:Number,
    //         default:1
    //     }
    // }],
    referenceMaterial:[mongoose.SchemaTypes.ObjectId],
    outcomes:[String],
    // alternativeCourses:[]
    // version:{
    //     type:Number,
    //     default:1
    // }
})

// subjectSchema.index(["_id","version"],{
//     unique:true
// })

const Subject = new mongoose.Model(subjectSchema)

exports = Subject