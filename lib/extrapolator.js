var VariableExtrapolator = function() {},
  tokenizer = require('stringtokenizer').getInstance();

/**
 * Analyzes the provided object using the provided
 * template.  Will return an object containing three properties;
 * points: represents the total number of matchers in the template,
 * tokens: will contain an object whose named properties match
 * template variables, alone with those extrapolated values.
 * matched: A percentage of the total number of matched elements
 * against the total number of template variable.  If this value
 * is a '1', then 100% of the provided object matches given template
 * variables.
 *
 * @param obj
 * @param template
 * @returns {{points: number, tokens: {}, matched: number}}
 */
VariableExtrapolator.prototype.analyze = function(obj, template) {
  var key, element, token, tokens = {},
    tplCount = 0, tplMatch = 0;
  for (key in template) {
    tplCount++;
    if (obj[key] === undefined) {
      continue;
    }
    token = tokenizer.parse(obj[key], template[key]);
    if (token === undefined) {
      continue;
    }
    tplMatch++;
    for (element in token) {
      tokens[element] = token[element];
    }
  }
  return {
    points: tplCount,
    tokens: tokens,
    matched: (tplMatch / tplCount)
  };
};

/**
 * Will iterate over the keys of the provided configuration
 * object and create a 'stringtokenizer' template from each
 * simple value, recursively.
 *
 * @param config
 * @returns {{}}
 */
VariableExtrapolator.prototype.createTemplate = function(config) {
  var key, template = {};
  for (key in config) {
    template[key] = tokenizer.tokenize(config[key]);
  }
  return template;
};

/**
 * Factory method returning an instance
 * of VariableExtrapolator.
 *
 * @returns {VariableExtrapolator}
 */
exports.getInstance = function() {
  return new VariableExtrapolator();
};