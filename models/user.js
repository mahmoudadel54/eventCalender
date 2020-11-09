const {Schema, model} = require('mongoose');
const bcrypt = require('bcrypt');
const {genSaltSync,hashSync} = require('bcrypt'); 

const userSchema = new Schema({
  email: { type: String, required: true ,unique:true},
  password: { type: String, required: true },
  name: { type:String, required: true }
});

userSchema.pre('save', function (next) {
  var user = this;
  if (!user.isModified('password')) return next();
  let salt = genSaltSync(10);
  let hash = hashSync(user.password, salt);
  user.password = hash;
  //console.log(user);
  next();
});

// userSchema.methods.comparePassword = function (password) {
//   return bcrypt.compareSync(password, this.password);
// };


const User = model('User', userSchema);
module.exports = User;