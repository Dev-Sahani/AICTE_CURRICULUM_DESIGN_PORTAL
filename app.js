const express = require("express");
require("express-async-errors");
const errorHandlerMiddleware = require("./middlewares/errorHandler");

const app = express();


app.use(errorHandlerMiddleware);

module.exports = app;