var express = require('express');
var router = express.Router();
var db = require('../../config/db.js');


/**
 * @swagger
 * definition:
 *   User:
 *     properties:
 *       id:
 *         type: integer
 *       user_id:
 *         type: string
 *       descricao:
 *         type: string
 *       sexo:
 *         type: string
 *       aniversario:
 *         type: string
 *       state:
 *         type: string
 *       type:
 *         type: string
 *       topicos_count:
 *         type: integer
 *       comments_count:
 *         type: integer
 *       adesoes_count:
 *         type: integer
 *       relevancia:
 *         type: integer
 *       inspirations_count:
 *         type: integer
 */


/**
 * @swagger
 * /users:
 *   get:
 *     tags:
 *       - Users
 *     description: Returns all users
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of users
 *         schema:
 *           $ref: '#/definitions/User'
 */
router.route('/users')
.get(function(req,res) {

  db.mysqlConnection.query('SELECT user_dados.nome, user_dados.descricao, user_dados.sexo, user_dados.aniversario, users.id, users.state, users.type, users.topicos_count, users.comments_count, users.adesoes_count, users.relevancia, users.inspirations_count FROM users INNER JOIN user_dados ON users.id = user_dados.user_id', function(err, rows, fields) {
    if (!err){
      res.json(rows);
    }else{
      res.send(err);
    }
    });

})


/**
 * @swagger
 * /users/{user_id}:
 *   get:
 *     tags:
 *       - Users
 *     description: Returns a User detail
 *     produces:
 *       - application/json
 *     parameters:
*       - name: user_id
*         description: User's id
*         in: path
*         required: true
*         type: integer
 *     responses:
 *       200:
 *         description: A user detail
 *         schema:
 *           $ref: '#/definitions/User'
 */
router.route('/users/:user_id')
.get(function(req,res) {
  if (isNaN(req.params.user_id)) {
    return res.json("The param is not a number");
  }
  var sqlQueryString = "SELECT user_dados.user_id, user_dados.nome, user_dados.descricao, user_dados.sexo, user_dados.aniversario, users.id, users.state, users.type, users.topicos_count, users.comments_count, users.adesoes_count, users.relevancia, users.inspirations_count FROM users INNER JOIN user_dados ON users.id = user_dados.user_id WHERE users.id = " + req.params.user_id;
  db.mysqlConnection.query(sqlQueryString, function(err, rows, fields) {
    if (!err){
      res.json(rows);
    }else{
      res.send(err);
    }
    });

})

module.exports = router;
