var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  token: String,
  firebaseId: String
})

mongoose.model('User', userSchema);
