require("express-async-errors");
const express = require("express");
const errorHandlerMiddleware = require("./middlewares/errorHandler");

const app = express();

app.use('/api/v1/',)

app.all('*',(req,res,next)=>{})

app.use(errorHandlerMiddleware);

module.exports = app;