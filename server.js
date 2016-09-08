var mysql      = require('mysql');
var express    = require("express");

var connection = mysql.createConnection({
  host     : 'testcidadedemocratica.ca0jctiv4wib.sa-east-1.rds.amazonaws.com',
  user     : 'testuser',
  password : 'testuser',
  database : 'dumpCidadeDemocratica'
});

var app = express();

var morgan      = require('morgan');
app.use(morgan('dev'));

connection.connect(function(err){
if(!err) {
    console.log("Database is connected ... nn");
    // processSQLFile("DUMP.sql")
} else {
    console.log("Error connecting database ... nn" + err);
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

function processSQLFile(fileName) {
  // var schedule = require('node-schedule');
  // var rule = new schedule.RecurrenceRule();
  // rule.hour = 48;
  //
  // var j = schedule.scheduleJob(rule, function(){
  //   console.log('Loading new database');
  // });

  var exec = require('child_process').exec;
  var cmd = 'mysql -h testcidadedemocratica.ca0jctiv4wib.sa-east-1.rds.amazonaws.com -u testuser -ptestuser dumpCidadeDemocratica < '+fileName+' > output.log';

  exec(cmd, function(error, stdout, stderr) {
    // command output is in stdout
    console.log("Database populated")
    // console.log(stoud)
    // console.log(sderr)
  });
}

app.listen(3000,function() {
  console.log('Now is running on port 3000');
});
