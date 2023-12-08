import { StatusCodes } from "http-status-codes";
import CustomAPIError from "./custom-api.js";

class BAD_REQUEST extends CustomAPIError{
    constructor(message){
        super(message,StatusCodes.BAD_REQUEST);
    }
};
export default BAD_REQUEST;