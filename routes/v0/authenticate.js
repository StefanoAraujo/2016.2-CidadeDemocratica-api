var express = require('express');
var router = express.Router();
var hat = require('hat')
require('../../model/user')

var mongoose = require('mongoose'),
Users = mongoose.model('User');

router.route('/authenticate')
.post(function(req,res) {
    var token = hat()
    var pushId = req.query.pushId
    Users.create({'token':token, 'firebaseId':pushId}, function (err, small) {
       return res.json({'error':err,
                        'token': token})
     });
})

router.route('/authenticate')
.get(function(req,res) {
   Users.find({},{_id:false, __v:false}, function (err, results) {
       return res.json(results)
   });
})

module.exports = router;