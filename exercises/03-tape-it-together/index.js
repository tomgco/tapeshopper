var path = require('path');
var verify = require('adventure-verify');
var parse = require('../utils').parse;
var execTest = require('../utils').execTest;

exports.problem = parse(path.join(__dirname, 'problem.md'));
exports.solution = parse(path.join(__dirname, 'solution.md'));
exports.verify = verify(execTest.bind(
  this, __dirname, ['fail1', 'fail2', 'fail3'], 'pass'
));
