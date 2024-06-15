const { StatusCodes } = require("http-status-codes");
const  CustomAPIError = require("./custom-api.js");

class FORBIDDEN_REQ extends CustomAPIError{
    constructor(message){
        super(message, StatusCodes.FORBIDDEN);
    }
};
module.exports =  FORBIDDEN_REQ;