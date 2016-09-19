var chai = require('chai')
var expect = chai.expect // we are using the "expect" style of Chai
var sinon = require('sinon')
var environment      = require('./../../../config/environment');

describe('Environment', function() {

    it('environment property() should return the right params', function(done) {
      expect(environment.database.local.host).to.equal('localhost')
        done(null)

    })


})
