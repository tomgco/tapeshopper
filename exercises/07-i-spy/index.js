var msee = require('msee');
var path = require('path');
var verifyCalls = require('../../lib/tape/verify');
var verify = require('adventure-verify');
var execTest = require('../utils').execTest;

exports.problem = msee.parseFile(path.join(__dirname, '/problem.md'));
exports.solution = msee.parseFile(path.join(__dirname, '/solution.md'));

exports.run = function (args) {
  var f = require(path.resolve(args[0]));
  return f;
};

exports.verify = verify({ modeReset: true }, execTest.bind(
  this, __dirname, ['fail1.js', 'fail2.js', 'fail3.js'], 'pass.js', verifyCalls(function (args, ctx, t) {
      var calls = ctx.tapeCalls;
      t.ok(calls.plan >= 1, 'You have not called `t.plan(n)`');
      t.equal(calls.end, 1, 't.end should only be called once');
      t.ok(calls.equal >= 1, 'You must have at least one call to `t.eqaul`');
      t.equal(ctx.output.results.ok, false, 'Your tests should fail');
      t.end();
    })
));
