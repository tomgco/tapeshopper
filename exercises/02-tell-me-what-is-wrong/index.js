var path = require('path');
var execTest = require('../utils').execTest;
var verify = require('adventure-verify');
var msee = require('msee');


exports.problem = msee.parseFile(path.join(__dirname, 'problem.md'));
exports.solution = msee.parseFile(path.join(__dirname, 'solution.md'));
exports.verify = verify(execTest.bind(this, __dirname, ['fail'], 'pass'));
