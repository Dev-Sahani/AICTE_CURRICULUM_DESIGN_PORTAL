const mongoose = require('mongoose')

const subjectSchema = new mongoose.Schema({
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
        // versionId:{
        //     type:String,
        //     require:[true,"Module's versionId is missing"]
        // }
    }],
    referenceMaterial:[mongoose.SchemaTypes.ObjectId],
    outcomes:[String],
    // alternativeCourses:[]
    versionId:{
        type:String,
        require:[true,"versionId is Missing"],
        unique:[true,"subject with same version Id already exits"]
    }
})

// subjectSchema.index(["_id","version"],{
//     unique:true
// })
courseSchema.pre("save",function (){
    if(!this.isModified){
        this.versionId = this._id.toString() + '.1'
    }
})

const Subject = new mongoose.Model("Subject", subjectSchema)

exports = Subject