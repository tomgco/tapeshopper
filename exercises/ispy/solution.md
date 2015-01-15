This is the reference solution, have a look and see if you can see what we have done differently.

```javascript
var test = require('tape');

test('hello test', function (t) {
  t.plan(1);
  t.equal(typeof hello, 'function');
  t.end();
});
```

But we are sure that your solution is great! =D
