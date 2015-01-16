Write a test that checks that the module `hello-world-classic` calls `console.log` with the argument of Hello, world".

----------------------------------------------------------------------
## HINTS

We will need to install and require the module `hello-world-classic`

```javascript
$ npm install hello-world-classic
```

You can then require this module by using the `require` function built-in to node.

```javascript
var hello = require('hello-world-classic');
```

To be able to assert that the output of the module `hello-world-classic` we can use the module `sinon` to spy on the function.
A test spy is a function that records arguments, return value, the value of this and exception thrown (if any) for all its calls. A test spy can be an anonymous function or it can wrap an existing function.

Docs are found at on the link below:

> $ADVENTURE_DOCS/docs/sinon.html

Example of checking if console.error is calledOnce with the specified argument

```js
var spy = sinon.spy(console, 'error')
spy.withArgs('Hello, $ADVENTURE_NAME user!').calledOnce
console.error.restore()
```

You can have a look of the docs of `tape` here:

> $ADVENTURE_DOCS/docs/tape.html

When you are done, you must run:

```sh
$ADVENTURE_COMMAND verify program.js
```

to proceed. Your program will be tested, a report will be generated, and the lesson will be marked 'completed' if you are successful.`
