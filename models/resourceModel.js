const mongoose = require('mongoose')

const resourceSchema = new mongoose.Schema({
    title:{
        type:String,
        require:[true, "resources's Title is Missing"]
    },
    description:{
        type:String,
        require:[true, "resources's description is Missing"]
    },
    type:{
        type:String,
        enum:['book','e-book','research-paper','notes','video','image','article'],
        message: 'Invalid type value: only {"book","e-book","research-paper","notes","video","image","article"} is allowed',
        require:[true,"Resource's Type is Missing"],
    },
    author:{
        type:String,
        require:[true,"Resource's Author is Missing"],
    },
    publisher: String,
    coverImageUrl:String,
    url:String
})

const Resource = new mongoose.model("resources",resourceSchema)

module.exports = Resource;
