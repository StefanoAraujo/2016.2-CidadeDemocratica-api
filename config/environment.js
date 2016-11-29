function databaseHost() {
  switch (process.env.NODE_ENV) {

      case 'development':
        return {
          host     : 'localhost',
          user     : 'root',
          password : 'root',
          databaseName : 'cidade_democratica_integra'
        }
        // return {
        //   host     : 'testcidadedemocratica.ca0jctiv4wib.sa-east-1.rds.amazonaws.com',
        //   user     : 'testuser',
        //   password : 'testuser',
        //   databaseName : 'dumpCidadeDemocratica'
        // 

      case 'production':

        return {
          host     : process.env.DB_HOST,
          user     : process.env.DB_USER,
          password : process.env.DB_PASS,
          databaseName : process.env.DB_NAME
        }

      case 'test':

        return {
          host     : 'testcidadedemocratica.ca0jctiv4wib.sa-east-1.rds.amazonaws.com',
          user     : 'testuser',
          password : 'testuser',
          databaseName : 'dumpCidadeDemocratica'
        }

      default :
        return ''
  }
  return process.env.NODE_ENV
}

function serverProtocolAndHost() {
  switch (process.env.NODE_ENV) {
      case 'development':
        return {
          protocol: "http://",
          host: "localhost",
          port: ':3000'
        }
      case 'production':
        return  {
          protocol: "http://",
          host: "cidadedemocraticaapi.herokuapp.com",
          port: ''
        }
      case 'test':
        return {
          protocol: "http://",
          host: "cidadedemocraticaapi-stagging.herokuapp.com",
          port: ''
        }
      default :
        return ''
  }
  return process.env.NODE_ENV
}

function serverMongoURI() {
  switch (process.env.NODE_ENV) {
      case 'development':
        return {
          uri     : 'mongodb://localhost/cidade_gpp',
        }
      case 'production':
        return {
          uri     : process.env.MONGO_DB,
        }
      default :
        return ''
  }
  return process.env.NODE_ENV
}

module.exports = {
  database: {
    current: databaseHost()
  },
  server: {
    current: serverProtocolAndHost()
  },
  mongo_uri: {
    current: serverMongoURI()
  }
}
