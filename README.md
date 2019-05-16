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


## Backstop

There are 2 gulp commands for running regression tests:  
`gulp unit-test` - runs a test on **just** the styleguide  
`gulp unit-test-all` - runs a test on **all** 400+ pages (this will take a long time)   
  
If the `backstop_data/bitmaps_reference` directory does not exist, it will generate reference screenshots, but if it does exist it will compare the screenshots to existing reference images.  
  
**Please Note** You will need another terminal/command prompt window running `gulp serve` to run this.


