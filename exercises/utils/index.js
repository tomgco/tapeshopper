var fork = require('child_process').fork;
var path = require('path');
var bl = require('bl');
var through = require('through2');
var bs = require('binary-split');

exports.execTest = function (dir, failFiles, passFile, extraFn, args, t) {
  process.argv[2] = path.join(dir, 'tests', passFile);
  // This callback will run after the first set of assertations have ran.
  // this will allow use to test for methods that have been called to assist in
  // finding out problems for the workshopee
  t.plan(failFiles.length + 1);
  function callback() {
    // plan for the number of fail files asserted then plus one for the pass
    // plus the number from extraFn
    //console.log('HEKKI1')

    var solutionFile = args[0];

    failFiles.forEach(function (testFile) {
      fork(path.join(process.cwd(), solutionFile),
        [ path.join(dir, 'tests', testFile) ],
        {silent: true})
        .on('close', function (code) {
          t.ok(code, 'failing tests should fail');
        });
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

  }
  if (typeof extraFn === 'function') {
    extraFn(args, callback);
  } else {
    t = args;
    args = extraFn;
    (function () {
      callback();
    })(args);
  }
};
