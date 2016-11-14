var FCM = require('fcm-node')

function pushDefaultData(firebaseId,callback){
    var FCM = require('fcm-node');

    var serverKey = 'AIzaSyBkQ4RH4h08u92vE3oruxkoCEma2BNsI5M';
    var fcm = new FCM(serverKey);

    var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
        to: firebaseId, 
        collapse_key: 'test',
        
        notification: {
            title: 'Cidade Democrática', 
            body: 'Não deixe de acompanhar a democracia na sua cidade' 
        },
    };

    fcm.send(message, function(err, response){
        if (err) {
            callback(err)
        } else {
            callback(response)
        }
    });
}

exports.pushDefaultData = pushDefaultData

