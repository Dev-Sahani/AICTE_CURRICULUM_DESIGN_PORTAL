const CustomAPIError = require("./custom-api.js");
const BAD_REQUEST = require("./bad-request.js");
const NOT_FOUND = require("./not-found.js");
const UNAUTHORIZED_USER = require("./unauthenticated.js");
const FORBIDDEN_REQ = require("./Forbidden-request.js");

module.exports = {
  CustomAPIError,
  BAD_REQUEST,
  NOT_FOUND,
  FORBIDDEN_REQ,
  UNAUTHORIZED_USER,
};
