require("express-async-errors");
require("dotenv").config();

const express = require("express");
const app = express();
const connectDB = require("./db/connect");
const errorHandlerMiddleware = require("./middlewares/errorHandler");



app.use(errorHandlerMiddleware);

const port = process.env.PORT || 8080;

const start = ()=>{
    try{
        connectDB(process.env.MONGO_URL)

        app.listen(port, ()=>{
            console.log("Server has started!")
        });
    } catch(err) {
        console.log(
            "Cannot Start Server\n", 
            "ERROR ----------------------------------------------\n", 
            err.message,
            "\n----------------------------------------------------"
        );
    }
}

start();