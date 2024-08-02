require("express-async-errors");

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xssClean = require("xss-clean");
const hpp = require("hpp");
const cookieParser = require("cookie-parser");
const path = require("path");

const errorHandlerMiddleware = require("./middlewares/errorHandler");
const { BAD_REQUEST } = require("./errors/index");

// Midleware :
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));
app.use(express.json({ limit: "1mb" }));
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(cookieParser());
//Secure Header
// app.use(helmet.contentSecurityPolicy({
//     useDefaults: true,
//     directives: {
//       "img-src": ["'self'", "https: data:"]
//     }
//   })
// );
//Mongo db sanitization
app.use(mongoSanitize());
//xss-
app.use(xssClean());
//http parameter pollution security
app.use(
  hpp({
    whitelist: [
      //list of parameter not to be included in pollution
      "duration",
      "price",
      "ratingsAverage",
      "ratingsQuantity",
      "difficulty",
      "maxGroupSize",
    ],
  })
);

//Limit the number of requests from 1 IP address
const limiter = rateLimit({
  max: 1000, //Max numbers of request can be made by same IP
  windowMs: 1000 * 60 * 60, //time period (in ms) for limiting the request
  message: "Too much request from this IP please try again later",
});
//using rate limiter only on '/api' otherwise other routes will also be blocked
app.use("/api", limiter);

// Importing Routes
const feedbackRouter = require("./routes/feedbackRoute");
const commitRouter = require("./routes/commitRoute");
const otherCurriculumRouter = require("./routes/otherCurriculumsRoute");
const courseRouter = require("./routes/courseRoute");
const resourceRouter = require("./routes/resourcesRoute");
const userRouter = require("./routes/userRoute");
const authRouter = require("./routes/authRoute");
const subjectRouter = require("./routes/subjectRoute");
const notificationRouter = require("./routes/notificationRoute");

const authController = require("./controllers/authController");

// API routes
const apiRouter = new express.Router();
app.use("/api/v1/", apiRouter);

apiRouter.use("/feedback", feedbackRouter);
apiRouter.use("/commit", authController.protect, commitRouter);
apiRouter.use("/explore", otherCurriculumRouter);
apiRouter.use("/courses", courseRouter);
apiRouter.use("/resources", resourceRouter);
apiRouter.use("/users", authController.protect, userRouter);
apiRouter.use("/notification", notificationRouter);
apiRouter.use("/auth", authRouter);
apiRouter.use("/subjects", subjectRouter);

// Undefined Routes
apiRouter.all("*", (req, res) => {
  throw new BAD_REQUEST("This route doesn't exits");
});

app.use(errorHandlerMiddleware);

// Serving Frontend files
// const __dirname = path.dirname(__filename);
app.use(express.static(path.resolve(__dirname, "./client/build")));

app.all("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

module.exports = app;
