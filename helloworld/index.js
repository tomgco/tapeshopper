var msee = require('msee');
var path = require('path')
var wrappedexec = require('../lib/wrapped-exec')

exports.problem = msee.parseFile(__dirname + '/problem.md');
exports.solution = msee.parseFile(__dirname + '/solution.md');

exports.run = function (args) {
  var f = require(path.resolve(args[0]));
};

exports.verify = function (args, cb) {
  wrappedexec([ require('./wrap') ], args[0], function (ctx) {
    console.log(ctx)
    cb(false);
  })
};
