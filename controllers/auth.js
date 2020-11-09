const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { OAuth2Client } = require("google-auth-library");
const User = require("../models/user");

const client = new OAuth2Client(
  "320711869666-n6eps7kaesnlpssgo12m2f1kac08d9b3.apps.googleusercontent.com"
);
const googleLogin=async (req, res, next)=> {
  const { tokenId } = req.body;
  await client
    .verifyIdToken({
      idToken: tokenId,
      audience:
        "320711869666-n6eps7kaesnlpssgo12m2f1kac08d9b3.apps.googleusercontent.com",
    })
    .then(async(response) => {
      const { email_verified, name, email } = response.payload;
      if(email_verified){
      await  User.findOne({email:email},(err,user)=>{
          if(err){
            return res.json({
              error: "Something went wrong ....."
            })
            // next(err);
          }else {
            if(user){
              const token = jwt.sign({ _id: user.id }, process.env.PRIVATE_KEY, { expiresIn: "60m" });
              const {_id, name, email} = user;
              res.send({
                token,
                user: {_id, name, email},
                message:"Success"
              })
            }else{
              let password = email + process.env.PRIVATE_KEY;
              let newUser = new User({
                name,
                email,
                password
              })
              newUser.save((err,data)=>{
                if(err){
                  // next(err);
                  return res.json({
                    error: "Something went wrong ....."
                  })
                  
                }else{

                  const token = jwt.sign({ _id: data.id }, process.env.PRIVATE_KEY, { expiresIn: "60m" });
                  const {_id, name, email} = newUser;
                  res.send({
                    token,
                    user: {_id, name, email},
                    message:"Success"
                  })  
                }
              })
            }
          }
        })
      }
    });
}

module.exports = {googleLogin};
