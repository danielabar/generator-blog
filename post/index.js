'use strict';

var util = require('util');
var path = require('path');
var slug = require('slug');
var yeoman = require('yeoman-generator');

var extension = function() {
  var pkg = JSON.parse(this.readFileAsString(path.join(process.cwd(), './package.json')));

  if (pkg.wantsMarkdown === true) {
    return 'markdown'
  } else {
    return 'html'
  }
};

var PostGenerator = yeoman.generators.NamedBase.extend({
  init: function () {
  },

  files: function () {
    this.template(
      'post.' + this.extension(),
      'posts/' + slug(this.name) + '.' + this.extension()
    );
  },

  extension: function() {
    var pkg = JSON.parse(this.readFileAsString(path.join(process.cwd(), './package.json')));
    if (pkg.wantsMarkdown === true) {
      return 'markdown'
    } else {
      return 'html'
    }
  }

});

module.exports = PostGenerator;