var express = require('express');
var authvalidate = require('../../config/auth-validate.js')
var router = express.Router();
var db = require('../../config/db.js');

var query = ' SELECT user_dados.nome, user_dados.descricao, user_dados.sexo, user_dados.aniversario, users.id, users.state, users.type, users.topicos_count, users.comments_count, users.adesoes_count, users.relevancia, users.inspirations_count, cidades.nome AS `city_name`, estados.nome AS `state_name`, estados.abrev AS `state_abrev`'+
            ' FROM users' +
	              ' INNER JOIN locais ON  locais.responsavel_id = users.id' +
	              ' INNER JOIN user_dados ON users.id = user_dados.user_id' +
	              ' INNER JOIN cidades ON cidades.id = locais.cidade_id '+
	              ' INNER JOIN estados ON estados.id = locais.estado_id' +
            ' WHERE locais.responsavel_type = "User" '


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
 *     parameters:
 *       - name: page
 *         description: Page of users , 30 by page
 *         in: query
 *         required: false
 *         type: integer
 *       - name: Authorization
 *         description: access token user
 *         in: header
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: An array of users
 *         schema:
 *           $ref: '#/definitions/User'
 */
router.route('/users')
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
        var newQuery = query + ' ORDER BY users.relevancia DESC'
      } else {
        start = (page - 1) * limit

        var limitToQuery = ' LIMIT ' + start + ',' + limit
        var newQuery = query + ' ORDER BY users.relevancia DESC' + limitToQuery
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
*         required: false
*         type: integer
*       - name: Authorization
*         description: access token user
*         in: header
*         required: true
*         type: string
 *     responses:
 *       200:
 *         description: A user detail
 *         schema:
 *           $ref: '#/definitions/User'
 */
router.route('/users/:user_id')
.get(function(req,res) {
  var token = req.headers.authorization
  var result = false
  authvalidate.isValidToken(token,function(isValid){
    result = isValid
    if(result){
      if (isNaN(req.params.user_id)) {
        return res.json("The param is not a number");
      }
      var sqlQueryString = query + ' WHERE users.id = ' + req.params.user_id;
      db.mysqlConnection.query(sqlQueryString, function(err, rows, fields) {
        if (!err){
          res.json(rows);
        } else {
          res.send(err);
        }
      });
    } else {
      res.json({error: 'Not allowed to request'});
    }
  })
})

module.exports = router;
