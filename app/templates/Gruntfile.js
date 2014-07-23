var path = require('path');
var fs = require('fs');
var showdown = require('showdown');
var EJS = require('ejs');

var BlogRenderer = function(file, destination, source, template, grunt) {
  this.file = file;
  this.destination = destination;
  this.source = source;
  this.template = template;
  this.grunt = grunt;
};

BlogRenderer.prototype = {
  render: function() {
    var file = this._read();
    var html = this._convert(file);
    var content = this._template(html);
    this._write(content);
  },

  _read: function() {
    var filePath = path.join(this.source, this.file);
    return this.grunt.file.read(filePath);
  },

  _convert: function(file) {
    return new showdown.converter().makeHtml(file);
  },

  _template: function(html) {
    var template = this.grunt.file.read(this.template);
    // ISSUE How to make EJS NOT escape the HTML?
    return EJS.render(template, {content: html});   // recall index.ejs has: <%= content %>
  },

  _write: function(page) {
    // ISSUE markdown posts with .md extension should be written as .html in dist dir
    this.grunt.file.write(path.join(this.destination, this.file), page);
  }
};

module.exports = function(grunt) {

  // TODO clean task to clean dist dir before each build

  grunt.registerTask('build', function() {
    var template = 'app/index.ejs';
    var destination = path.join(process.cwd(), 'dist');
    var source = path.join(process.cwd(), 'posts');
    var files = fs.readdirSync(source);

    files.forEach(function(file) {
      new BlogRenderer(file, destination, source, template, grunt).render();
    });

  });
};