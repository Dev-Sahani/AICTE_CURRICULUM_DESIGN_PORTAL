require("express-async-errors");

const express = require("express");
const morgan = require('morgan')
const cors = require('cors')
const app = express();

const errorHandlerMiddleware = require("./middlewares/errorHandler");
const {BAD_REQUEST} = require('./errors/index')

// Midleware :
if(process.env.NODE_ENV === 'development')
    app.use(morgan('dev'))
app.use(express.json());
app.use(cors())


// Importing Routes
const feedbackRouter = require("./routes/feedbackRoute");
const pushRouter = require('./routes/pushRoutes');
const commitRouter = require('./routes/commitRoute');
const otherCurriculumRouter = require("./routes/otherCurriculumsRoute");
const courseRouter = require("./routes/courseRoute");
const userRouter = require('./routes/userRoute')
const authRouter = require('./routes/authRoute')
// APIs
app.use("/api/v1/feedback", feedbackRouter);
app.use('/api/v1/push',pushRouter);
app.use('/api/v1/commit',commitRouter);
app.use('/api/v1/explore', otherCurriculumRouter)
app.use('/api/v1/courses',courseRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/auth',authRouter)

app.all('*',(req,res,next)=>{
    throw new BAD_REQUEST("This route is Not defined")
})

app.use(errorHandlerMiddleware);

module.exports = app;