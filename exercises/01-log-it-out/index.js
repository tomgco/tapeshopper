var path = require('path');
var fork = require('child_process').fork;
var concat = require('concat-stream');
var verify = require('adventure-verify');
var msee = require('msee');

exports.problem = msee.parseFile(path.join(__dirname, 'problem.md'));
exports.solution = msee.parseFile(path.join(__dirname, 'solution.md'));

exports.verify = verify(function (args, t) {
  t.plan(2);

  t.assert(args[0], 'You much supply an argument to verify');

  var program = fork(path.join(process.cwd(), args[0]),
    [ path.join(__dirname, 'tests', 'emotify.js'), 'testing like a pro'],
    {silent: true});

  program.stdout.pipe(concat(function (result) {
    t.equal(result.toString(), 'testing like a pro :)\n', 'adds smiley correctly');
  }));
});
