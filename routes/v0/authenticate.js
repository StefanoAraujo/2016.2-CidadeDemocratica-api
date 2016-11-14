var authvalidate = require('../../config/auth-validate.js')
var express = require('express');
var router = express.Router();
var hat = require('hat')
require('../../model/user')

var mongoose = require('mongoose'),
Users = mongoose.model('User');

router.route('/authenticate')
.post(function(req,res) {
  var token = req.headers.authorization
  var pushId = req.query.pushId
  var result = false
  var find = false
  res.setHeader('Method', 'POST')
  authvalidate.isValidToken(token,function(isValid){
    result = isValid
    if(result){
      Users.findOne({token: token},{}, function (err, result) {
        result.firebaseId = pushId
        result.save(function(err) {
          if(!err) {
            res.json({error: false,
                      message: "Save firebase token: " + pushId});
          }
          else {
            res.json({error: true,
                      message:"Error: could not save firebase token"});
          }
        });
      })
    } else {
      res.json({error: 'Not allowed to request'});
    }
  });
})

router.route('/authenticate')
.get(function(req,res) {
    var token = hat()
    res.setHeader('Method', 'GET')
    Users.create({'token':token}, function (err, small) {
       console.log(small)
       return res.json({'error':err,
                        'token': token})
     });
})

module.exports = router;