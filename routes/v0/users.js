var express = require('express');
var router = express.Router();
var db = require('../../config/db.js');

router.route('/users')
.get(function(req,res) {

  db.mysqlConnection.query('SELECT * FROM users INNER JOIN user_dados ON users.id = user_dados.user_id', function(err, rows, fields) {
    if (!err){
      res.json(rows);
    }else{
      res.send(err);
    }
    });

})


router.route('/users/:user_id')
.get(function(req,res) {
  if (isNaN(req.params.user_id)) {
    return res.json("The param is not a number");
  }
  var sqlQueryString = "SELECT * FROM users INNER JOIN user_dados ON users.id = user_dados.user_id WHERE users.id = " + req.params.user_id;
  db.mysqlConnection.query(sqlQueryString, function(err, rows, fields) {
    if (!err){
      res.json(rows);
    }else{
      res.send(err);
    }
    });

})

module.exports = router;
