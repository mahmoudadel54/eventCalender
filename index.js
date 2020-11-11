const express = require('express')
const cors = require('cors');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');


require('dotenv').config();

const {app} = require('./db/connection')
const userRoute = require('./routes/userRouter')
const eventRoute = require('./routes/eventAPI');
const googleRoute = require('./routes/googleloginRouter');

//body parsing
app.use(express.json());
//cors to enable any one access our API
app.use(cors());

////logging 
// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })

// setup the logger
app.use(morgan('combined', { stream: accessLogStream }))

//middlewares
app.use('/api/v1/user',userRoute)
app.use('/api/v1/event',eventRoute)
app.use('/api/v1/googlelogin',googleRoute)

//Serve static assets if in production
if(process.env.NODE_ENV === 'production'){
    //Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req,res) =>{
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

// for page not found
app.use((req,res,next)=>{
    const error = new Error("Page not found")
    error.status = 404
    next(error);
})


//global error handler==> it must take 4 parameters
app.use((err,req,res,next)=>{
    if(err.status <= 500) {
        err.status=(err.status)
        return res.send(err.message)
    }
res.status(500).send("Internal Server error")
})

