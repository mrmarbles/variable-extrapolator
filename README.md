variable-extrapolator
========

[![Build Status](https://travis-ci.org/mrmarbles/variable-extrapolator.png?branch=master)](https://travis-ci.org/mrmarbles/variable-extrapolator)

Find and pull variable values from complex objects..

Installation
---------------
     npm install variable-extrapolator

Use
---------------
    var ext = require('variable-extrapolator').getInstance();

    var tpl = ext.createTemplate({
      url: '/user/{id}',
      method: 'GET'
    });

    var results = ext.analyze({
      url: '/user/bcarr',
      method: 'GET'
    }, tpl);

Understanding the results of analyze()
---------------
the `analyze()` method accepts any complex object and a previous generated template against which
keys and values of the provided object will be matched.  If the object contains properties whose values
match the template, then those values are extracted as `tokens` in the results of the call.  The return
results will also contain a property named `points` which is a number indicating the total number of
variable matchers that are declared in the template, as well as a `matched` property which contains a
value representing the percentage of matches the object contained according to the template.  If a `1` is
returned in this value, then 100% of the provided object matched the template.

Testing
---------------
    npm test

License
-------
[MIT License](http://mrmarbles.mit-license.org/ "Mit License")

