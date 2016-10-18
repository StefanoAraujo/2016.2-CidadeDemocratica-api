module.exports = {

  database: {
    local: {
      host     : 'localhost',
      user     : 'root',
      password : 'root',
      databaseName : 'cidade_democratica_integra'
    },
    dev: {
      host     : 'testcidadedemocratica.ca0jctiv4wib.sa-east-1.rds.amazonaws.com',
      user     : 'testuser',
      password : 'testuser',
      databaseName : 'dumpCidadeDemocratica'
    },
    production: {
      host     : process.env.DB_HOST,
      user     : process.env.DB_USER,
      password : process.env.DB_PASS,
      databaseName : process.env.DB_NAME
    },
    current: {
      host     : 'localhost',
      user     : 'root',
      password : 'root',
      databaseName : 'cidade_democratica_integra'
    }
  },
  server: {
    dev: {
      protocol: "http://",
      host: "localhost",
      port: 3000
    },
    stagging: {
      protocol: "http://",
      host: "cidadedemocraticaapi-stagging.herokuapp.com",
      port: 3000
    },
    production: {
      protocol: "http://",
      host: "cidadedemocraticaapi.herokuapp.com",
      port: ''
    },
    current: {
      protocol: "http://",
      host: "localhost:3000",
      port: 3000
    }
  }

}
