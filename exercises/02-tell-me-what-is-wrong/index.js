var path = require('path');
var parse = require('../utils').parse;
var execTest = require('../utils').execTest;
var verify = require('adventure-verify');


exports.problem = parse(path.join(__dirname, 'problem.md'));
exports.solution = parse(path.join(__dirname, 'solution.md'));
exports.verify = verify(execTest.bind(this, __dirname, ['fail'], 'pass'));
