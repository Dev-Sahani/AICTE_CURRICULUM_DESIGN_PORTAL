require("express-async-errors");

const express = require("express");
const morgan = require('morgan')
const app = express();

const errorHandlerMiddleware = require("./middlewares/errorHandler");
const {BAD_REQUEST} = require('./errors/index')

// Midleware :
if(process.env.NODE_ENV === 'development')
    app.use(morgan('dev'))
app.use(express.json());


// Importing Routes
const feedbackRouter = require("./routes/feedbackRoute");
const pushRouter = require('./routes/pushRoutes');
const commitRouter = require('./routes/commitRoute');

// APIs
app.use("/api/v1/feedback", feedbackRouter);
app.use('/api/v1/push',pushRouter);
app.use('/api/v1/commit',commitRouter);

app.all('*',(req,res,next)=>{
    throw new BAD_REQUEST("This route is Not defined")
})

app.use(errorHandlerMiddleware);

module.exports = app;