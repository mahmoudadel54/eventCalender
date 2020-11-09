const userRoute = require('express').Router();
const User = require('../models/user');

userRoute.get('/',(req,res,next)=>{
    res.send('get api for user')
})

userRoute.post('/',(req,res,next)=>{
    res.send('post user')
})



module.exports = userRoute;