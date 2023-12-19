const User = require('../models/userModel');
const Otp = require('../models/otpModel');
const util = require('util')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
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

module.exports.register = async (req,res, next)=>{
    const userId = req.body;
    const newUser = await User.create({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        role:"administrator",
        // gender:req.body.gender,
        // dob:req.body.dob,
        // areaOfSpecialization:req.body.areaOfSpecialization,
        // password:req.body.password,
        // passwordChangedAt:req.body.passwordChangedAt,
        // adminIn:req.body.adminIn,
        // editorIn:req.body.editorIn,
        // viewerIn:req.body.viewerIn,
    });
    const token = createJWT(newUser)
    sendRes(res,201,token,newUser)
}
module.exports.registerUser = async (req,res, next)=>{
    if(!(["expert","faculty"].includes(req.body.role))){
        return next(new BAD_REQUEST("role can only include 'expert' or 'faculty'"))
    }
    const newPass = generateRandomKey(process.env.USER_PASSWORD_LEN)
    console.log(newPass)
    const newUser = new User({name:req.body.name, email:req.body.email,role:req.body.role})
    newUser.userId = newUser._id
    newUser.password = newPass
    console.log(newUser.password)
    await newUser.save()

    //email the new user credentials to newUser.email
    const user = {...newUser._doc,password:newPass}
    // user.password = generateRandomKey(process.env.USER_PASSWORD_LEN)
    await sendEmailToUser(user)


    res.status(200).json({
        status:"success",
        message:"login credential has been send to user on provided email",
        data:user
    })
}


module.exports.loginAdmin = async (req,res,next)=>{
    const {email,password} = req.body
    if(!email || !password)return next(new BAD_REQUEST('User email or password not provide'));

    const newUser = await User.findOne({email}).select('+password')
    if(!newUser)return next(new UNAUTHORIZED_USER("user email or password does not match"));
    
    const isMatch = await newUser.checkPassword(password,newUser.password);
    if(!isMatch)return next(new UNAUTHORIZED_USER("user email or password does not match"));

    const token = createJWT(newUser)
    sendRes(res,200,token,newUser);
};


module.exports.protect = async (req, res, next)=>{
    //Checking that token exists
    let token;
    // req.cookie
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1];
    }

    //Verifying Token
    if(!token) return next(new UNAUTHORIZED_USER('User not logged in' ));
    const decoded = await util.promisify(jwt.verify)(token,process.env.JWT_SECRET)
    console.log(decoded)
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
        console.log(req.user)
        if(!req.user || !roles.includes(req.user.role)){
            next(new CustomAPIError("You don't have acess to performe this action\nFORBIDDEN", 403))
        }
        next();
    }
}

// module.exports.forgotPassword = catchAsync(async function (req,res,next){
//     //Get the user based on req.email
//     const user = User.findOne({email:req.body.email});
//     if(!user){
//         next(new appError('User with email does not exists',404))
//     }

//     try{
    
//         //Create a random token for user
//         const randomToken = User.createRandomToken();
//         await user.save({validateBeforeSave:false}); //saving the hashed token, token expire time in user doc


//         //send the token to user via email
//         const resetUrl = `${req.host}//${req.get('host')}/api/v1/users/reset-password/${randomToken}`
//         const msg = `Forgot your password? please make a patch request to ${resetUrl}. If didn't request by you please ignore it.`
//         await sendMail({
//             to:user.email,
//             subject:"Regarding password reset for natour.com",
//             message:msg
//         })

//         res.status(200).send({
//             status:'success',
//             message:'Please check you mail'
//         })
//     } catch(err){
//         user.passwordResetToken = undefined
//         user.passwordResetTokenExpire = undefined
        
//         await user.save({validateBeforeSave:false})
//         return next(new appError('There is an error while sending an error. Please try again later',500))
//     }
// })


// module.exports.resetPassword = catchAsync(async function (req,res,next){
//     //Get the user based on token
//     const hashedToken = crypto
//         .createHash('sha256')
//         .update(req.params.token)
//         .digest('hex')
//     const user = User.findOne({passwordResetToken:hashedToken, passwordResetTokenExpire:{$gt:Date.now()}})
    
//     //If token has not expired and there is user change the password
//     if(!user){
//         return next(new appError('The token is invalid or Expired',400))
//     }
//     user.password = req.body.password;
//     user.passwordConfirm = req.body.password;
//     user.passwordResetToken = undefined
//     user.passwordResetTokenExpire = undefined
//     await user.save({validateBeforeSave:false})

//     //update the changePasswordAt property
//     //changePasswordAt implemented in the userSchema

//     //log in the user and send jwt token
//     const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{
//         expiresIn:process.env.JWT_EXPIRE
//     })
//     sendRes(res,200,token,undefined,undefined);
// })

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
    const otpObj = await Otp.create({
        email:req.body.email,
        otp:OTP
    })
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
    console.log(otpObj, OTP)

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
module.exports.verifyAdministrator = async (req, res, next)=>{
    
}
module.exports.verifyExperts = async (req, res, next)=>{
    
}
module.exports.loginDev = async (req,res,next)=>{
    const {userId,password} = req.body
    if(!userId || !password)return next(new BAD_REQUEST('User userId or password not provide'));

    const newUser = await User.findOne({userId}).select('+password')
    if(!newUser)return next(new UNAUTHORIZED_USER("user userId or password does not match"));
    
    const isMatch = await newUser.checkPassword(password,newUser.password);
    if(!isMatch)return next(new UNAUTHORIZED_USER("user userId or password does not match"));

    const token = createJWT(newUser)
    sendRes(res,200,token,newUser);
};
