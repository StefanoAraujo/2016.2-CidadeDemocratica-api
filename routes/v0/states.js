var express = require('express');
var authvalidate = require('../../config/auth-validate.js')
var router = express.Router();
var db = require('../../config/db.js');

/**
 * @swagger
 * definition:
 *   State:
 *     properties:
 *       state_name:
 *         type: string
 *       state_abrev:
 *         type: string
 *       proposals_count:
 *         type: integer
 *       proposals_relevance_sum:
 *         type: integer
 */

/**
 * @swagger
 * /states_proposals_count_and_relavance_sum:
 *   get:
 *     tags:
 *       - States
 *     description: Returns a proposals count and the proposals relevance sum from brazil states 
 *     produces:
 *       - application/json
 *     parameters:
*       - name: Authorization
*         description: access token user
*         in: header
*         required: true
*         type: string
 *     responses:
 *       200:
 *         description: A proposal detail
 *         schema:
 *           $ref: '#/definitions/State'
 */
router.route('/states_proposals_count_and_relavance_sum')
    .get(function(req, res) {
        var token = req.headers.authorization
        var result = false
        authvalidate.isValidToken(token, function(isValid) {
            result = isValid
            if (result) {

                var sqlQueryString = '  select sum(states.relevancia) as `proposals_relevance_sum`, states.state_abrev, COUNT(*) as proposal_count, states.state_name ' +
                                        ' from (select topicos.relevancia, estados.nome AS `state_name`, estados.abrev AS `state_abrev` FROM topicos'+ 
		                                            ' INNER JOIN locais ON locais.responsavel_id = topicos.id'+ 
		                                            ' INNER JOIN estados ON estados.id = locais.estado_id' +
	                                           ' where topicos.type = "Proposta" and locais.responsavel_type = "User" ) as states'+ 
                                        ' GROUP BY states.state_abrev ORDER BY proposals_relevance_sum DESC;'

                db.mysqlConnection.query(sqlQueryString, function(err, rows, fields) {
                    if (!err) {
                        res.json(rows);
                    } else {
                        res.send(err);
                    }
                });
            } else {
                res.json({ error: 'Not allowed to request' });
            }
        })
    })


/**
 * @swagger
 * /state_tags_and_use_count:
 *   get:
 *     tags:
 *       - States
 *     description: Returns all tags from a givin state and number of times that this tag is used
 *     produces:
 *       - application/json
 *     parameters:
*       - name: Authorization
*         description: access token user
*         in: header
*         required: true
*         type: string
*       - name: federal_unity_code
*         description: Uf of an state to get just proposals of this proposal , GO, DF or something like this.
*         in: query
*         required: true
*         type: string
 *     responses:
 *       200:
 *         description: A proposal detail
 *         schema:
 *           $ref: '#/definitions/State'
 */
router.route('/state_tags_and_use_count')
    .get(function(req, res) {
        var token = req.headers.authorization
        var result = false
        authvalidate.isValidToken(token, function(isValid) {
            result = isValid
            if (result) {

                var sqlQueryString = ' SELECT proposals.state_name, proposals.state_abrev, taggings.tag_id, COUNT(*) as tag_count, tags.name FROM'+ 
' (select taggings.taggable_id, taggings.tag_id from taggings) as taggings'+
	' inner join tags on tags.id = taggings.tag_id'+
	' inner join'+
	' (select topicos.id as proposal_id, estados.nome AS `state_name`, estados.abrev AS `state_abrev`'+ 
		' FROM topicos '+
			' INNER JOIN locais ON locais.responsavel_id = topicos.id' +
			' INNER JOIN cidades ON cidades.id = locais.cidade_id '+
			' INNER JOIN estados ON estados.id = locais.estado_id AND estados.abrev = "'+ req.query.federal_unity_code + '"' +
		' WHERE topicos.type = "Proposta"  AND locais.responsavel_type = "Topico") as proposals on proposals.proposal_id = taggings.taggable_id'+ 
' GROUP BY taggings.tag_id ORDER BY tag_count DESC;'


                db.mysqlConnection.query(sqlQueryString, function(err, rows, fields) {
                    if (!err) {
                        res.json(rows);
                    } else {
                        res.send(err);
                    }
                });
            } else {
                res.json({ error: 'Not allowed to request' });
            }
        })
    })


    /**
 * @swagger
 * /tag_use_count_by_state:
 *   get:
 *     tags:
 *       - States
 *     description: Returns all tags from a givin state and number of times that this tag is used
 *     produces:
 *       - application/json
 *     parameters:
*       - name: Authorization
*         description: access token user
*         in: header
*         required: true
*         type: string
*       - name: tag_id
*         description: tag id of tag to visualize the count by state
*         in: query
*         required: true
*         type: string
 *     responses:
 *       200:
 *         description: A proposal detail
 *         schema:
 *           $ref: '#/definitions/State'
 */
router.route('/tag_use_count_by_state')
    .get(function(req, res) {
        var token = req.headers.authorization
        var result = false
        authvalidate.isValidToken(token, function(isValid) {
            result = isValid
            if (result) {

                var sqlQueryString = ' SELECT proposals.state_name, proposals.state_abrev, taggings.tag_id, COUNT(*) as tag_count, tags.name FROM'+
' (select taggings.taggable_id, taggings.tag_id from taggings) as taggings'+
	' inner join tags on tags.id = taggings.tag_id'+
	' inner join'+
	' (select topicos.id as proposal_id, estados.nome AS `state_name`, estados.abrev AS `state_abrev`'+ 
		' FROM topicos '+
			' INNER JOIN locais ON locais.responsavel_id = topicos.id'+
			' INNER JOIN cidades ON cidades.id = locais.cidade_id'+
			' INNER JOIN estados ON estados.id = locais.estado_id'+
		' WHERE topicos.type = "Proposta"  AND locais.responsavel_type = "Topico") as proposals on proposals.proposal_id = taggings.taggable_id'+
' WHERE taggings.tag_id = "'+ req.query.tag_id + '"' +
' GROUP BY proposals.state_abrev ORDER BY tag_count DESC;'


                db.mysqlConnection.query(sqlQueryString, function(err, rows, fields) {
                    if (!err) {
                        res.json(rows);
                    } else {
                        res.send(err);
                    }
                });
            } else {
                res.json({ error: 'Not allowed to request' });
            }
        })
    })
module.exports = router;
