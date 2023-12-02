const mongoose = require('mongoose')

const subjectSchema = new mongoose.Schema({
    title:{
        type:String,
        require:[true, "Subject's Title is Missing"]
    },
    objective:String,
    prerequisites:[String],
    modules:[mongoose.SchemaTypes.ObjectId],
    referenceMaterial:[mongoose.SchemaTypes.ObjectId],
    outcomes:[String],
    // alternativeCourses:[]
})

const Subject = new mongoose.Model(subjectSchema)

exports = Subject