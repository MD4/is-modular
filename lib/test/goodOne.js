var crypto = require('crypto')

module.exports.sha1 = function (data) {
  var shasum = crypto.createHash('sha1')

  shasum.update(data)

  return shasum.digest('hex')
}