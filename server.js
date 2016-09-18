var express    = require("express");
var routesSetup = require('./config/routes')
var app = express();
var db = require('./config/db');

var morgan      = require('morgan');
app.use(morgan('dev'));

db.setupDatabase();

app.get("",function(req,res){
  res.json({"api/v0/:table_to_query" : "URL To get the data from a table","/tables": "to get the tables names","/doc/:table_to_query": "to get the fields information from a table"})
});

app.use(function (err, req, res, next) {
    if(err) {
        res.send(err.message)
    }
    next()
})

routesSetup.setupRoutesAndVersions(app);

module.exports = app

app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
