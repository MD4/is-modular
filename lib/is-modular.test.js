require('chai').should()

var isModular = require('./is-modular')

describe('is-modular', function () {

  describe('test passed', function () {
    var callbackResults;

    beforeEach(function (done) {
      isModular([ 'lib/test/goodOne.js' ], function (err, results) {
        callbackResults = { err: err, results: results }
        done()
      })
    });

    it('should pass when code is modular', function () {
      callbackResults.should.have.property('err').to.be.null
      callbackResults.results.should.have.lengthOf(1)
    })
  })

  describe('test failed', function () {
    var callbackResults;

    beforeEach(function (done) {
      isModular([ 'lib/test/badOne.js' ], function (err, results) {
        callbackResults = { err: err, results: results }
        done()
      })
    });

    it('should fail when code is not modular', function () {
      callbackResults.should.have.property('err').to.be.null
      callbackResults.results.should.have.lengthOf(1)
      callbackResults.results[ 0 ].modular.should.be.equals(false)
      callbackResults.results[ 0 ].errors.should.have.lengthOf(4)
    })
  })

  describe('test failed with multiple file', function () {
    var callbackResults;

    beforeEach(function (done) {
      isModular([ 'lib/test/**/*.js' ], function (err, results) {
        callbackResults = { err: err, results: results }
        done()
      })
    });

    it('should fail when code is not modular', function () {
      callbackResults.should.have.property('err').to.be.null
      callbackResults.results.should.have.lengthOf(2)
      callbackResults.results[ 0 ].modular.should.be.equals(false)
      callbackResults.results[ 0 ].errors.should.have.lengthOf(4)
      callbackResults.results[ 1 ].modular.should.be.equals(true)
      callbackResults.results[ 1 ].errors.should.have.lengthOf(0)
    })
  })

  describe('test failed when pattern is incorrect', function () {
    var callbackResults;

    beforeEach(function (done) {
      isModular(['.'], function (err, results) {
        callbackResults = { err: err, results: results }
        done()
      })
    });

    it('should fail when code is not modular', function () {
      callbackResults.should.have.property('err').to.be.not.null
    })
  })

})