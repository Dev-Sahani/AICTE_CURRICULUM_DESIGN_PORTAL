const mongoose = require('mongoose')
const bcrypt = require("bcrypt")
const crypto = require('crypto')

const facultySchema = new mongoose.Schema({
    facultyId:{
        type:String,
        require:[true,"User's id is Missing"],
        unique:[true,"User with same id already exists"],
    },
    password:{
        type:String,
        require:[true,'User password is missing'],
        min:[8,'Password must have length of at least 8'],
        select : false
    },
    role:{
        type:String,
        require:[true,"type of User is missing"],
        enum:["administrator","faculty","expert"]
    },
    name:{
        type:String,
        require:[true,"User's name is Missing"]
    },
    email:{
        type:String,
        require:[true,"User's email is Missing"],
        unique:[true,"User with same email already exists"]
    },
    gender:{
        type:String,
        enum:["male","female","other"],
    },
    otp:{
        type:String,
        select:false
    },
    active:{
        type:Boolean,
        default:true,
        select:false
    }
})



//Indexes
facultySchema.index("userId",{
unique:true
})
facultySchema.pre(/^find/,async function (next){
//this refers to the query here
    this.find({ active: {$ne:false} })
    //or this.and({ active: {$ne:false} })
    //or this.where('active').ne(false)
    next()
})

//middlewares
facultySchema.pre("save",async function(next){
    if(!this.isModified("password"))return next();

    this.password = await bcrypt.hash(this.password,12)
    next();
})
facultySchema.pre("save",async function(next){
    if(!this.isModified() || this.isNew)return next()
    this.passwordChangedAt = Date.now() - 1000
    next()
})

//methods
facultySchema.methods.checkPassword = async function (pass1 , encrypPass){
return (await bcrypt.compare(pass1,encrypPass))
}

facultySchema.methods.isPasswordChangedAfter = function (TimeStamp){
//Return true if changed else false
if(this.passwordChangedAt){
    const timeOfChange = parseInt(this.passwordChangedAt.getTime()/1000,10);
    return TimeStamp < timeOfChange;
}
return false;
}
facultySchema.methods.createRandomToken = async function(){
const randomToken = crypto.randomBytes(32).toString('hex');

this.passwordResetToken = await crypto
    .createHash('sha256')
    .update(randomToken)
    .digest('hex')

//setting the expire time as :  current date + 10 min
this.passwordResetTokenExpire = new Date() + 10*60 * 1000;

return randomToken;
}


const User = new mongoose.model("faculty", facultySchema)

module.exports = User;