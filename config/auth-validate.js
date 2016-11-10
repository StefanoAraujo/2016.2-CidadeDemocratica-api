require('../model/user')
var mongoose = require('mongoose'),
Users = mongoose.model('User');

exports.isValidToken = function(token, callback) {
    var result = false
    Users.find({token: token},{},function(err, results) {
      result = results.length > 0
      callback(result)
    });  
}