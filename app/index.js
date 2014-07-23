'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');


var BlogGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.installDependencies();
      }
    });
  },

  askFor: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay('Welcome to the marvelous Blog generator!'));

    var prompts = [{
      type: 'confirm',
      name: 'wantsMarkdown',
      message: 'Would you like to use Markdown?',
      default: true
    }];

    this.prompt(prompts, function (props) {
      this.wantsMarkdown = props.wantsMarkdown;

      done();
    }.bind(this));
  },

  app: function () {
    this.mkdir('app');
    this.mkdir('posts');

    this.template('_package.json', 'package.json');
    this.copy('_bower.json', 'bower.json');
    this.copy('index.ejs', 'app/index.ejs');
    this.copy('demo.html', 'posts/demo.html');
    if (this.wantsMarkdown) {
      this.copy('welcome.md', 'posts/welcome.md');
    }
    this.copy('Gruntfile.js', 'Gruntfile.js');
  },

  projectfiles: function () {
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
  }
});

module.exports = BlogGenerator;
