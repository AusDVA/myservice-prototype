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

## Other stuff
The [liverelod VS code app](https://marketplace.visualstudio.com/items?itemName=ziishaned.livereload) and [chrome extension](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei) is very handy.


## Backstop

**To run a test:**  

Windows: `backstop test`  
Linux: `./node_modules/backstopjs/cli/index.js test` (or you can run `backstop test` if you run `npm install -g backstopjs@canary`  
**Note:** The test will say it "failed" if there is no reference images. Refer to below to get references  
**Also note:** The default `backstop.json` file will only test the styleguide. If you add `--config all-pages.backstop.json` to the end of the command, it will test every single page on the site.  
  
To get reference images replace `test` with `reference` in the above commands.  
Please checkout `development` branch and run this test on there to get reference images.
