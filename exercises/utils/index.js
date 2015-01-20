var fork = require('child_process').fork;
var path = require('path');
var bl = require('bl');
var through = require('through2');
var bs = require('binary-split');

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
    .stdio[1].pipe(bs()).pipe(through(function (chunk, enc, cb) {
      if (chunk.toString().indexOf('not ok') !== -1) {
        this.push(chunk + '\n');
        this.ok = false;
      } else if (this.ok === false) {
        if (chunk.toString().indexOf('...') !== -1) {
          this.ok = true;
        }

        this.push(chunk + '\n');
      }
      cb();
    })).pipe(bl(function (err, data) {
      process.stdout.write(data);
    }))
    .on('close', function (code) {
      t.ok(!code, 'passing tests should pass');
    });
};
