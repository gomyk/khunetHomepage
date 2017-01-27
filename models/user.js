var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var userSchema = new Schema({
  name: String,
  id: String,
  password: String,
  admin: Boolean,
  student_id: String,
  age: Number,
  website: String
});
userSchema.methods.validPassword = function(password) {
  if(password ==this.password ){
    return true;
  }
  else{
    return false;
  }
};
module.exports = mongoose.model('User', userSchema);
