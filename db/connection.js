const mongoose = require('mongoose');
const express = require('express');
const app = express();

mongoose.connect(process.env.CONNECTION_DB || "mongodb://localhost:27017/calenderEvents",
     { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true },
        (err) => {
        if (err) {
            //it is for exit connection in case of error
            console.error(err)
            process.exit();
        }
        console.log("Connection successfully")
        app.listen(process.env.PORT||4000,()=>{
            console.log(`server connect on Port: ${process.env.PORT}`)
        })
    })
    
module.exports = {app}