# Tape it together

Write tests that output `TAP`, that tests the following properties of a function
`fancify`.

1 `fancify(str)` returns the `str` wrapped in `~*~`
  Example: `fancify('Hello')` returns `~*~Hello~*~`
2 It takes an optional second argument that converts the string into ALLCAPS
  Example: `fancify('Hello', true)` returns `~*~HELLO~*~`
3 It takes a third optional argument, that determines the character in the middle
  Example: `fancify('Hello', false, '!')` returns `~!~Hello~!~`

## Hints

Testing with `assert` still has some downsides. Even though we don't have to
check all the values ourself like in the first level, but now we only get not
very readable errors when something is wrong. Otherwise our tests just don't do
nothing. Maybe we still would like to see some information that everything is ok.


There is a standard for outputting data from tests called `TAP`, the 
`Test Anything Protocol`. It is nicely readable for humans as well as for our robotic
friends.

One module for testing that outputs `TAP` is `tape` (another one is `tap`, duh).
It takes a description of what your are testing and a callback function, with a
parameter that works quite similar to `assert`. However we also have to use it
to tell `tape` when we are done with our tests.

Here is an example how to test the last function with `tape`

```js
  var test = require('tape')
  var isCoolNumber = require('./cool.js')
  
  test('isCoolNumber accepts only cool numbers', function (t) {
    t.ok(isCoolNumber(42), '42 should be cool')
    t.end()
  })
```

## Resources

* TAP on Wikipedia http://en.wikipedia.org/wiki/Test_Anything_Protocol
* The tape module https://www.npmjs.org/package/tape