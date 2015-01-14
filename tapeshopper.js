#!/usr/bin/env node

var adventure = require('adventure');
var shop = adventure('tapeshopper');

var path = require('path');

// SUPER HACK +=D
shop._show = function (m) {
    var self = this;
    if (typeof m === 'object' && m.pipe) {
        m.pipe(split()).pipe(through(write)).pipe(process.stdout);
    }
    else if (typeof m === 'function') {
        this._show(m());
    }
    else console.log(replace(m));

    function write (buf, enc, next) {
        this.push(replace(buf) + '\n');
        next();
    }
    function replace (s) {
        if (typeof s !== 'string') s = String(s);
        return s
            .replace(/\$ADVENTURE_COMMAND/g, self.command)
            .replace(/\$ADVENTURE_NAME/g, self.name)
            .replace(/\$ADVENTURE_DOCS/g, function (match, subpath) {
              return 'file://' + path.join(__dirname)
            })
        ;
    }
}

shop.add('HELLO, WORLD', function () { return require('./helloworld') });

shop.execute(process.argv.slice(2));
