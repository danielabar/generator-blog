'use strict';

var util = require('util');
var path = require('path');
var slug = require('slug');
var yeoman = require('yeoman-generator');

var PostGenerator = yeoman.generators.NamedBase.extend({
  init: function () {
  },

  files: function () {
    this.template(
      'post.' + this.extension(),
      'posts/' + this.filename(this.name) + '.' + this.extension()
    );
  },

  extension: function() {
    var pkg = JSON.parse(this.readFileAsString(path.join(process.cwd(), './package.json')));
    if (pkg.wantsMarkdown === true) {
      return 'md'
    } else {
      return 'html'
    }
  },

  filename: function(name) {
    var date = new Date().getTime();
    var slugifiedTitle = slug(name).toLowerCase();
    return date + '-' + slugifiedTitle;
  }

});

module.exports = PostGenerator;