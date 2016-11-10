var express = require('express');
var router = express.Router();
var hat = require('hat')
require('../../model/user')

var mongoose = require('mongoose'),
Users = mongoose.model('User');

router.route('/authenticate')
.post(function(req,res) {
    var token = hat()
   Users.create({'token':token}, function (err, small) {
       return res.json({'error':err,
                        'token': token})
   });
})

router.route('/authenticate')
.get(function(req,res) {
    var token = req.query.token
   Users.find({token: token},{_id:false, __v:false}, function (err, results) {
       return res.json(results)
   });
})

module.exports = router;