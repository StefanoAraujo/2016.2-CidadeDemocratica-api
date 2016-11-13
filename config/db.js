var favorites = require('../modules/favorites.js')
var mysql      = require('mysql');
var environment      = require('./environment');

var connection = mysql.createConnection({
  host     : environment.database.current.host,
  user     : environment.database.current.user,
  password : environment.database.current.password,
  database : environment.database.current.databaseName
});

function setupDatabase(){
  connection.connect(function(err){
    if(!err) {
      console.log("Database is connected ... nn");
      favorites.favoriteUpdater()
    } else {
      console.log("Error connecting database ... nn" + err);
    }
  });

}

exports.setupDatabase = setupDatabase

exports.mysqlConnection = connection
