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
 *     parameters:
*       - name: proposal_id
*         description: Id of a proposal tagged
*         in: query
*         required: false
*         type: integer
*       - name: user_id
*         description: Id of a user tagger
*         in: query
*         required: false
*         type: integer
 *     responses:
 *       200:
 *         description: An array of taggings
 *         schema:
 *           $ref: '#/definitions/Tagging'
 */
router.route('/taggings')
.get(function(req,res) {

  var query =  'SELECT * FROM taggings'

  if (req.query.proposal_id != null) {
    if (isNaN(req.query.proposal_id)) {
      return res.json("The proposal_id param is not a number");
    } else {
      query = query + ' WHERE taggable_id = ' + req.query.proposal_id
    }
  }

  if (req.query.user_id != null) {

    if (isNaN(req.query.user_id)) {
      return res.json("The user_id param is not a number");
    } else {
      query = query + ' WHERE tagger_id = ' + req.query.user_id
    }
  }

  db.mysqlConnection.query(query, function(err, rows, fields) {
    if (!err){
      res.json(rows);
    }else{
      res.send(err);
    }
    });

})

/**
 * @swagger
 * /taggings/{tag_id}:
 *   get:
 *     tags:
 *       - Taggings
 *     description: Returns a Tagging detail
 *     produces:
 *       - application/json
 *     parameters:
*       - name: tag_id
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
router.route('/taggings/:tag_id')
.get(function(req,res) {
  if (isNaN(req.params.tag_id)) {
    return res.json("The param is not a number");
  }

  db.mysqlConnection.query("SELECT * FROM taggings where tag_id="+req.params.tag_id, function(err, rows, fields) {
    if (!err){
      res.json(rows);
    }else{
      res.send(err);
    }
    });

})

module.exports = router;
