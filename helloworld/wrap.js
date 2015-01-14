var tape = require('tape');

function wrap(ctx) {
  ctx.tapeCalls = {}

  ctx.tape = tape
  tape.beep = 'boop'

  ctx.tapeCalls.end = 0;

  Object.keys(tape.Test.prototype).forEach(function (m) {
    var orig = tape.Test.prototype[m]

    tape.Test.prototype[m] = function () {
      // $captureStack is a utility to capture a stacktrace array
      var stack = ctx.$captureStack(tape.Test.prototype[m])

      if (stack[1].getFileName().substring(0, ctx.mainProgram.length) == ctx.mainProgram) {
        ctx.tapeCalls.end = 1
      }

      // call the real tape.end

      return orig.apply(this, arguments)
    }

  })
}

module.exports = wrap
