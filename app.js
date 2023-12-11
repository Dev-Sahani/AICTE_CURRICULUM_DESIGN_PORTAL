require("express-async-errors");

const express = require("express");
const app = express();


// Middlewares :
const errorHandlerMiddleware = require("./middlewares/errorHandler");


// Libraries :
app.use(express.json());


// Importing Routes
const feedbackRouter = require("./routes/feedbackRoute");
const otherCurriculumRouter = require("./routes/otherCurriculumsRoute");


// APIs
app.use("/api/v1/feedback", feedbackRouter);
app.use('/api/v1/explore', otherCurriculumRouter)


app.all('*',(req,res,next)=>{})

app.use(errorHandlerMiddleware);

module.exports = app;