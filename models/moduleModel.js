const mongoose = require('mongoose')

const moduleSchema = new mongoose.Schema({
    title:{
        type:String,
        require:[true, "Subject's Title is Missing"]
    },
    topics:[String]
})

const Module = new mongoose.Model(moduleSchema)

exports = Module