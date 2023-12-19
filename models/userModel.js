const mongoose = require('mongoose')
const bcrypt = require("bcrypt")
const crypto = require('crypto')

const userSchema = new mongoose.Schema({
    userId:{
        type:String,
        require:[true,"User's id is Missing"],
        unique:[true,"User with same id already exists"],
        // validate: {
        //     validator: function(value) {
        //       return 
        //     },
        //     message: 'Username must only contain letters, numbers, and underscores.'
        //   }
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
        require:[true,"User's gender is Missing"]
    },
    dob:Date,
    // profileImgUrl:

    areaOfSpecialization:[String],
    adminIn:[{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"course"
    }],
    editorIn:[{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"course"
    }],
    viewerIn:[{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"course"
    }],
    passwordChangedAt:{
        type:Date,
        select:true
    },
    passwordResetToken:String,
    passwordResetTokenExpire:Date,
    active:{
        type:Boolean,
        default:true,
        select:false
    }
})


//Indexes
userSchema.index("userId",{
    unique:true
})
userSchema.pre(/^find/,async function (next){
    //this refers to the query here
    this.find({ active: {$ne:false} })
    //or this.and({ active: {$ne:false} })
    //or this.where('active').ne(false)
    next()
})

//middlewares
userSchema.pre(/^find^/,function(next){
    this.populate({
        path:"adminIn",
        select:"common_id title"
    }).populate({
        path:"editorIn",
        select:"common_id title"
    }).populate({
        path:"viewerIn",
        select:"common_id title"
    })
    next()
})

userSchema.pre("save",async function(next){
    if(!this.isModified("password"))return next();

    this.password = await bcrypt.hash(this.password,12)
    next();
})
userSchema.pre("save",async function(next){
    if(!this.isModified() || this.isNew)return next()
    this.passwordChangedAt = Date.now() - 1000
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