const { StatusCodes }  = require("http-status-codes");
const CustomAPIError = require("./custom-api.js");

class UNAUTHORIZED_USER extends CustomAPIError{
    constructor(message){
        super(message, StatusCodes.UNAUTHORIZED);
    }
};
module.exports = UNAUTHORIZED_USER;