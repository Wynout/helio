/**
 * TODO
 * split up in seperate files. these will be pulled  in automagically by require-handlebars-plugon
 */
/*

@link https://code.google.com/p/gisfizz/source/browse/src/main/webapp/js/handlebarsHelpers.js?r=88bb056febb4c8fff2e1acca8fe050cf937303dbhttps://code.google.com/p/gisfizz/source/browse/src/main/webapp/js/handlebarsHelpers.js?r=88bb056febb4c8fff2e1acca8fe050cf937303db
@link http://resthub.org/docs/backbone/internationalization/

https://github.com/SlexAxton/require-handlebars-plugin#helpers

Just put your helpers in templates/helpers/* and they'll automagically get pulled in as long as you write them as modules.

I find that many helpers are good helpers in regular code as well, so the following is a good practice:

define('templates/helpers/roundNumber', ['Handlebars'], function ( Handlebars ) {
  function roundNumber ( context, options ) {
    // Simple function for example
    return Math.round( context );
  }
  Handlebars.registerHelper( 'roundNumber', roundNumber );
  return roundNumber;
});
Then in your templates, you can just do:

{{roundNumber Data.ThreeFourths}}
The system will make sure these modules are pulled in automatically from that directory. But if in your app, you need a rounding module (perhaps in a view/datanormalization place), you could do this:

require(['templates/helpers/roundNumber'], function ( roundNumber ) {
  var threeFourths = (3/4);
  alert( roundNumber( threeFourths ));
});
It's just a module that happens to register itself.
*/
define([ "handlebars" ], function(Handlebars) {

  Handlebars.registerHelper("sprintf", function(str, args) {
    return _.str.sprintf(str, args);
  });

  Handlebars.registerHelper("add", function(lvalue, rvalue) {
    return lvalue + rvalue;
  });

  Handlebars.registerHelper("suppr", function(lvalue, rvalue) {
    return lvalue - rvalue;
  });

  Handlebars.registerHelper("eq", function(lvalue, rvalue, options) {
    if (_.isUndefined(options)) {
      return;
    }
    if (lvalue == rvalue)
      return options.fn(this);
    return options.inverse(this);
  });

  Handlebars.registerHelper("neq", function(lvalue, rvalue, options) {
    if (_.isUndefined(options)) {
      return;
    }
    if (lvalue != rvalue)
      return options.fn(this);
    return options.inverse(this);
  });

  Handlebars.registerHelper("gt", function(lvalue, rvalue, options) {
    if (_.isUndefined(options)) {
      return;
    }
    if (lvalue > rvalue)
      return options.fn(this);
    return options.inverse(this);
  });

  Handlebars.registerHelper("lt", function(lvalue, rvalue, options) {
    if (_.isUndefined(options)) {
      return;
    }
    if (lvalue < rvalue)
      return options.fn(this);
    return options.inverse(this);
  });

  Handlebars.registerHelper("gteq", function(lvalue, rvalue, options) {
    if (_.isUndefined(options)) {
      return;
    }
    if (lvalue >= rvalue)
      return options.fn(this);
    return options.inverse(this);
  });

  Handlebars.registerHelper("lteq", function(lvalue, rvalue, options) {
    if (_.isUndefined(options)) {
      return;
    }
    if (lvalue <= rvalue)
      return options.fn(this);
    return options.inverse(this);
  });

  Handlebars.registerHelper("match", function(lvalue, regexpStr, options) {
    if (_.isUndefined(options)) {
      return;
    }
    if (lvalue.match(new RegExp(regexpStr)))
      return options.fn(this);
    return options.inverse(this);
  });

});
