# To err is human

A function `feedCat` takes a kind of food as a String argument and returns `yum`
for everything you feed them. However if you try to feed the cat `chocolate`, the
function will throw an error.

Write a tests for this behavior, to be sure no kittens are harmed.

The function will be provided through `process.arv[2]`.

## Hints

> To err is human, to purr feline. - Robert Byrne

Chocolate is awesome and so are cats. However they do not make a wonderful 
combination. The Caffeine and Theobromine in the chocolate can harm cats as well
as dogs. 

Feeding chocolate to cats would therefore considered an error. One way in JavaScript
to deal with errors is to `throw` them.

If we want to deal with these errors, we can use `try` and `catch` like this:

```js
try {
  petDog('bordercollie')
} 
catch(err) {
  console.error("It seems like he doesn't like that.")
}
```

When we test things, we often say that we want to make sure that there are no errors.
Well, that is not entirely true. We certainly want not to have errors in our code.
However if someone else tries to something weird with our functions, for example passing an object instead as an array we need to test this behavior.

So maybe we know that a dachshund does not like to be petted. Well we could test 
this behavior like this:

```js
t.throws(petDog.bind(null, 'dachshund'))
```

> Note: we need to ensure that we pass a function and not call it, using `fn.bind([this, arg1, arg2, ...])` this creates a new function with its context set to the first value and any other arguments provided loaded as the first argument.


Now the tests expects an error and throws an error if there is no error.
Mind boggling, right?

When you are done, you must run:

```sh
$ADVENTURE_COMMAND verify program.js
```

to proceed. Your program will be tested, a report will be generated, and the lesson will be marked 'completed' if you are successful.`
