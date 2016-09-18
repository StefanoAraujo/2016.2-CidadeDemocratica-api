
var mysql      = require('mysql');
var environment      = require('./environment');

var connection = mysql.createConnection({
  host     : environment.database.local.host,
  user     : environment.database.local.user,
  password : environment.database.local.password,
  database : environment.database.local.databaseName
});

function setupDatabase(){

  connection.connect(function(err){
    if(!err) {
      console.log("Database is connected ... nn");
      // processSQLFile("DUMP.sql")
    } else {
      console.log("Error connecting database ... nn" + err);
    }
  });

}

exports.setupDatabase = setupDatabase

exports.mysqlConnection = connection
