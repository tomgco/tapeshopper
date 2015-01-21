var wrappedexec = require('../wrapped-exec');
var parser = require('tap-parser');

module.exports = function (cb) {
  return function (args, t, done) {
    wrappedexec([ require('./wrap') ], args[0], function (ctx, requireMain) {
      // we will need to wait for out module to finish running before we can do something.
      // but how can we do that?..

      var p = parser();

      ctx.tape.createStream().on('data', function (chunk) {
        p.write(chunk);
      }).on('end', function () {
        // After we have completed the test lets look at the ctx
        p.end();

        ctx.tape = p;
        cb(args, ctx, t, done);

      });

      requireMain();
    });
  };

};
