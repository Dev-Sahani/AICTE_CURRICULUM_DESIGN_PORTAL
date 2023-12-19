require("express-async-errors");

const express = require("express");
const morgan = require('morgan')
const cors = require('cors')
const app = express();
const rateLimit = require('express-rate-limit');
const helmet = require('helmet')
const mongoSanitize = require('express-mongo-sanitize')
const xssClean = require('xss-clean')
const hpp = require('hpp');

const errorHandlerMiddleware = require("./middlewares/errorHandler");
const {BAD_REQUEST} = require('./errors/index')

// Midleware :
if(process.env.NODE_ENV === 'development')
    app.use(morgan('dev'))
app.use(express.json({limit:'10kb'}));
app.use(cors())
//Secure Header
app.use(helmet());
//Mongo db sanitization
app.use(mongoSanitize())
//xss-
app.use(xssClean())
//http parameter pollution security
app.use(hpp({
    whitelist:[     //list of parameter not to be included in pollution
        'duration',
        "price",
        "ratingsAverage",
        "ratingsQuantity",
        "difficulty",
        "maxGroupSize"
    ]
}))

//Limit the number of requests from 1 IP address
const limiter = rateLimit({
    max:100,    //Max numbers of request can be made by same IP
    windowMs: 1000*60*60, //time period (in ms) for limiting the request
    message:"Too much request from this IP please try again later"
})
//using rate limiter only on '/api' otherwise other routes will also be blocked
app.use('/api',limiter)



// Importing Routes
const feedbackRouter = require("./routes/feedbackRoute");
const pushRouter = require('./routes/pushRoutes');
const commitRouter = require('./routes/commitRoute');
const otherCurriculumRouter = require("./routes/otherCurriculumsRoute");
const courseRouter = require("./routes/courseRoute");
const resourceRouter = require("./routes/resourcesRoute");
const userRouter = require('./routes/userRoute')
const authRouter = require('./routes/authRoute')

// APIs
app.use("/api/v1/feedback", feedbackRouter);
app.use('/api/v1/push',pushRouter);
app.use('/api/v1/commit',commitRouter);
app.use('/api/v1/explore', otherCurriculumRouter)
app.use('/api/v1/courses',courseRouter)
app.use('/api/v1/resources',resourceRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/auth',authRouter)

app.all('*',(req,res,next)=>{
    throw new BAD_REQUEST("This route is Not defined")
})

app.use(errorHandlerMiddleware);

module.exports = app;