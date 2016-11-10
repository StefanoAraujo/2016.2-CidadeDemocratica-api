var express = require('express');
var authvalidate = require('../../config/auth-validate.js')
var router = express.Router();
var db = require('../../config/db.js');

var query = 'SELECT * FROM tags '

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
 *     parameters:
 *       - name: page
 *         description: Page of proposals , 30 by page
 *         in: query
 *         required: false
 *         type: integer
 *     responses:
 *       200:
 *         description: An array of tags
 *         schema:
 *           $ref: '#/definitions/Tag'
 */
router.route('/tags')
.get(function(req,res) {  
  var token = req.headers.authorization
  var result = false
  authvalidate.isValidToken(token,function(isValid){
    result = isValid
    if(result){
      var page = req.query.page
      var start = 0
      var limit = 30

      if(isNaN(page) || page == 0){
        var newQuery = query + ' ORDER BY tags.relevancia DESC'

      } else {
        start = (page - 1) * limit

        var limitToQuery = ' LIMIT ' + start + ',' + limit
        var newQuery = query + ' ORDER BY tags.relevancia DESC' + limitToQuery
      }

      db.mysqlConnection.query(newQuery, function(err, rows, fields) {
        if (!err){
          res.json(rows);
        }else{
          res.send(err);
        }
        });
    } else {
      res.json({error: 'Not allowed to request'});
    }
  })
  
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
  var token = req.headers.authorization
  var result = false
  authvalidate.isValidToken(token,function(isValid){
    result = isValid
    if(result){
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
    } else {
      res.json({error: 'Not allowed to request'});
    }
  })
})

module.exports = router;
