const mongoose = require('mongoose')
const { 
    editableArrayWrapper,
    editableTypeWrapper,
    courseProgramEnum,
    courseLevelEnum,
    accessEnum 
} = require("./types.js")

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
        type:editableTypeWrapper(String),
        require:[true,"Course Title is Missing"]
    },

    program:{
        type:editableTypeWrapper({
            type:String,
            enum: courseProgramEnum,
        }),
        require:[true,"program is missin"]
    },
    level:{
        type:editableTypeWrapper({
            type:String,
            enum:courseLevelEnum,
        }),
        require:[true,"level is missin"]
    },
    description:editableTypeWrapper(String),
    message:editableTypeWrapper(String),
    preface:editableTypeWrapper(String),
    acknowledgement:editableTypeWrapper(String),

    committee:[{
        educatorId:mongoose.SchemaTypes.ObjectId,
        role: {
            type: String,
            enum: accessEnum,
        }
    }],
    definitionOfCredits:editableArrayWrapper([editableTypeWrapper({
        activity:{type:String, require:[true,"activity of credit missing"]},
        overallCredits:{type:Number, require:[true,"overallCredits of credit missing"]}
    })]),
    rangeOfCredits:editableTypeWrapper(Number),
    guidlines : editableArrayWrapper([editableTypeWrapper(String)]),
    codesAndDef : editableArrayWrapper([editableTypeWrapper({
        code:{type:String, require:[true,"code of code missing"]},
        definition:{type:String, require:[true,"definition of code missing"]}
    })]),
    subjects:editableArrayWrapper([editableTypeWrapper({
        common_id:mongoose.SchemaTypes.ObjectId,
        version:{
            type:Number,
            // require:[true, "course's subject.common_id is missing"]
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
    })]),
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
courseSchema.virtual("categories").get(function (){
    const categories = {}
    if(this.subjects.cur)
    this.subjects.cur.forEach((val)=>{
        if(!categories[val.cur.category])
            categories[val.cur.category] = []
        categories[val.cur.category].push(val)
    })
    return categories
})

courseSchema.virtual("semesters").get(function(){
    const prop = {};
    if(this.subjects.cur)
    this.subjects.cur.forEach((val)=>{
        if(!prop[val.cur.semester])
            prop[val.cur.semester] = []
        prop[val.cur.semester].push(val)
    })
    return prop
})


courseSchema.pre(/^find^/,function (next){
    this.select({__v:0})
})

const Course = new mongoose.model("course",courseSchema)
module.exports = Course;