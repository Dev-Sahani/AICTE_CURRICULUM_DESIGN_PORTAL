const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
    common_id:{
        type:mongoose.SchemaTypes.ObjectId,
        require:[true, "course's common_id is missing"],
    },
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
        common_id:mongoose.SchemaTypes.ObjectId,
        version:{
            type:Number,
            require:[true, "course's subject.common_id is missin"]
        },
        title:String,
        category:String,
        code:String,
        semester:Number,
        weeklyHours:Number,
    }],
    dateOfCommit:{
        type:Date,
        default:Date.now()
    }
},{
    virtuals:true
})

//Indexes of database
courseSchema.index("common_id",{
    unique:false
})
courseSchema.index(["common_id","version"],{
    unique:true
})

//Virtual props
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