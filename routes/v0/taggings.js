var express = require('express');
var router = express.Router();
var db = require('../../config/db.js');


/**
 * @swagger
 * definition:
 *   Tagging:
 *     properties:
 *       id:
 *         type: integer
 *       tag_id:
 *         type: integer
 *       tagger_id:
 *         type: integer
 *       tagger_type:
 *         type: string
 *       context:
 *         type: string
 */


/**
 * @swagger
 * /taggings:
 *   get:
 *     tags:
 *       - Taggings
 *     description: Returns all taggings
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of taggings
 *         schema:
 *           $ref: '#/definitions/Tagging'
 */
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

/**
 * @swagger
 * /taggings/{tagging_id}:
 *   get:
 *     tags:
 *       - Taggings
 *     description: Returns a Tagging detail
 *     produces:
 *       - application/json
 *     parameters:
*       - name: tagging_id
*         description: Tagging's id
*         in: path
*         required: true
*         type: integer
 *     responses:
 *       200:
 *         description: A tagging detail
 *         schema:
 *           $ref: '#/definitions/Tagging'
 */
router.route('/taggings/:tagging_id')
.get(function(req,res) {
  if (isNaN(req.params.tag_id)) {
    return res.json("The param is not a number");
  }
  db.mysqlConnection.query("SELECT * FROM taggings where id="+req.params.tagging_id, function(err, rows, fields) {
    if (!err){
      res.json(rows);
    }else{
      res.send(err);
    }
    });

})

module.exports = router;
