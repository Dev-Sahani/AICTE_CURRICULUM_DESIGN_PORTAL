require("dotenv").config();

const app = require('./app')

const connectDB = require("./db/connect");
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