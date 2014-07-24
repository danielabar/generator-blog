# generator-blog [![Build Status](https://secure.travis-ci.org/danielabar/generator-blog.png?branch=master)](https://travis-ci.org/danielabar/generator-blog)

> Learning [Yeoman](http://yeoman.io) with TutsPlus course [Say Yo to Yeoman](https://courses.tutsplus.com/courses/say-yo-to-yeoman)

This is a sample generator built from this [lesson](https://courses.tutsplus.com/courses/say-yo-to-yeoman/lessons/generators)

## Install generator

  ```bash
  sudo npm install -g generator-generator
  cd projects
  mkdir generator-blog && cd $_
  yo generator
  ```

Open the project in your text editor of choice.

`app/index.js` is the main definition of the generator

* `askFor` will iterate over each prompt in the prompts section
* `app` creates directories and copies files into them -> this builds up the desired app
* `projectFiles` copies over project specific config files like .editorconfit and .jshintrc


This will symlink project dir to global npm modules, for example:

  ```
  /usr/local/lib/node_modules/generator-blog -> /Users/dbaron/projects/generator-blog
  ```

## Developing the generator

### Prompts

Prompts is an array of objects like this:

  ```javascript
  {
  type: 'confirm',
  name: 'wantsMarkdown',   // value becomes variable name to control behaviour
  message: 'Would you like to use Markdown?', // displayed to user
  default: true // default value if user just hits enter rather than making explicit selection
  }
  ```

Handle all the prompt results in the prompt method:

  ```javascript
  this.prompt(prompts, function (props) {
  this.someOption = props.someOption;
  // put your custom handling code here, for example
  this.wantsMarkdown = props.wantsMarkdown;     // make the option available to scope of ENTIRE generator
  done();
  }.bind(this));
  ```

### App

To create a new directory:

  ```javascript
  app: function () {
    this.mkdir('posts');
  }
  ```

Instead of simply copying package.json:

  ```javascript
  this.copy('_package.json', 'package.json');
  ```

Use template function to take advantage of templating and options from user prompts

  ```javascript
  this.template('_package.json', 'package.json');
  ```

Edit `app/templates/_package.json` that comes with the generator, for example:

  ```
  "name": "blog",
  "version": "0.0.1",
  "dependencies" {
       "ejs": "*"
      <% if (wantsMarkdown) { %>
      , "showdown" : "*"
      <% } %>
  }
  ```

_JavaScript code can be embedded in between tags <% %>_

Place comma before optional dep, so json file isn't broken whether user wants the option or not

### Create a new template
ejs is a templating system used by node js

  ```javascript
  this.copy('index.ejs', 'app/index.html');
  ```

Create index.ejs file in `app/templates`

  ```html
  <html>
    <head>
      <style>
          body {
            border-top: 5px solid #000;
            color: #444;
            font-family: sans-serif;
          }
      </style>
    </head>
    <body>
      <div id="container">
          <% content %>
      </div>
    </body>
  </html>
  ```

## Make a Gruntfile

  ```javascript
  this.copy('Gruntfile.js', 'Gruntfile.js');
  ```

Create `Gruntfile.js` in `app/templates` and create build tasks as appropriate for the generated project.

## Generator Options in Grunt

Give user ability to customize some build options.
For example, to make source and destination directories options

  ```javascript
  grunt.initConfig({
    options: {
      source: 'posts',
      destination: 'dist'
    }
  });
  ```
Then replace the hard-coded line

  ```javascript
  var destination = path.join(process.cwd(), 'posts');
  ```

With

  ```javascript
  var destination = path.join(process.cwd(), grunt.config('options.destination'));
  ```

## Reference package.json in Gruntfile

Sometimes there is a need to access package.json information directly from the project becuase a Grunt task needs it.

To make the package.json information available to Grunt, add this line at beginning of Gruntfile.js

  ```javascript
  var pkg = grunt.file.readJSON('package.json');
  ```

## Make the generator available locally

This step is required since its not published on npm yet.

  ```bash
  cd projects/generator-blog
  sudo npm link
  ```

## Create a project using this generator

  ```bash
  cd projects
  mkdir generator-blog-test && cd $_
  yo blog
  ```