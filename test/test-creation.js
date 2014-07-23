/*global describe, beforeEach, it */
'use strict';
var path = require('path');
var helpers = require('yeoman-generator').test;

describe('blog generator', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return done(err);
      }

      this.app = helpers.createGenerator('blog:app', [
        '../../app'
      ]);
      done();
    }.bind(this));
  });

  it('creates expected files', function (done) {
    var expected = [
      'package.json',
      'bower.json',
      'app/index.ejs',
      'posts/demo.html',
      '.jshintrc',
      '.editorconfig'
    ];

    helpers.mockPrompt(this.app, {
      'wantsMarkdown': true
    });
    this.app.options['skip-install'] = true;
    this.app.run({}, function () {
      helpers.assertFile(expected);
      helpers.assertFileContent('package.json', /ejs/)
      helpers.assertFileContent('package.json', /showdown/)
      done();
    });
  });

  it('does not include showdown if user says no to wantsMarkdown', function(done) {
    var expected = [
      'package.json',
      'bower.json',
      'app/index.ejs',
      'posts/demo.html',
      '.jshintrc',
      '.editorconfig'
    ];

    helpers.mockPrompt(this.app, {
      'wantsMarkdown': false
    });
    this.app.options['skip-install'] = true;
    this.app.run({}, function () {
      helpers.assertFile(expected);
      helpers.assertFileContent('package.json', /ejs/)
      helpers.assertNoFileContent('package.json', /showdown/)
      done();
    });
  });

});
