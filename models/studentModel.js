const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    institute:{
        type:mongoose.SchemaTypes.ObjectId,
        require:[true,"Student's institute is Missing"]
    },
    name:{
        type:String,
        require:[true,"Student's name is Missing"]
    },
    email:{
        type:String,
        require:[true,"Student's email is Missing"],
        unique:[true,"Student with same email already exists"]
    },
    gender:{
        type:String,
        enum:["male","female","other"],
        require:[true,"Student's gender is Missing"]
    },
    dob:Date,

    yearOfStudy:{
        type:Number,
        require:[true,"Student's year of study is Missing"]
    },
    course:{
        type:String,
        require:[true,"Student's course is Missing"]
    }
})

const Student = new mongoose.Model(studentSchema)

module.exports = Student;