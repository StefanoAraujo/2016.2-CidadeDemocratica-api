var request = require('request');

require('../model/user')
var mongoose = require('mongoose'),
Users = mongoose.model('User');

// var sender = new gcm.Sender('cbbefc2519faf45e9895565c0466721f09aa59a0');

function pushDefaultData(callback){
   var firebaseId = ""
   Users.find({},{_id:false, __v:false}, function (err, results) {
       firebaseId = results[0].firebaseId
       // Prepare a message to be sent
        // var message = new gcm.Message({
        //     data: { key1: 'Acompanhe a democracia na sua cidade' }
        // });

        // // Specify which registration IDs to deliver the message to
        // var regTokens = [firebaseId];

        // console.log(regTokens)
        // console.log(message)

        // // Actually send the message
        // sender.send(message, { registrationTokens: regTokens }, function (err, response) {
        //     if (err){
        //         console.log(response)
        //         callback(err)
        //     }
        //     else callback(response);
        // });

        callback('Alguma coisa ai:')
   });
}

exports.pushDefaultData = pushDefaultData

