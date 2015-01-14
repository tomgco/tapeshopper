var test = require('tape');

test('Tetsy test', function (t) {
  t.plan(1);
  t.equal(typeof hello, 'function');
  t.end();
});
