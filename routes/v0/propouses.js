var express = require('express');
var router = express.Router();
var db = require('../../config/db.js');


/**
 * @swagger
 * definition:
 *   Propouse:
 *     properties:
 *       id:
 *         type: integer
 *       type:
 *         type: string
 *       user_id:
 *         type: integer
 *       titulo:
 *         type: string
 *       descricao:
 *         type: string
 *       complementar:
 *         type: string
 *       parent_id:
 *         type: integer
 *       slug:
 *         type: string
 *       created_at:
 *         type: string
 *       updated_at:
 *         type: string
 *       comments_count:
 *         type: integer
 *       adesoes_count:
 *         type: integer
 *       relevancia:
 *         type: integer
 *       seguidores_count:
 *         type: integer
 *       site:
 *         type: string
 *       competition_id:
 *         type: integer
 */


/**
 * @swagger
 * /propouses:
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


/**
 * @swagger
 * /propouses/{propouse_id}:
 *   get:
 *     tags:
 *       - Propouses
 *     description: Returns a propouse detail
 *     produces:
 *       - application/json
 *     parameters:
*       - name: propouse_id
*         description: Propouse's id
*         in: path
*         required: true
*         type: integer
 *     responses:
 *       200:
 *         description: A propouse detail
 *         schema:
 *           $ref: '#/definitions/Propouse'
 */
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
