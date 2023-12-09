const CustomAPIError = require("./custom-api.js");
const BAD_REQUEST = require("./bad-request.js");
const NOT_FOUND = require("./not-found.js");
const UNAUTHORIZED_USER = require("./unauthenticated.js");

module.exports = {
    CustomAPIError,
    BAD_REQUEST,
    NOT_FOUND,
    UNAUTHORIZED_USER,
}