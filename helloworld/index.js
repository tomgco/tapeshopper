var msee = require('msee');
var path = require('path')
var wrappedexec = require('../lib/wrapped-exec')
var parser = require('tap-parser')
var tap = require('tap')
var verify = require('adventure-verify');

exports.problem = msee.parseFile(__dirname + '/problem.md');
exports.solution = msee.parseFile(__dirname + '/solution.md');

exports.run = function (args) {
  var f = require(path.resolve(args[0]));
};

exports.verify = function (args, cb) {
  wrappedexec([ require('./wrap') ], args[0], function (ctx, done) {
    // we will need to wait for out module to finish running before we can do something.
    // but how can we do that?..
    var tc = tap.createConsumer();

    var rows = [];
    tc.on('data', function (r) { rows.push(r) });
    tc.on('end', function () {
        var rs = rows.map(function (r) {
            if (r && typeof r === 'object') {
                return { id : r.id, ok : r.ok, name : r.name.trim() };
            }
            else return r;
        });

        console.log(rs)
        cb(false)

    })

    ctx.tape.createStream().pipe(tc)
    done()
  })
};
