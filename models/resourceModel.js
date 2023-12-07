const mongoose = require('mongoose')

const resourceSchema = new mongoose.Schema({
    title:{
        type:String,
        require:[true, "resources's Title is Missing"]
    },
    type:{
        type:String,
        enum:['book','e-book','research-paper','notes','video','image'],
        require:[true,"Resource's Type is Missing"]
    },
    author:{
        type:String,
        require:[true,"Resource's Author is Missing"],
    },
    publisher : [String],
    distributer: [String],
    
    coverImageUrl:String,
    url:String
})

const Resource = new mongoose.Model("resources", resourceSchema)

exports = Resource