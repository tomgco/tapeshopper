var msee = require('msee');
var path = require('path')
var wrappedexec = require('../lib/wrapped-exec')
var parser = require('tap-parser')
var verify = require('adventure-verify');

exports.problem = msee.parseFile(__dirname + '/problem.md');
exports.solution = msee.parseFile(__dirname + '/solution.md');

exports.run = function (args) {
  var f = require(path.resolve(args[0]));
};

exports.verify = function (args, cb) {
  wrappedexec([ require('./wrap') ], args[0], function (ctx, done) {
    // we will need to wait for out module to finish running before we can do something.
    // but how can we do that?..

    var p = parser()

    ctx.tape.createStream().on('data', function (chunk) {
      p.write(chunk)
    }).on('end', function () {
      p.end()
      console.log(p.results)
      cb(false)
    })

    done()
  })
};
