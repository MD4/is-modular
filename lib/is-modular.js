var glob = require('glob');
var async = require('async');
var fs = require('fs');

require('colour');

module.exports = _main;

function _main(patterns, callback) {
  async.parallel(
    patterns.map(_GlobHandler),
    function (err, filenames) {
      if (err) {
        callback(err)
      }
      _FileHandler(
        Array.prototype.concat.apply([], filenames),
        callback
      )
    }
  )
}

function _GlobHandler(pattern) {
  return function (callback) {
    glob(pattern, {}, callback)
  }
}

function _FileHandler(filenames, callback) {
  async.parallel(
    filenames.map(_FileChecker),
    callback
  )
}

function _FileChecker(filename) {
  return function (callback) {
    _checkFile(filename, callback)
  }
}

function _checkFile(filename, callback) {
  async.waterfall([
    _FileReader(filename),
    _checkCode(filename)
  ], callback)
}

function _FileReader(filename) {
  return function (callback) {
    fs.readFile(filename, 'utf8', function (err, data) {
      if (err) {
        return callback(err)
      }
      callback(err, data)
    })
  }
}

function _checkCode(filename) {
  return function (code, callback) {
    var lines = code.split('\n')
    var errors = []

    for (var i = 0; i < lines.length; i++) {
      var matchBadRequires = /require\s*\(\s*('|")+(\.\..*)('|")+\)/gi
      var matches
      while (matches = matchBadRequires.exec(lines[ i ])) {
        if (matches) {
          errors.push({
            description: 'file of higher level required!',
            details: {
              badRequire: matches[ 2 ],
              line: i + 1
            }
          })
        }
      }
    }

    callback(null, {
      filename: filename,
      modular: !errors.length,
      errors: errors
    })
  }
}