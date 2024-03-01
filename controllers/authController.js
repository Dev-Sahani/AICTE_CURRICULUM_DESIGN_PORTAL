const User = require('../models/userModel');
const Otp = require('../models/otpModel');
const util = require('util')
const jwt = require('jsonwebtoken')
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
module.exports.registerDev = async (req,res, next)=>{
    if(!(["expert","faculty"].includes(req.body.role))){
        return next(new BAD_REQUEST("role can only include 'expert' or 'faculty'"))
    }
    const newPass = generateRandomKey(process.env.USER_PASSWORD_LEN)
    const newUser = new User({
        name:req.body.name, 
        email:req.body.email,
        role:req.body.role
    })
    newUser.password = newPass

    await newUser.save()

    //email the new user credentials to newUser.email
    const mailContent = {...newUser._doc,password:newPass}
    await sendEmailToUser(mailContent)

    res.status(200).json({
        status:"success",
        message:"login credential has been send to user on provided email",
        data:mailContent
    })
}

module.exports.verifyByToken = async (req, res, next)=>{
    const token = req.cookies.token;
    if(!token){
        throw new UNAUTHORIZED_USER("Invalid Authentication!")
    }
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload.id).select("-_id")

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
    const freshUser = await User.findById(decoded.id);
    if(!freshUser)
        return next(new UNAUTHORIZED_USER('User belonging to token no longer exits'));
    
    //Check if user changed password after token was issued
    if(freshUser.isPasswordChangedAfter(decoded.iat)){
        next(new UNAUTHORIZED_USER('User recently changed password! please log in again'))
    }

    req.user = freshUser; // May be used in future
    next();
}

module.exports.restrictTo = function(...roles){
    return (req, res, next)=>{
        
        if(!req.user || !roles.includes(req.user.role)){
            next(new CustomAPIError("You don't have acess to performe this action\nFORBIDDEN", 403))
        }
        next();
    }
}

module.exports.updatePassword = async function (req,res, next){
    //Checking user
    const user = User.findById(req.user.id).select('+password')
    //Cofirming the current Password
    const match = await user.checkPassword(req.body.currentPassword, user.password)
    if(!match){
        return next(new NOT_FOUND('Incorect current Password'));
    }
    //updating the user
    user.password = req.body.newPassword
    user.passwordConfirm = req.body.newPasswordConfirm
    await user.save()

    //loging in user with new password and send response
    const token = createJWT(user)
    
    const resUser = {
        name:user.name,
        email:user.email
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