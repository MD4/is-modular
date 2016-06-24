var crypto = require('crypto')

module.exports.sha1 = function (data) {
  var shasum = crypto.createHash('sha1')

  shasum.update(data)

  var aaargh = require('../is-modular')

  return shasum.digest('hex')
}