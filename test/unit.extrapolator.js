module.exports = {

  setUp: function(callback) {
    this.ext = require('../lib/extrapolator').getInstance();
    callback();
  },

  "Test create template": function(test) {

    var tpl = this.ext.createTemplate({
      someProperty: 'Some Value'
    });

    test.ok(tpl);
    test.done();
  },

  "Test analyze": function(test) {

    var tpl = this.ext.createTemplate({
      url: '/user/{id}',
      method: 'GET'
    });

    var r1 = this.ext.analyze({
      url: '/hello/world',
      method: 'POST'
    }, tpl);

    test.equals(2, r1.points);
    test.ok(r1.tokens !== undefined);
    test.equals(0, r1.matched);

    var r2 = this.ext.analyze({
      url: '/user/bcarr',
      method: 'POST'
    }, tpl);

    test.equals(2, r2.points);
    test.ok(r2.tokens.id);
    test.equals('bcarr', r2.tokens.id);
    test.equals(0.5, r2.matched);

    r3 = this.ext.analyze({
      url: '/user/1234',
      method: 'GET'
    }, tpl);

    test.equals(2, r3.points);
    test.ok(r3.tokens.id);
    test.equals("1234", r3.tokens.id);
    test.equals(1, r3.matched);

    test.done();

  },

  tearDown: function(callback) {
    callback();
  }

};