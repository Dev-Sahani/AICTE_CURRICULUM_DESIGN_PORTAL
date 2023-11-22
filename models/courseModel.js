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
    // rangeOfCredits:{
    //     text:String,
    //     credits:Number
    // },
    guidlines : [String],
    codesAndDef : [{
        code:String,
        definition:String
    }],
    subjects:[{
        id:mongoose.SchemaTypes.ObjectId,

        category:String,
        code:String,
        semester:Number,
        weeklyHours:Number
    }]
},{
    virtuals:true
})

courseSchema.virtual("Categories",()=>{
    
})
courseSchema.virtual("Semester",()=>{

})

const Course = new mongoose.Model(courseSchema)

module.exports = Course;