const mongoose = require('mongoose')

const otpSchema = new mongoose.Schema({
    email:{
        type:String,
        require:[true, "email is missing"]
    },
    time:{
        type:Date,
        default:Date.now()
    },
    otp: {
        type:String,
        require:[true, "otp is missing"]
    }
})

const Otp = new mongoose.model("otp",otpSchema);
module.exports = Otp