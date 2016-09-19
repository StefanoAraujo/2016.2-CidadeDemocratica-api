
exports.setup = function(app,express) {

  var path = require('path');
  var environment      = require('./environment');

  var swaggerJSDoc = require('swagger-jsdoc');

  // swagger definition
  var swaggerDefinition = {
    info: {
      title: 'Node Swagger API',
      version: '0',
      description: 'Demonstrating how to describe a RESTful API with Swagger',
    },
    host: environment.server.current.host+':'+environment.server.current.port,
    basePath: '/api/v0'
  };

  // options for the swagger docs
  var options = {
    // import swaggerDefinitions
    swaggerDefinition: swaggerDefinition,
    // path to the API docs
    apis: ['./routes/v0/*.js'],
  };

  // initialize swagger-jsdoc
  var swaggerSpec = swaggerJSDoc(options);

  // serve swagger
  app.get('/swagger.json', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });

  // view engine setup
  app.set('views', path.join('./', 'views'));
  app.set('view engine', 'jade');
  app.use(express.static(path.join('./', 'public')));

}
