var mysql      = require('mysql');
var express    = require("express");

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'cidadedemocratica'
});

var app = express();

var morgan      = require('morgan');
app.use(morgan('dev'));

connection.connect(function(err){
if(!err) {
    console.log("Database is connected ... nn");
} else {
    console.log("Error connecting database ... nn");
}
});

app.get("",function(req,res){
  res.json({"/data/:table_to_query" : "URL To get the data from a table","/doc/:table_to_query": "to get the fields information from a table"})
});

app.get("/data/:table_to_query",function(req,res){
connection.query('SELECT * from '+req.params.table_to_query, function(err, rows, fields) {
  if (!err){
    res.json(rows);
  }else{
    res.send(err);
  }
  });
});

app.get("/doc/:table_to_query",function(req,res){
connection.query('SELECT * from '+req.params.table_to_query, function(err, rows, fields) {
  if (!err){
    res.json(fields);
  }else{
    res.send(err);
  }
  });
});

app.listen(3000);
