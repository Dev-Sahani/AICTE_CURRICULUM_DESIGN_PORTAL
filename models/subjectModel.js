const mongoose = require('mongoose')

const editableTypeWrapper = (obj)=>({
    new:[{
        by:{
            type:mongoose.Types.ObjectId,
            ref:'User'
        },
        value:obj,
        _id:false
    }],
    cur:obj,
    _id:false
})
const editableArrayWrapper = (arr)=>({
    add:[{
        by:{
            type:mongoose.Types.ObjectId,
            ref:'User'
        },
        // index:Number,
        value:{type:arr[0].cur, _id:false},
        _id:false
    }],
    del:[{
        by:{
            type:mongoose.Types.ObjectId,
            ref:'User'
        },
        index:Number,
        _id:false
    }],
    cur:arr
})

const subjectSchema = new mongoose.Schema({
    common_id:{
        type:mongoose.SchemaTypes.ObjectId,
        require:[true,"subject's common_id is missing"]
    },
    version:{
        type:Number,
        default:1
    },
    title:editableTypeWrapper({
        type:String,
        require:[true, "Subject's Title is Missing"]
    }),
    objectives:editableArrayWrapper([editableTypeWrapper(String)]),
    prerequisites:editableArrayWrapper([editableTypeWrapper(String)]),
    modules:editableArrayWrapper([editableTypeWrapper({
        title:{
            type:String,
            require:[true, "Subject's Title is Missing"]
        },
        topics:[String],
    })]),
    experiments:editableArrayWrapper([editableTypeWrapper({
        name:{
            type:String,require:true
        },
        url:String
    })]),
    referenceMaterial:editableArrayWrapper([editableTypeWrapper(mongoose.SchemaTypes.ObjectId)]),
    outcomes:editableArrayWrapper([editableTypeWrapper(String)]),
    // alternativeCourses:[]
})


//Indexes of database
subjectSchema.index(["common_id","version"],{
    unique:true
})


const Subject = new mongoose.model("Subject", subjectSchema)

module.exports = Subject