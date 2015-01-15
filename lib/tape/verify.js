var wrappedexec = require('../wrapped-exec')
var parser = require('tap-parser')

module.exports = function (cb) {
  return function (args, done) {
    wrappedexec([ require('./wrap') ], args[0], function (ctx, test) {
      // we will need to wait for out module to finish running before we can do something.
      // but how can we do that?..

      var p = parser()

      ctx.tape.createStream().on('data', function (chunk) {
        p.write(chunk)
      }).on('end', function () {
        // After we have completed the test lets look at the ctx
        p.end()
        //console.log(p.results)
        var calls = ctx.tapeCalls
        var success = true

        try {
          ctx.tape = p
          cb(args, ctx)
        } catch (e) {
          console.error(e.message)
          success = false
        } finally {
          done(success)
        }

      })

      test()
    })
  }

}
