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

## Feature flags
The `./feature-live-list.json` contains a list of future features. Any feature added to the **production** array will be seen in [demo](http://myservice-demo.herokuapp.com/) and any feature added **development** will be seen in [disco](http://myservice-disco.herokuapp.com/). To create new features, an ejs if statement is needed e.g. ` <% if (locals.liveFeature.includes('featureLsa')) { %> ` in the ejs file. 


## Visual regression testing

[BackstopJS](https://garris.github.io/BackstopJS/) is avaliable in this repo. There are 2 gulp wrappers for running tests:  
`gulp unit-test` - runs a test on **just** the styleguide  
`gulp unit-test-all` - runs a test on **all** 400+ pages (this will take a long time)   
  
The first time you run a test, BackstopJS will generate reference screenshots (so it's best to do this on the master branch). Once that's done you'll need to run `gulp unit-test` again. 
  
**Note** BackstopJS requirers [myservice](http://localhost:5000) to be running.


## Backstop

**To run a test:**  

Windows: `backstop test`  
Linux: `./node_modules/backstopjs/cli/index.js test` (or you can run `backstop test` if you run `npm install -g backstopjs@canary`  
**Note:** The test will say it "failed" if there is no reference images. Refer to below to get references  
**Also note:** The default `backstop.json` file will only test the styleguide. If you add `--config all-pages.backstop.json` to the end of the command, it will test every single page on the site.  
  
To get reference images replace `test` with `reference` in the above commands.  
Please checkout `development` branch and run this test on there to get reference images.
