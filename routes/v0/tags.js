var express = require('express');
var router = express.Router();
var db = require('../../config/db.js');


/**
 * @swagger
 * definition:
 *   Tag:
 *     properties:
 *       id:
 *         type: integer
 *       name:
 *         type: string
 *       relevancia:
 *         type: integer
 */


/**
 * @swagger
 * /tags:
 *   get:
 *     tags:
 *       - Tags
 *     description: Returns all tags
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of tags
 *         schema:
 *           $ref: '#/definitions/Tag'
 */
router.route('/tags')
.get(function(req,res) {

  db.mysqlConnection.query('SELECT * FROM tags', function(err, rows, fields) {
    if (!err){
      res.json(rows);
    }else{
      res.send(err);
    }
    });

})


/**
 * @swagger
 * /tags/{tag_id}:
 *   get:
 *     tags:
 *       - Tags
 *     description: Returns a Tag detail
 *     produces:
 *       - application/json
 *     parameters:
*       - name: tag_id
*         description: Tag's id
*         in: path
*         required: true
*         type: integer
 *     responses:
 *       200:
 *         description: A tag detail
 *         schema:
 *           $ref: '#/definitions/Tag'
 */
router.route('/tags/:tag_id')
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
