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
      }).stdio[2].pipe(bs()).pipe(through(function (chunk, enc, cb) {
        process.stderr.write('\x1b[0m' + chunk + '\n' + '\x01\x1b[1;32m\x02');
        cb();
      }));
  });

  var ok = fork(path.join(process.cwd(), solutionFile),
    [ path.join(dir, 'tests', passFile) ],
    {silent: true})
    .on('close', function (code) {
      t.ok(!code, 'passing tests should pass');
    });

    ok.stdio[2].pipe(bs()).pipe(through(function (chunk, enc, cb) {
      process.stderr.write('\x1b[0m' + chunk + '\n' + '\x01\x1b[1;32m\x02');
      cb();
    }));

    ok.stdio[1].pipe(bs()).pipe(through(function (chunk, enc, cb) {
      if (chunk.toString().indexOf('not ok') !== -1) {
        this.push('\x1b[1;31m' + chunk + '\n');
        this.ok = false;
      } else if (this.ok === false) {
        if (chunk.toString().indexOf('...') !== -1) {
          this.ok = true;
        }

        this.push('\x1b[0m' + chunk + '\n');
      }
      cb();
    })).pipe(bl(function (err, data) {
      if (err) {
        process.stderr.write(err.message);
      }
      process.stdout.write('\x1b[0m' + data);
    }));
};
