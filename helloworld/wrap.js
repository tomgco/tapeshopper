var tape = require('tape');

function wrap(ctx) {
  ctx.tapeCalls = {}

  ctx.tapeCalls.end = 0;

  Object.keys(tape).forEach(function (m) {
    var orig = tape[m]

    tape[m] = function () {
      // $captureStack is a utility to capture a stacktrace array
      var stack = ctx.$captureStack(fs[m])

      if (stack[0].getFileName().substring(0, ctx.mainProgram.length) == ctx.mainProgram)
        ctx.tapeCalls.end = 1

      // call the real tape.end

      return orig.apply(this, arguments)
    }

  })
}

module.exports = wrap
