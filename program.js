var test = require('tape');

test('hello test', function (t) {
  t.plan(1);
  t.equal(typeof hello, 'function');
  t.end();
});
