const mongoose = require('mongoose')
const bcrypt = require("bcrypt")
const crypto = require('crypto')
const { userRoleEnum, userGenderEnum, accessEnum } = require("./types")

const userSchema = new mongoose.Schema({
    password:{
        type:String,
        require:[true,'User password is missing'],
        min:[8,'Password must have length of at least 8'],
        select : false
    },
    role:{
        type:String,
        require:[true,"type of User is missing"],
        enum:userRoleEnum,
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
        enum:userGenderEnum,
        // require:[true,"User's gender is Missing"]
    },
    dob:Date,
    profileImgUrl:String,

    areaOfSpecialization:[String],
    courses:[{
        type:{
            id:{
                type:mongoose.SchemaTypes.ObjectId,
                ref:"course"
            },
            access:{
                type:String,
                enum:accessEnum,
            }
        },
        unique:[true, "user already enrolled"],
        _id:false
    }],
    passwordChangedAt:{
        type:Date,
        select:true
    },
    passwordResetToken:String,
    passwordResetTokenExpire:Date,
    otp:{
        type:String,
        select:false
    },
    active:{
        type:Boolean,
        default:true,
        select:false
    },
    preRegistered:{
        type:Boolean,
        default:false,
        select:false
    }
})


//Indexes


userSchema.pre(/^find/,async function (next){
    //this refers to the query here 
    this.find({ active: {$ne:false} })
    if(!this.skipPreMiddleware){
        this.find({preRegistered:{$ne:true}})
    }
    next()
})

//middlewares
userSchema.pre(/^find^/,function(next){
    // this.populate({
    //     path:"courses.id",
    //     select:"common_id title"
    // })
    next()
})

userSchema.pre("save",async function(next){
    if(!this.isModified("password"))return next();

    this.password = await bcrypt.hash(this.password,12)
    next();
})
userSchema.pre("save",async function(next){
    if(!this.isModified("password") || this.isNew || this.preRegistered)return next()
    this.passwordChangedAt = Date.now() - 2000
    next()
})

//methods
userSchema.methods.checkPassword = async function (pass1 , encrypPass){
    return (await bcrypt.compare(pass1,encrypPass))
}

userSchema.methods.isPasswordChangedAfter = function (TimeStamp){
    //Return true if changed else false
    if(this.passwordChangedAt){
        const timeOfChange = parseInt(this.passwordChangedAt.getTime()/1000,10);
        return TimeStamp < timeOfChange;
    }
    return false;
}
userSchema.methods.createRandomToken = async function(){
    const randomToken = crypto.randomBytes(32).toString('hex');

    this.passwordResetToken = await crypto
        .createHash('sha256')
        .update(randomToken)
        .digest('hex')

    //setting the expire time as :  current date + 10 min
    this.passwordResetTokenExpire = new Date() + 10*60 * 1000;
    
    return randomToken;
}


const User = new mongoose.model("User", userSchema)

module.exports = User;