const mongoose = require('mongoose')

const facultySchema = new mongoose.Schema({
    facultyId:{
        type:String,
        require:[true,"Faculty's id is Missing"],
        unique:[true,"Faculty with same id already exists"]
    },
    institute:{
        type:mongoose.SchemaTypes.ObjectId,
        require:[true,"Faculty's institute is Missing"]
    },
    name:{
        type:String,
        require:[true,"Faculty's name is Missing"]
    },
    email:{
        type:String,
        require:[true,"Faculty's email is Missing"],
        unique:[true,"Faculty with same email already exists"]
    },
    gender:{
        type:String,
        enum:["male","female","other"],
        require:[true,"Faculty's gender is Missing"]
    },
    dob:Date,

    dateOfJoin:{
        type:Date,
        require:[true,"Faculty's date of joining is Missing"]
    },
    designation:{
        type:String,
        require:[true,"Faculty's designation is Missing"]
    },
    appointmentType:String,

    areasOfSpecialization:[String],
    adminIn:[mongoose.SchemaTypes.ObjectId],
    editorIn:[mongoose.SchemaTypes.ObjectId],
    viewerIn:[mongoose.SchemaTypes.ObjectId]
})

const Faculty = new mongoose.Model("Faculties", facultySchema)

module.exports = Faculty;