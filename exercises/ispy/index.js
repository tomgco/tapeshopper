var msee = require('msee');
var path = require('path')
var verify = require('../../lib/tape/verify')
var assert = require('assert')

exports.problem = msee.parseFile(__dirname + '/problem.md');
exports.solution = msee.parseFile(__dirname + '/solution.md');

exports.run = function (args) {
  var f = require(path.resolve(args[0]));
};

exports.verify = verify(function (args, ctx) {
  var calls = ctx.tapeCalls
  assert(calls.plan >= 1, 'You have not called `t.plan(n)`')
  assert.equal(calls.end, 1, 't.end should only be called once')
  assert(calls.equal >= 1, 'You must have at least one call to `t.eqaul`')
  assert.equal(ctx.tape.results.ok, false, 'Your tests should fail')
});
