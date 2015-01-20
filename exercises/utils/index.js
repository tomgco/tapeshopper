var fork = require('child_process').fork;
var path = require('path');

exports.execTest = function (dir, failFiles, passFile, args, t) {

  t.plan(failFiles.length + 1);

  var solutionFile = args[0];

  failFiles.forEach(function (testFile) {
    fork(path.join(process.cwd(), solutionFile),
      [ path.join(dir, 'tests', testFile) ],
      {silent: true})
      .on('close', function (code) {
        t.ok(code, 'failing tests should fail');
      });
  });

  fork(path.join(process.cwd(), solutionFile),
    [ path.join(dir, 'tests', passFile) ],
    {silent: true})
    .on('close', function (code) {
      t.ok(!code, 'passing tests should pass');
    });
};
