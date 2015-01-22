var wrappedexec = require('../wrapped-exec');
var parser = require('tap-parser');

module.exports = function (cb) {
  return function (args, done) {
    wrappedexec([ 'wrap' ], args[0], function (ctx, requireMain) {
      // we will need to wait for out module to finish running before we can do something.
      // but how can we do that?..

      var p = parser();

      ctx.tape.createStream().on('data', function (chunk) {
        p.write(chunk);
      }).on('end', function () {
        // After we have completed the test lets look at the ctx
        p.end();

        ctx.output = p;
        var test = ctx.tape.createHarness();
        var stream = test.createStream();
        test(function (t) { console.log('i'); cb(args, ctx, t); });
        stream.pipe(parser(function (r) { done(r.ok); }));
      });

      requireMain();
    });
  };

};
