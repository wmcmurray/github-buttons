// Generated by CoffeeScript 1.9.3
(function() {
  var args, fs, page, puts;

  if (!(phantom.version.major >= 2)) {
    require("system").stderr.write("Error: Not compatible with your version of phantomjs:\n       Required: >=2.0.0\n       Actual:   " + phantom.version.major + "." + phantom.version.minor + "." + phantom.version.patch + "\n\n");
    phantom.exit(2);
  }

  args = require('system').args;

  fs = require('fs');

  page = require('webpage').create();

  if (args.length > 1) {
    puts = function(content) {
      return fs.write(args[1], content, 'w');
    };
  } else {
    puts = function(content) {
      return console.log(content);
    };
  }

  page.open("src/phantomjs/octicons/index.html", function() {
    puts(page.evaluate(function() {
      var octicon, styleSheets;
      octicon = document.body.appendChild(document.createElement("span"));
      styleSheets = Array.prototype.filter.call(document.styleSheets, function(styleSheet) {
        var ref;
        return (ref = styleSheet.href) != null ? ref.match(/\/octicons\.css$/) : void 0;
      });
      return Array.prototype.filter.call(styleSheets[0].cssRules, function(cssRule) {
        var ref;
        return (ref = cssRule.selectorText) != null ? ref.match(/^\.octicon-[\w-]+?::before(?:\s*,\s*\.octicon-[\w-]+?::before)*$/) : void 0;
      }).map(function(cssRule) {
        var selector, selectorText;
        selector = cssRule.selectorText.match(/^\.(octicon-[\w-]+?)::before/)[1];
        octicon.className = "mega-octicon " + selector;
        selectorText = cssRule.selectorText.replace(/::before/g, "");
        return selectorText + " { width: unit((" + octicon.offsetWidth + "/32), em); }";
      }).join("\n");
    }));
    return phantom.exit();
  });

}).call(this);
