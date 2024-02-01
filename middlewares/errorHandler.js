const StatusCodes = require("http-status-codes").StatusCodes

const errorHandlerMiddleware = (err, req, res, next)=>{
    const defaultErr = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        message: err.message || "Something went wrong. Please try again later!"
    }
    const isDev = (process.env.NODE_ENV === 'development')
    
    if(err.name === "ValidationError") {
        defaultErr.statusCode = StatusCodes.BAD_REQUEST;
        defaultErr.message = Object.values(err.errors).map((item)=>item.message).join(", ");
    }
    if(err.code && err.code === 11000) {
        defaultErr.statusCode = StatusCodes.BAD_REQUEST;
        // defaultErr.message = Object.keys(err.keyValue).join(", ") + " has to be unique.";
        defaultErr.message = "Validation Error";
    }
    if(isDev){
        defaultErr.stack = err.stack
        defaultErr.error = err;
        console.log(err)
    }
    // Required or Not ?
    // if(err.name == "CastError"){
    //     defaultErr.statusCode = StatusCodes.BAD_REQUEST
    //     defaultErr.message = `Invalid ${err.path} : ${err.value}`
    // }
    // if(err.name == 'JsonWebTokenError'){
    //     defaultErr.statusCode = StatusCodes.UNAUTHORIZED
    //     defaultErr.message = 'Invalid Token! Please log in again'
    // }
    // if(err.name == 'TokenExpiredError'){
    //     defaultErr.statusCode = StatusCodes.UNAUTHORIZED
    //     defaultErr.message = 'Your Token has Expired! Please log in again'
    // }

    res.status(defaultErr.statusCode).json({status:"fail",message: defaultErr.message});
}

module.exports = errorHandlerMiddleware;