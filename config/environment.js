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
      host     : 'testcidadedemocratica.ca0jctiv4wib.sa-east-1.rds.amazonaws.com',
      user     : 'testuser',
      password : 'testuser',
      databaseName : 'dumpCidadeDemocratica'
    }
  },
  server: {
    dev: {
      protocol: "http://",
      host: "localhost",
      port: 8080
    },
    production: {
      protocol: "http://",
      host: "cidadedemocratica.herokuapp.com",
      port: 8080
    }
  }

}
