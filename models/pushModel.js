const mongoose = require('mongoose')

const pushSchema = new mongoose.Schema({
    course:{
        type:mongoose.Schema.Types.Mixed,
        // type:mongoose.SchemaTypes.Subdocument,
        require:[true, "course is Missing"]
    },
    subjects:[
        mongoose.Schema.Types.Mixed
        // mongoose.SchemaTypes.Subdocument
    ],
    by: {
        type:mongoose.SchemaTypes.ObjectId,
        require:[true,"by is Missing! mention the user pushed changes"]
    },
    date:{
        type:Date,
        default:Date.now
    }
})

const Push = new mongoose.model("push",pushSchema)
exports = Push