var express = require('express');
var router = express.Router();
var pushModule = require('../../modules/push.js')

router.route('/push')
.get(function(req,res) {
  pushModule.pushDefaultData(function(result){
      res.json({'message':result})
  })
})

module.exports = router;
