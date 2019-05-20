## Prototype
Derived from the Digital Transformation Agency's UI-Kit 2.0, myservice-prototype is a repository for enabling the transformation of UI into React components.

Install Gulp CLI

 `npm install --global gulp-cli`

Run

`npm install`

`gulp serve`

Open a browser at [http://localhost:5000/](http://localhost:5000/)

Problems with the server? Run:
killall node

## Code style and quality
Before contributing to the codebase, please familiarise yourself with [Google HTML/CSS Style Guide](https://google.github.io/styleguide/htmlcssguide.html). This is the style guide we've decided to adhere to.

[BEM](http://getbem.com/introduction/) is the CSS and HTML naming conversion that all new code should adopt.

Install a sass linter e.g. [Sass Lint](https://marketplace.visualstudio.com/items?itemName=glen-84.sass-lint). The .sasslintrc file in this project has been configured to reflect the Google style guide. 


## Visual regression testing

[BackstopJS](https://garris.github.io/BackstopJS/) is avaliable in this repo. There are 2 gulp wrappers for running tests:  
`gulp unit-test` - runs a test on **just** the styleguide  
`gulp unit-test-all` - runs a test on **all** 400+ pages (this will take a long time)   
  
The first time you run a test, BackstopJS will generate reference screenshots (so it's best to do this on the master branch). Once that's done you'll need to run `gulp unit-test` again. 
  
**Note** BackstopJS requirers [myservice](http://localhost:5000) to be running.


