var fs = require('fs');
var path = require('path');

function wrappedexec (modFiles, mainProgram, cb) {

  // Load up wrapped file
  var ctx = {};
  var mods = [];

  mainProgram = ctx.mainProgram = fs.realpathSync(path.resolve(process.cwd(), mainProgram));

  // utility to catpture a stack trace at a particular method in an array
  // https://github.com/rvagg/workshopper-wrappedexec/blob/aed4ac438aedf7bf392b67a0d83e1969d8a4fab2/exec-wrap.js#L24-L36
  ctx.$captureStack = function captureStack (fn) {
    var err = new Error();
    var stack;

    Error._prepareStackTrace = Error.prepareStackTrace;
    Error.prepareStackTrace = function (ie, s) {
      if (ie) {
        console.error(ie);
      }
      return s;
    };
    Error.captureStackTrace(err, fn);
    stack = err.stack; // touch it to capture it
    Error.prepareStackTrace = Error._prepareStackTrace;

    return stack;
  };

  for (var i = 0; i < modFiles.length; i++) {
    try {
      // load module
      var mod = modFiles[i];

      mods.unshift(mod);

      // give it the ctx if it exports a function
      if (typeof mod === 'function') {
        mod(ctx);
      }
    } catch (e) {
      console.error('Internal error loading wrapped module', modFiles[i]);
      console.dir(e);
    }
  }

  process.nextTick(cb.bind(null, ctx, function () {
    require(mainProgram);
  }));
}

module.exports = wrappedexec;
