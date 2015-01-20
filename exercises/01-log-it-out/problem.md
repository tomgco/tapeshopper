# Log it out

Developing apps and modules is fun. However often you might be concerned whether things
work or when you add new features you want to be sure you did not break anything.
Therefore developers invented tests for their well-being. They allow you to test your application or module using repeatable inputs and outputs.

Let's assume you wrote a function called `emotify`, which takes a String and adds
a space and a `:)` to it. How would you check that your function is working?

Maybe your first idea was to call the function with a value and `console.log` the
result, then checking its output in the console.

```js
  var emotify = require('./emotify.js')
  console.log(emotify('just testing'))
```

Try this yourself. We are going to provide the location for the awesome
`emotify` module in `process.argv[2]` and the String for the test in `process.argv[3]`.

When you are done, you must run:

```sh
$ADVENTURE_COMMAND verify program.js
```

to proceed. Your program will be tested, a report will be generated, and the lesson will be marked 'completed' if you are successful.`
