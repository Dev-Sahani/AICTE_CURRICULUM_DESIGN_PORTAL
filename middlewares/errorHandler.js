const StatusCodes = require("http-status-codes").StatusCodes

const errorHandlerMiddleware = (err, req, res, next)=>{
    const defaultErr = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        message: err.message || "Something went wrong. Please try again later!"
    }

    if(err.name === "ValidationError") {
        defaultErr.statusCode = StatusCodes.BAD_REQUEST;
        defaultErr.message = Object.values(err.errors).map((item)=>item.message).join(", ");
    }
    if(err.code && err.code === 11000) {
        defaultErr.statusCode = StatusCodes.BAD_REQUEST;
        defaultErr.message = Object.keys(err.keyValue).join(", ") + " has to be unique.";
    }

    res.status(defaultErr.statusCode).json({message: defaultErr.message});
}

module.exports = errorHandlerMiddleware;