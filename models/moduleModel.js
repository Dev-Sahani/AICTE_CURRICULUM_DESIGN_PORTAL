//We are not implementing modules in subject schema

// const mongoose = require('mongoose')

// const moduleSchema = new mongoose.Schema({
//     title:{
//         type:String,
//         require:[true, "Subject's Title is Missing"]
//     },
//     topics:[String],
//     version:{
//         type:Number,
//         default:1
//     }
// })

// moduleSchema.index(["_id","version"],{
//     unique:true
// })

// const Module = new mongoose.model(moduleSchema)

// exports = Module