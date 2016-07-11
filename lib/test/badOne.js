var crypto = require('crypto')

module.exports.sha1 = function (data) {
  var shasum = crypto.createHash('sha1')
  var test = '/is-modular'

  shasum.update(data)

  var aaargh = require('../is-modular')
  var aaargh3 = require("../is-modular")
  var aaargh4 = require('..' + test)

  return shasum.digest('hex')
}