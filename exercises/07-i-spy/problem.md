Write a test that checks that the module `iAmDog` calls `console.log` with the argument of "Woof!".

The function will be provided through `process.arv[2]`.

----------------------------------------------------------------------
## HINTS

To be able to assert that our function `iAmDog` calls `console.log` we can use the module `sinon` to spy on the function.

> "A test spy is a function that records arguments, return value, the value of this and exception thrown (if any) for all its calls. A test spy can be an anonymous function or it can wrap an existing function." ~ Sinon

Docs are found at on the link below:

> $ADVENTURE_DOCS/docs/sinon.html

Example of checking if console.error is called only one time with the specified argument:

```js
sinon.spy(console, 'error')
t.ok(console.error.withArgs('Hello, $ADVENTURE_NAME user!').calledOnce);
console.error.restore()
```

Use your new found knowledge and build a tape test case to include sinon spies.

When you are done, you must run:

```sh
$ADVENTURE_COMMAND verify program.js
```

to proceed. Your program will be tested, a report will be generated, and the lesson will be marked 'completed' if you are successful.`
