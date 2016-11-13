var db = require('../config/db.js');
require('../model/proposal')
var mongoose = require('mongoose'),
Proposals = mongoose.model('Proposal');

var query = 'SELECT topicos.id, topicos.user_id, topicos.titulo, topicos.descricao, topicos.slug, topicos.comments_count, topicos.adesoes_count, topicos.relevancia, topicos.seguidores_count, topicos.competition_id, topicos.site, cidades.nome AS `city_name`, estados.nome AS `state_name`, estados.abrev AS `state_abrev`FROM topicos INNER JOIN locais ON topicos.type = "Proposta" AND locais.responsavel_type = "User" AND locais.responsavel_id = topicos.id INNER JOIN cidades ON cidades.id = locais.cidade_id INNER JOIN estados ON estados.id = locais.estado_id'

var exists = function(array,id){
    var result = false
    array.forEach(function(proposal){
        if(proposal.id == id){
            result = true
        }
    });
    return result
}

var createObject = function(id,title){
    var proposal = {
        'id': id,
        'title': title
    }
    return proposal
}

function favoriteUpdater() {
    console.log('Get all proposals to local DB')
    db.mysqlConnection.query(query, function(err, rows, fields) {
        Proposals.find({},{},function(err, results) {
            var allProposals = []
            rows.forEach(function(proposal){
                if(!exists(results, proposal.id)){
                    var newProposal = createObject(proposal.id, proposal.titulo)
                    allProposals.push(newProposal)
                }
            });
            if(allProposals.length > 0) {
                Proposals.create(allProposals,function (err, small) {
                    console.log('Add new ' + allProposals.length + ' proposals to database')
                });     
            }else {
                console.log('They are no new proposals to add')
            }
        }); 
    });
}

exports.favoriteUpdater = favoriteUpdater