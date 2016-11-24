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
 * /states:
 *   get:
 *     tags:
 *       - States
 *     description: Returns a state information data
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
router.route('/states')
    .get(function(req, res) {
        var token = req.headers.authorization
        var result = false
        authvalidate.isValidToken(token, function(isValid) {
            result = isValid
            if (result) {

                var sqlQueryString = 'select sum(states.relevancia) as `proposals_relevance_sum`, states.state_abrev, COUNT(*) as proposal_count, states.state_name from (select topicos.relevancia, estados.nome AS `state_name`, estados.abrev AS `state_abrev` FROM topicos INNER JOIN locais ON topicos.type = "Proposta" AND locais.responsavel_type = "User" AND locais.responsavel_id = topicos.id INNER JOIN cidades ON cidades.id = locais.cidade_id INNER JOIN estados ON estados.id = locais.estado_id) as states GROUP BY states.state_abrev ORDER BY proposals_relevance_sum DESC;'

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
