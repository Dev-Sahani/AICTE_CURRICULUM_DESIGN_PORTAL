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
        versionId:{
            type:String,
            require:[true,"versionId is Missing"],
        }
    }],
    versionId:{
        type:String,    //_id+<version>
        // require:[true,"Version is Missing"],
        unique:[true,"course with same versionId already exits"],
    },
    dateOfCommit:{
        type:Date,
        default:Date.now()
    }
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

courseSchema.pre("save",function (){
    if(!this.isModified){
        this.versionId = this._id.toString() + '.1'
    }
})

const Course = new mongoose.Model("course",courseSchema)
module.exports = Course;