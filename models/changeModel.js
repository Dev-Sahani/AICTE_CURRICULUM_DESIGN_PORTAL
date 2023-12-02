const mongoose = require('mongoose')

const changeSchema = new mongoose.Schema({
    course_id:mongoose.SchemaTypes.ObjectId,

    commits:[{
        action:{
            type:String,
            enum:["delete","add","update"],
            require:[true,"action is Missing"]
        },
        time:{
            type:Date,
            require:[true,"time is Missing"]
        },
        by:{
            type:mongoose.SchemaTypes.ObjectId,
            require:[true,"by is Missing"]
        },
        changes:[{
            action:{
                type:String,
                enum:["delete","add","update"],
                require:[true,"action is Missing"]
            },
            property:[String],
            index:[String]
        }]
    }]
})