const mongoose = require('mongoose')

const changeSchema = new mongoose.Schema({
    schemaType:{
        type:String,
        enum:["course","subject","module"],
        require:[true,"schemaType is Missing"]
    },
    ObjectId:{
        type:mongoose.SchemaTypes.ObjectId,
        require:[true,"ObjectId is missing"]
    },
    commits:[{
        dateOfCommit:{
            type:Date,
            require:[true,"time is Missing"]
        },
        changes:[{
            action:{
                type:String,
                enum:["delete","add","update"],
                require:[true,"action is Missing"]
            },
            property:[String],
            index:[String],
            oldValue:String,
            newValue:String
        }]
    }]
})