@gov.au/page-alerts
============

> Use page alerts to notify users of important information and state changes to the page.


## Contents

* [Install](#install)
* [Usage](#usage)
* [Build](#build)
* [Tests](#tests)
* [Release History](#release-history)
* [License](#license)


----------------------------------------------------------------------------------------------------------------------------------------------------------------


## Install


```shell
yarn add @gov.au/page-alerts
```

```shell
npm install @gov.au/page-alerts --save-dev
```


**[⬆ back to top](#contents)**


----------------------------------------------------------------------------------------------------------------------------------------------------------------


## Usage


* [React](#react)


**[⬆ back to top](#contents)**


----------------------------------------------------------------------------------------------------------------------------------------------------------------


### React

Usage:

```jsx
import Button from './page-alerts.js';

<PageAlert as='info'>
	Content of alert
</PageAlert>
```

All props:

```jsx
<PageAlert
	as="info"  {/* One of four kinds: 'info', 'success', 'warning', 'error' */}
>
	Content of alert
</PageAlert>
```

For more details have a look at the [usage example](https://github.com/govau/uikit/tree/master/packages/page-alerts/tests/react/index.js).


**[⬆ back to top](#contents)**


----------------------------------------------------------------------------------------------------------------------------------------------------------------


## Dependency graph

```shell
page-alerts
└─ core
```


**[⬆ back to top](#contents)**


----------------------------------------------------------------------------------------------------------------------------------------------------------------


## Build


**[⬆ back to top](#contents)**


----------------------------------------------------------------------------------------------------------------------------------------------------------------


## Tests


**[⬆ back to top](#contents)**


----------------------------------------------------------------------------------------------------------------------------------------------------------------


## Release History

* v0.2.0 - Added react component
* v0.1.1 - Improved print styles
* v0.1.0 - 💥 Initial version


**[⬆ back to top](#contents)**


----------------------------------------------------------------------------------------------------------------------------------------------------------------


## License

Copyright (c) Commonwealth of Australia.
Licensed under [MIT](https://raw.githubusercontent.com/govau/uikit/packages/core/master/LICENSE).


**[⬆ back to top](#contents)**

# };
