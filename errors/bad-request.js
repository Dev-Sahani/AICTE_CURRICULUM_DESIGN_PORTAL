const { StatusCodes } = require("http-status-codes");
const  CustomAPIError = require("./custom-api.js");

class BAD_REQUEST extends CustomAPIError{
    constructor(message){
        super(message,StatusCodes.BAD_REQUEST);
    }
};
module.exports =  BAD_REQUEST;