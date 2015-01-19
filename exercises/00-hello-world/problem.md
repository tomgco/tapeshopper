Write a failing test using tape, that asserts the result of a function named `hello` returns "Hello, World".

----------------------------------------------------------------------
## HINTS

To use tape we will need to install the package by using `npm` by running the following command:

```javascript
$ npm install tape
```

You can then require this modules by using the `require` function built-in to node.

```javascript
var test = require('tape');
```

To create a simple test which you can run:

```javascript
test('Some test', function (t) {
    t.equal(typeof Date.now, 'function');
    t.end();
});
```

You can have a look of the docs of `tape` here:

> $ADVENTURE_DOCS/docs/tape.html

When you are done, you must run:

```sh
$ADVENTURE_COMMAND verify program.js
```

to proceed. Your program will be tested, a report will be generated, and the lesson will be marked 'completed' if you are successful.`
