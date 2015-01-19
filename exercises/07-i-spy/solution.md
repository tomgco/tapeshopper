This is the reference solution, have a look and see if you can see what we have done differently.

```javascript
var test = require('tape');
var sinon = require('sinon');
var hello = require('hello-world-classic');

test('hello test', function (t) {
  var spy = sinon.spy(console, 'log');

  hello();

  t.equal(spy.withArgs('Hello, World'), true);
  t.equal(spy.calledOnce, true);
  t.plan(1);
  t.equal(typeof hello, 'function');
  t.end();
});
```

But we are sure that your solution is great! =D
