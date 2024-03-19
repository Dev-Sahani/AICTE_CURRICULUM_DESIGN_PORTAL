const User = require('../models/userModel');
const Otp = require('../models/otpModel');
const util = require('util')
const jwt = require('jsonwebtoken')
const bcrypt = require("bcrypt");
const { CustomAPIError, UNAUTHORIZED_USER, BAD_REQUEST ,NOT_FOUND } = require('../errors');
const {sendEmailToUser, sendOTP} = require('../utils/email')

function generateRandomKey(length) {
    const charset = '0123456789abcdefghijklmlopqrtsuvwxyz';
    let password = '';
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
  
    return password;
}

const sendRes = (res,statusCode,token, user,msg)=>{
    if(token)
        res.cookie('token',token,{
            expires:new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
            secure:process.env.NODE_ENV==='production',
            httpOnly:true
        })

    res.status(statusCode).send({
        status:'success',
        message:msg,
        user:user
    })
}

const createJWT = (user)=>jwt.sign({id:user._id, role:user.role},process.env.JWT_SECRET, {
    expiresIn:(process.env.JWT_COOKIE_EXPIRE * 24*60*60)
})


module.exports.registerAdmin = async (req,res, next)=>{
    if(!req.body.email || !req.body.otp || !req.body.name || !req.body.password){
        return next(new BAD_REQUEST("Invalid request body"))
    }

    const verified = await verifyOtp(req.body.otp, req.body.email)
    if(!verified)
    return next(new BAD_REQUEST("Invalid OTP"))

    const newUser = await User.create({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        role:"administrator"
    });
    const token = createJWT(newUser)
    sendRes(res,201,token,newUser)
}
module.exports.preRegisterDev = async (req,res, next)=>{
    const {name,email, role, mailText} = req.body;
    if(!(["expert","faculty"].includes(req.body.role))){
        return next(new BAD_REQUEST("role can only include 'expert' or 'faculty'"))
    }
    
    //If user already in database
    let newPass;
    const query = User.findOne({email}).select("name email preRegistered password")
    query.skipPreMiddleware = true;
    let user = await query;
    //If user is an PreRegistered user
    if(user && !user.preRegistered) throw new BAD_REQUEST("User with this Email already exists")

    newPass = generateRandomKey(process.env.USER_PASSWORD_LEN)
    if(!user){
        user = new User({
            name:name, 
            email:email,
            role:role,
            preRegistered:true,
        })
        user.password = newPass
        await user.save()
    }
    //if user is in database but not preRegistered
    else{
        const encryptPass = await bcrypt.hash(newPass,12)
        const query = User.findOneAndUpdate(
            {email}
            ,{name,role,password:encryptPass},
            {new:true}
        )
        query.skipPreMiddleware = true
        user = await query; 
    }
    
    
    //email the new user credentials to user.email
    const mailUser = {...user._doc,password:newPass}
    await sendEmailToUser(mailUser, mailText)

    res.status(200).json({
        status:"success",
        message:"login credential has been send to user on provided email",
        data:{...mailUser, password:undefined}
    })
}

module.exports.registerDev = async (req,res, next)=>{
    const {name, email, password} = req.body;

    if(!email || !name || !password){
        return next(new BAD_REQUEST("Invalid request body"))
    }

    let query = User.findOne({email}).select("+password +preRegistered")
    query.skipPreMiddleware = true;
    let user = await query;

    if(!user)return next(new UNAUTHORIZED_USER("user mail id does not match"));
    
    if(!user.preRegistered)return next(new UNAUTHORIZED_USER("user already registered"));

    const isMatch = await user.checkPassword(password,user.password);
    if(!isMatch)return next(new UNAUTHORIZED_USER("user password does not match"));

    query = User.findOneAndUpdate({email},{name, preRegistered:false})
    query.skipPreMiddleware = true;
    user = await query;

    const token = createJWT(user)
    sendRes(res,200,token,user)
}

module.exports.verifyByToken = async (req, res, next)=>{
    const token = req.cookies.token;
    if(!token){
        throw new UNAUTHORIZED_USER("Invalid Authentication!")
    }
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload.id).select("-_id").populate({
            path:"courses.id",
            select:"common_id title level program"
        })

    if(!user || payload.role!==user.role)
    throw new UNAUTHORIZED_USER("")

    res.status(200).send({
        status:"success",
        user
    })
}

module.exports.login = async (req,res,next)=>{
    const {email,password} = req.body
    if(!email || !password)return next(new BAD_REQUEST('User mail-id or password not provide'));
    const newUser = await User.findOne({email}).select('+password')

    if(!newUser)return next(new UNAUTHORIZED_USER("user mail id or password does not match"));
    
    const isMatch = await newUser.checkPassword(password,newUser.password);
    if(!isMatch)return next(new UNAUTHORIZED_USER("user password does not match"));

    const token = createJWT(newUser)
    sendRes(res,200,token,newUser);
};

module.exports.logout = async (req, res)=>{
    res
    .clearCookie('token', { expires: new Date(0) })
    .status(200)
    .send({ status:"success",message: 'Logout successful' });
}

module.exports.protect = async (req, res, next)=>{
    //Checking that token exists
    let token = req.cookies?.token;

    //Verifying Token
    if(!token) return next(new UNAUTHORIZED_USER('User not logged in' ));
    const decoded = await util.promisify(jwt.verify)(token,process.env.JWT_SECRET)

    //Checking that user still exists.
    const freshUser = await User.findById(decoded.id)
    if(!freshUser)
        return next(new UNAUTHORIZED_USER('User belonging to token no longer exits'));
    
    //Check if user changed password after token was issued
    if(freshUser.isPasswordChangedAfter(decoded.iat)){
        return next(new UNAUTHORIZED_USER('User recently changed password! please log in again'))
    }

    req.user = freshUser; // May be used in future
    next();
}

module.exports.restrictTo = function(...roles){
    if(!roles.every(el=>["administrator","faculty","expert"].includes(el))){
        throw new Error("Operationl Erorr - Invalid roles");
    }

    return (req, res, next)=>{        
        if(!req.user || !roles.includes(req.user.role)){
            return next(new CustomAPIError("You don't have acess to performe this action\nFORBIDDEN", 403))
        }
        next();
    }
}

module.exports.updatePassword = async function (req,res, next){
    //Checking user
    const user = await User.findOne({email:req.user.email}).select('+password')
    //Cofirming the current Password
    const match = await user.checkPassword(req.body.currentPassword, user.password)
    if(!match){
        return next(new NOT_FOUND('Incorect current Password'));
    }
    //updating the user
    user.password = req.body.newPassword
    await user.save()

    //loging in user with new password and send response
    const token = createJWT(user)
    
    const resUser = {
        ...user,
        password:undefined
    }
    sendRes(res,200,token,resUser)
}

module.exports.sendOTP = async (req, res)=>{
    const OTP = generateRandomKey(process.env.OTP_LEN)
    await sendOTP(req.body.email, OTP)
    await Otp.findOneAndUpdate(
        { email: req.body.email}, 
        { $set: { otp:OTP } },
        { upsert: true, new: true }
    )
    res.status(200).send({
        stauts:"success",
        message:"opt has send"
    })
}

const verifyOtp = async (otp,email)=>{
    const otpObj = await Otp.findOne({email})

    if(otp === otpObj.otp){
        await Otp.deleteOne({_id:otpObj._id})
        return true;
    }
    return false;
}