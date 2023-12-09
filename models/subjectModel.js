const mongoose = require('mongoose')

const subjectSchema = new mongoose.Schema({
    common_id:{
        type:mongoose.SchemaTypes.ObjectId,
        require:[true,"subject's common_id is missing"]
    },
    version:{
        type:Number,
        require:[true,"subject's version is missing"]
    },
    title:{
        type:String,
        require:[true, "Subject's Title is Missing"]
    },
    objective:String,
    prerequisites:[String],
    modules:[{
        title:{
            type:String,
            require:[true, "Subject's Title is Missing"]
        },
        topics:[String],
    }],
    referenceMaterial:[mongoose.SchemaTypes.ObjectId],
    outcomes:[String],
    // alternativeCourses:[]
})


//Indexes of database
courseSchema.index("common_id",{
    unique:false
})
subjectSchema.index(["common_id","version"],{
    unique:true
})

courseSchema.pre("save",function (){
    if(!this.isModified){
        this.versionId = this._id.toString() + '.1'
    }
})

const Subject = new mongoose.Model("Subject", subjectSchema)

exports = Subject