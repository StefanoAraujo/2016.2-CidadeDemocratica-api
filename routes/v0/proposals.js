var express = require('express');
var router = express.Router();
var db = require('../../config/db.js');

var query = 'SELECT topicos.id, topicos.user_id, topicos.titulo, topicos.descricao, topicos.slug, topicos.comments_count, topicos.adesoes_count, topicos.relevancia, topicos.seguidores_count, topicos.competition_id, topicos.slug, topicos.site, cidades.nome AS `city_name`, estados.nome AS `state_name`, estados.abrev AS `state_abrev`FROM topicos INNER JOIN locais ON topicos.type = "Proposta" AND locais.responsavel_type = "User" AND locais.responsavel_id = topicos.id INNER JOIN cidades ON cidades.id = locais.cidade_id INNER JOIN estados ON estados.id = locais.estado_id'

/**
 * @swagger
 * definition:
 *   Proposal:
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
 * /proposals:
 *   get:
 *     tags:
 *       - Proposals
 *     description: Returns all proposals
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: page
 *         description: Page of proposals , 30 by page
 *         in: query
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: An array of proposals
 *         schema:
 *           $ref: '#/definitions/Proposal'
 */
router.route('/proposals')
.get(function(req,res) {
    var page = req.query.page
    var start = 0
    var limit = 30

    if(isNaN(page) || page == 0){
      return res.json({"Error":"The param is not a number or a valid number"});
    }
    if(page == 1)
      start = 0
    else
      start = page * limit

    var limitToQuery = ' LIMIT ' + start + ',' + limit
    var newQuery = query + ' ORDER BY topicos.relevancia DESC' + limitToQuery
    db.mysqlConnection.query(newQuery, function(err, rows, fields) {
      if (!err){
        res.json(rows);
      }else{
        res.send(err);
      }
    });
})

/**
 * @swagger
 * /proposals/{proposal_id}:
 *   get:
 *     tags:
 *       - Proposals
 *     description: Returns a proposal detail
 *     produces:
 *       - application/json
 *     parameters:
*       - name: proposal_id
*         description: Proposal's id
*         in: path
*         required: true
*         type: integer
 *     responses:
 *       200:
 *         description: A proposal detail
 *         schema:
 *           $ref: '#/definitions/Proposal'
 */
router.route('/proposals/:proposal_id')
.get(function(req,res) {

  if (isNaN(req.params.proposal_id)) {
    return res.json("The param is not a number");
  }
  var sqlQueryString = query + ' WHERE topicos.id = ' + req.params.proposal_id
  console.log(sqlQueryString)

  db.mysqlConnection.query(sqlQueryString, function(err, rows, fields) {
    if (!err){
      res.json(rows);
    }else{
      res.send(err);
    }
    });

})

module.exports = router;
