< !DOCTYPE html >
  <html class="js" lang="en">

    <head>
      <title>Style Guide | Title | MyService</title>
      <%- include(partials+"components/styleguide/styleguide-styles-and-scripts") %>
</head>

    <body class="uikit-body uikit-grid uikit-refactor">
      <%- include(partials+"components/styleguide/styleguide-header") %>
  <main>
        <div class="container" id="main-content">
          <nav class="uikit-breadcrumbs" aria-label="breadcrumb">
            <ul class="uikit-link-list uikit-link-list--inline">
              <li>
                <a href="/styleguide">Home</a>
              </li>
              <li>Title</li>
            </ul>
          </nav>
          <div class="row">
            <div class="col-sm-9">
              <h1>Title</h1>
              <div class="breakout">
                <p>Insert intro message here</p>
              </div>
              <h2>Component Name</h2>
              <p>Component Explanation</p>
              <div class="example-box">
              </div>
              <p>An example of this component can be found <a href="/auth/">here</a>.</p>
              <hr>
        </div>
              <%- include(partials+"components/styleguide/styleguide-sidenav") %>
      </div>
          </div>
  </main>
        <%- include(partials+"components/styleguide/styleguide-footer") %>
</body>

</html>
