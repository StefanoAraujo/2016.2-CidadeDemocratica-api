var express = require('express');
var router = express.Router();
var db = require('../../config/db.js');

router.route('/taggings')
.get(function(req,res) {

  db.mysqlConnection.query('SELECT * FROM taggings', function(err, rows, fields) {
    if (!err){
      res.json(rows);
    }else{
      res.send(err);
    }
    });

})


router.route('/taggings/:tag_id')
.get(function(req,res) {
  if (isNaN(req.params.tag_id)) {
    return res.json("The param is not a number");
  }
  db.mysqlConnection.query("SELECT * FROM tags where id="+req.params.tag_id, function(err, rows, fields) {
    if (!err){
      res.json(rows);
    }else{
      res.send(err);
    }
    });

})

module.exports = router;
