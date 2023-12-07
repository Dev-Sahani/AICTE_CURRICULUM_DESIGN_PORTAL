const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
    title:{
        type:String,
        unique: [true,"Course with same title already exists"],
        require:[true,"Course Title is Missing"]
    },
    message:String,
    preface:String,
    acknowledgement:String,

    committee:[{
        educatorId:mongoose.SchemaTypes.ObjectId,
        role: {
            type: String,
            enum: ['editor','admin'],
        }
    }],
    definitionOfCredits:[{
        activity:String, //like 'L', 'T', 'P' etc.
        overallCredits:Number
    }],
    rangeOfCredits:{
        text:String,
        credits:Number
    },
    guidlines : [String],
    codesAndDef : [{
        code:String,
        definition:String
    }],
    subjects:[{
        id:mongoose.SchemaTypes.ObjectId,
        title:String,
        category:String,
        code:String,
        semester:Number,
        weeklyHours:Number,
        // version:{
        //     type:Number,
        //     default:1
        // }
    }],
    // version:{
    //     type:Number,
    //     require:[true,"Version is Missing"],
    //     default:1
    // },
    // dateOfCommit:{
    //     type:Date,
    //     default:Date.now()
    // }
},{
    virtuals:true
})

// courseSchema.index(["_id","version"],{
//     unique:true
// })

courseSchema.virtual("Categories",()=>{
    
})
courseSchema.virtual("Semester",()=>{

})

const Course = new mongoose.Model("Course", courseSchema)

module.exports = Course;