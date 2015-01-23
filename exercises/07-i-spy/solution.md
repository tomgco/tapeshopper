This is the reference solution, have a look and see if you can see what we have done differently.

```javascript
var external = require(process.argv[2]);
var tape = require('tape');
var sinon = require('sinon');

tape('hello test', function (t) {
  sinon.spy(console, 'log');
  external();
  t.ok(console.log.withArgs('Woof!').calledOnce);
  t.ok(console.log.withArgs('Woof!').called);
  console.log.restore();
  t.end();
});
```

But we are sure that your solution is great! =D
