var path = require('path');
var verify = require('adventure-verify');
var msee = require('msee');
var execTest = require('../utils').execTest;

exports.problem = msee.parseFile(path.join(__dirname, 'problem.md'));
exports.solution = msee.parseFile(path.join(__dirname, 'solution.md'));
exports.verify = verify(execTest.bind(
  this, __dirname, ['fail1', 'fail2', 'fail3'], 'pass'
));
