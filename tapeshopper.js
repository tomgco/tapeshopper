#!/usr/bin/env node

var adventure = require('adventure');
var shop = adventure('tapeshopper');

var path = require('path');
var split = require('split');
var through = require('through2');

// SUPER HACK +=D
shop._show = function (m) {
    var self = this;
    function replace (s) {
        if (typeof s !== 'string') {
          s = String(s);
        }
        return s
            .replace(/\$ADVENTURE_COMMAND/g, self.command)
            .replace(/\$ADVENTURE_NAME/g, self.name)
            .replace(/\$ADVENTURE_DOCS/g, function () {
              return 'file://' + path.join(__dirname);
            })
        ;
    }
    function write (buf, enc, next) {
        this.push(replace(buf) + '\n');
        next();
    }
    if (typeof m === 'object' && m.pipe) {
        m.pipe(split()).pipe(through(write)).pipe(process.stdout);
    } else if (typeof m === 'function') {
        this._show(m());
    } else {
      console.log(replace(m));
    }
};
// Too difficult for a first exercise
// shop.add('HELLO, WORLD', function () { return require('./exercises/00-hello-world'); });
shop.add('LOG IT OUT', function () { return require('./exercises/01-log-it-out'); });
shop.add('TELL ME WHAT IS WRONG', function () { return require('./exercises/02-tell-me-what-is-wrong'); });
shop.add('TAPE IT TOGETHER', function () { return require('./exercises/03-tape-it-together'); });
shop.add('CALL ME MAYBE', function () { return require('./exercises/04-call-me-maybe'); });
shop.add('TO ERR, IS TO HUMAN', function () { return require('./exercises/05-to-err-is-human'); });

// Not finished
shop.add('I SPY', function () { return require('./exercises/07-i-spy'); });

shop.execute(process.argv.slice(2));
