const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
    common_id:{
        type:mongoose.SchemaTypes.ObjectId,
        require:[true, "course's common_id is missing"],
    },
    version:{
        type:Number,
        default:1
    },
    title:{
        type:String,
        require:[true,"Course Title is Missing"]
    },

    program:{
        type:String,
        enum:["undergraduate","postgraduate","diploma"],
        require:[true,"program is missin"]
    },
    level:{
        type:String,
        enum:["Applied Arts and Crafts", "Architecture and Town Planning",
            "Architecture", "Town Planning", "Engineering & Technology", 
            "Hotel Management and Catering", "Management", "MCA", "Pharmacy"],
        require:[true,"level is missin"]
    },
    description:String,
    prerequisites:[String],
    objectives:[String],
    outcomes:[String],

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
        credits:Number,
        l:Number,
        t:Number,
        p:Number,
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
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
})

//Indexes of database
courseSchema.index(["common_id","version"],{
    unique:true
})

//Virtual props
courseSchema.virtual("categories").get(function (next){
    const categories = {}
    // console.log("./courseModel/virtuals", this.get('subjects'))
    if(this.subjects)
    this.subjects.forEach((val)=>{
        if(!categories[val.category])
            categories[val.category] = []
        categories[val.category].push(val)
    })
    return categories
})
courseSchema.virtual("semesters").get(function(next){
    const prop = {};
    // console.log("./courseModel/virtuals", this.get('subjects'))
    if(this.subjects)
    this.subjects.forEach((val)=>{
        if(!prop[val.semester])
            prop[val.semester] = []
        prop[val.semester].push(val)
    })
    return prop
})

courseSchema.pre(/^find^/,function (next){
    this.select({__v:0})
})

const Course = new mongoose.model("course",courseSchema)
module.exports = Course;