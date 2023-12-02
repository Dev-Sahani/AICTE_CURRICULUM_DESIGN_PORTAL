const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
    isStudent:Boolean,
    user:{
        type:mongoose.SchemaTypes.ObjectId,
        require:[true,"user is Missing"]
    }
    //TODO
})

const Review = new mongoose.Model(reviewSchema)
exports = Review