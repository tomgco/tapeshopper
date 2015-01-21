var test = require('tape');
var sinon = require('sinon');
var hello = require('hello-world-classic');

test('hello test', function (t) {
  var spy = sinon.spy(console, 'log');
  hello();
  t.plan(3);

  t.equal(spy.withArgs('Woof!'), true);
  t.equal(spy.calledOnce, true);
  t.equal(typeof hello, 'function');
});
