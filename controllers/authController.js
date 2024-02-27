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


module.exports.verifyByToken = async (req, res, next)=>{
    const token = req.cookies.token;
    if(!token){
        throw new UNAUTHORIZED_USER("Invalid Authentication!")
    }
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload.id).select("-userId -_id")
    if(!user || payload.role!==user.role)
    throw new UNAUTHORIZED_USER("")

    res.status(200).send({
        status:"success",
        user
    })
}

module.exports.registerAdmin = async (req,res, next)=>{
    const newUser = new User({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        role:"administrator"
    });
    newUser.userId = newUser._id
    await newUser.save()
    const token = createJWT(newUser)
    sendRes(res,201,token,newUser)
}
module.exports.registerDev = async (req,res, next)=>{
    if(!(["expert","faculty"].includes(req.body.role))){
        return next(new BAD_REQUEST("role can only include 'expert' or 'faculty'"))
    }
    const newPass = generateRandomKey(process.env.USER_PASSWORD_LEN)
    const newUser = new User({name:req.body.name, email:req.body.email,role:req.body.role})
    newUser.userId = newUser._id
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

module.exports.login = async (req,res,next)=>{
    const {userId,email,password} = req.body
    if(!(email||userId) || !password)return next(new BAD_REQUEST('User userId or password not provide'));
    const newUser = await User.findOne({
        $or:[
            {userId},
            {email}
        ]
    }).select('+password')
    if(!newUser)return next(new UNAUTHORIZED_USER("user userId or password does not match"));
    
    const isMatch = await newUser.checkPassword(password,newUser.password);
    if(!isMatch)return next(new UNAUTHORIZED_USER("user userId or password does not match"));

    const token = createJWT(newUser)
    sendRes(res,200,token,newUser);
};


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

module.exports.sendOTP = async (req, res, next)=>{
    const OTP = generateRandomKey(process.env.OTP_LEN)
    await sendOTP(req.body.email, OTP)
    const otpObj = await Otp.findOneAndUpdate(
        { email: req.body.email}, 
        { $set: { otp:OTP } },
        { upsert: true, new: true }
    )
    res.status(200).send({
        stauts:"success",
        message:"opt has send"
    })
}

module.exports.verifyOtp = async (req, res, next)=>{
    const OTP = req.body.otp
    const otpObj = (await Otp.findOne({
        email:req.body.email
    }))

    if(OTP === otpObj.otp){
        Otp.deleteOne({_id:otpObj._id})
        res.status(200).send({
            stauts:"success",
            message:"opt has verified"
        })
    }else{
        return next(new UNAUTHORIZED_USER("Otp does not match"))
    }
}

// Temp for flutter app dev
module.exports.sendOTP2 = async (req, res, next)=>{
    const OTP = generateRandomKey(process.env.OTP_LEN)
    await sendOTP("21bcs022@ietdavv.edu.in", OTP)
    const otpObj = await Otp.findOneAndUpdate(
        { email: "21bcs022@ietdavv.edu.in"}, 
        { $set: { otp:OTP } },
        { upsert: true, new: true }
    )
    res.status(200).send({
        stauts:"success",
        message:"opt has send"
    })
}

exports.verifyOtp2 = async (req, res, next)=>{
    const OTP = req.body.otp
    const otpObj = (await Otp.findOne({
        email:"21bcs022@ietdavv.edu.in"
    }))

    if(OTP === otpObj.otp){
        Otp.deleteOne({_id:otpObj._id})
        res.status(200).send({
            stauts:"success",
            message:"opt has verified"
        })
    }else{
        return next(new UNAUTHORIZED_USER("Otp does not match"))
    }
}