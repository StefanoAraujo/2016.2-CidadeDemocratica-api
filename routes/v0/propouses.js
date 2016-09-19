var express = require('express');
var router = express.Router();
var db = require('../../config/db.js');


/**
 * @swagger
 * definition:
 *   Propouse:
 *     properties:
 *       type:
 *         type: string
 *       id:
 *         type: string
 *       age:
 *         type: integer
 *       sex:
 *         type: string
 */
/**
 * @swagger
 * /api/v0/propouses:
 *   get:
 *     tags:
 *       - Propouses
 *     description: Returns all propouses
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of propouses
 *         schema:
 *           $ref: '#/definitions/Propouse'
 */
router.route('/propouses')
.get(function(req,res) {

  db.mysqlConnection.query('SELECT * FROM topicos WHERE type = "Proposta"', function(err, rows, fields) {
    if (!err){
      res.json(rows);
    }else{
      res.send(err);
    }
    });

})


router.route('/propouses/:propouse_id')
.get(function(req,res) {
  if (isNaN(req.params.propouse_id)) {
    return res.json("The param is not a number");
  }
  var sqlQueryString = "SELECT * FROM topicos WHERE id="+req.params.propouse_id+ ' AND type = "Proposta"'
  db.mysqlConnection.query(sqlQueryString, function(err, rows, fields) {
    if (!err){
      res.json(rows);
    }else{
      res.send(err);
    }
    });

})

module.exports = router;
