var msee = require('msee');
var path = require('path');
var verify = require('adventure-verify');
var execTest = require('../utils').execTest;

exports.problem = msee.parseFile(path.join(__dirname, '/problem.md'));
exports.solution = msee.parseFile(path.join(__dirname, '/solution.md'));

exports.run = function (args) {
  var f = require(path.resolve(args[0]));
  return f;
};

exports.verify = verify({ modeReset: true }, execTest.bind(
  this, __dirname, ['fail1.js', 'fail2.js', 'fail3.js'], 'pass.js'
));
