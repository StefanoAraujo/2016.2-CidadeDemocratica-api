var express = require('express');
var authvalidate = require('../../config/auth-validate.js')
var router = express.Router();
var db = require('../../config/db.js');
require('../../model/proposal')
var mongoose = require('mongoose'),
    Proposals = mongoose.model('Proposal');

var query = 'SELECT topicos.id, topicos.user_id, topicos.titulo, topicos.descricao, topicos.slug, topicos.comments_count, topicos.adesoes_count, topicos.relevancia, topicos.seguidores_count, topicos.competition_id, topicos.site,'+ 
 + 'cidades.nome AS `city_name`, estados.nome AS `state_name`, estados.abrev AS `state_abrev`'
 + 'FROM topicos' 
 + 'INNER JOIN locais ON  locais.responsavel_id = topicos.id' 
 + 'INNER JOIN cidades ON cidades.id = locais.cidade_id' 
 + 'INNER JOIN estados ON estados.id = locais.estado_id'
 + 'where topicos.type = "Proposta" AND locais.responsavel_type = "Topico"'

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
 *         required: false
 *         type: integer
 *       - name: tag_id
 *         description: Proposals with this tag
 *         in: query
 *         required: false
 *         type: integer
 *       - name: user_id
 *         description: Proposals of this user
 *         in: query
 *         required: false
 *         type: integer
 *       - name: federal_unity_code
 *         description: Uf of an state to get just proposals of this proposal , GO, DF or something like this.
 *         in: query
 *         required: false
 *         type: string
 *       - name: Authorization
 *         description: access token user
 *         in: header
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: An array of proposals
 *         schema:
 *           $ref: '#/definitions/Proposal'
 */
router.route('/proposals')
    .get(function(req, res) {
        var token = req.headers.authorization
        var result = false
        authvalidate.isValidToken(token, function(isValid) {
            result = isValid
            if (result) {
                var newQuery = query
                var wheresCount = 0
                // console.log()

                if (req.query.federal_unity_code != null && req.query.federal_unity_code.length < 3) {
                   var UFFilterQuery = ' AND estados.abrev = "' + req.query.federal_unity_code + '"'
                    newQuery = newQuery + UFFilterQuery
                }

                if (req.query.tag_id != null && parseInt(req.query.tag_id) > 0) {
                    
                      if (wheresCount > 0) {
                        newQuery = newQuery + ' AND '
                    } else {
                        newQuery = newQuery + ' WHERE '
                    }
                    
                    var tagFilterQuery = ' topicos.id in (select taggings.taggable_id from taggings where taggings.tag_id = ' + req.query.tag_id + ") "
                    newQuery = newQuery + tagFilterQuery
                    wheresCount += 1
                }

                if (req.query.user_id != null && parseInt(req.query.user_id) > 0) {
                    if (wheresCount > 0) {
                        newQuery = newQuery + ' AND '
                    } else {
                        newQuery = newQuery + ' WHERE '
                    }

                    newQuery = newQuery + ' topicos.user_id = ' + req.query.user_id
                }
     

                var page = req.query.page
                var start = 0
                var limit = 30
                if (isNaN(page) || page == 0) {
                    newQuery = newQuery + ' ORDER BY topicos.relevancia DESC'

                } else {
                    start = (page - 1) * limit

                    var limitToQuery = ' LIMIT ' + start + ',' + limit
                    newQuery = newQuery + ' ORDER BY topicos.relevancia DESC' + limitToQuery
                }

                // console.log(newQuery);

                db.mysqlConnection.query(newQuery, function(err, rows, fields) {
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
*       - name: Authorization
*         description: access token user
*         in: header
*         required: true
*         type: string
 *     responses:
 *       200:
 *         description: A proposal detail
 *         schema:
 *           $ref: '#/definitions/Proposal'
 */
router.route('/proposals/:proposal_id')
    .get(function(req, res) {
        var token = req.headers.authorization
        var result = false
        authvalidate.isValidToken(token, function(isValid) {
            result = isValid
            if (result) {
                if (isNaN(req.params.proposal_id)) {
                    return res.json("The param is not a number");
                }
                var sqlQueryString = query + ' WHERE topicos.id = ' + req.params.proposal_id
                console.log(sqlQueryString)

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
     * /favorite_proposals:
     *   post:
     *     tags:
     *       - FavoriteProposals
     *     description: Favorite a proposals passed in query id to the user passed in the authorization
     *     parameters:
    *       - name: id
    *         description: proposal id to favorite
    *         in: query
    *         required: true
    *         type: string       
    *       - name: Authorization
    *         description: access token user
    *         in: header
    *         required: true
    *         type: string
     *     responses:
     *       200:
     *         description: Proposal favorited/unfavorited with success 
     *       403:
     *         description: invalid paramer
     */
router.route('/favorite_proposals')
    .post(function(req, res) {
        var token = req.headers.authorization
        var result = false
        var find = false
        authvalidate.isValidToken(token, function(isValid) {
            result = isValid
            if (result) {
                var id = req.query.id
                Proposals.findOne({ id: id }, {}, function(err, result) {

                    if (result != null) {
                        // console.log(result.users)
                        var message = " "
                        var users = result.users

                        if (users.length > 0) {
                            users.forEach(function(obj, index) {
                                console.log(index)
                                if (token == obj) {
                                    users.splice(index, 1);
                                    message = "Unfavorited with success"
                                    find = true
                                    return
                                }
                            })
                            if (!find) {
                                users.push(token)
                                message = "Favorited with success"
                            }
                        } else {
                            users.push(token)
                            message = "Favorited with success"
                        }
                        result.users = users
                        result.save(function(err) {
                            if (!err) {
                                console.log(result.users)
                                res.json({
                                    error: false,
                                    message: message
                                });
                            }
                            else {
                                res.json({
                                    error: true,
                                    message: "Error: could not save user to proposal listening list "
                                });
                            }
                        });
                    } else {
                        res.json({ error: 'Proposal not found with this id' });
                    }
                })
            } else {
                res.json({ error: 'Not allowed to request' });
            }
        });
    })


    /**
     * @swagger
     * /favorite_proposals:
     *   get:
     *     tags:
     *       - FavoriteProposals
     *     description: Get all propouses favorited by the user passed in the authorization
     *     parameters:  
    *       - name: Authorization
    *         description: access token user
    *         in: header
    *         required: true
    *         type: string
     *     responses:
     *       200:
     *         description: Proposals list of favorited user
     *       403:
     *         description: invalid user
     */
    .get(function(req, res) {
        var token = req.headers.authorization
        authvalidate.isValidToken(token, function(isValid) {

            if (isValid) {

                Proposals.find({ users: token }, function(err, result) {
                    if (result != null) {

                        var idsArray = result.map(function(x) {
                            return x.id
                        }).join()
                        'WHERE topicos.id'
                        var proposalsQuery = query + ' WHERE topicos.id IN (' + idsArray + ')'

                        db.mysqlConnection.query(proposalsQuery, function(err, rows, fields) {
                            if (!err) {
                                res.json(rows);
                            } else {
                                res.send(err);
                            }
                        });
                    } else {
                        res.json({ error: err });
                    }
                })
            } else {
                res.json({ error: 'Not allowed to request' });
            }
        });
    })

module.exports = router;
