require("express-async-errors");

const express = require("express");
const app = express();


// Middlewares :
const errorHandlerMiddleware = require("./middlewares/errorHandler");

// Libraries :
app.use(express.json());

// Importing Routes
const feedbackRouter = require("./routes/feedbackRoute");

// APIs
app.use("/api/v1/feedback", feedbackRouter);


app.use(errorHandlerMiddleware);

module.exports = app;