require("dotenv").config();

const app = require('./app')

const mongoose = require("mongoose");
const port = process.env.PORT || 8080;


const start = ()=>{
    try{
        mongoose.connect(process.env.MONGO_URL).then(()=>{
            console.log(process.env.NODE_ENV==="development"?"connected to db":undefined)
        }).catch((err)=>{
            console.log("can't connect to db\n", err.message)
        })

        app.listen(port, ()=>{
            console.log("Server has started on port "+port)
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