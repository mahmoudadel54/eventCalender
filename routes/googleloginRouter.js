const express = require('express');
const jwt = require('jsonwebtoken');
const { googleLogin } = require('../controllers/auth');

const googleRoute = express.Router();

const User = require('../models/user');

googleRoute.get('/',(req,res,next)=>{
    console.log('Success get google login')
})

googleRoute.post('/',googleLogin)

googleRoute.post('/tokenIsValid',async (req,res,next)=>{
    try{
        const token = req.header("x-auth-token");
        // console.log(token)
        if(!token) return res.json(false);

        const verified = jwt.verify(token, process.env.PRIVATE_KEY);
        if(!verified) res.json(false);

        return res.json(true);

    }catch (err) {
        res.status(500).json({error: err.message})
    }
})


module.exports = googleRoute;