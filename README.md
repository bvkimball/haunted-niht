# Haunted Niht

This is an opinionated version of [haunted](https://github.com/matthewp/haunted) that adds css template literals using [@niht/stylis](https://github.com/bvkimball/niht-stylis) which uses the css preprocess [sytlis](https://stylis.js.org/). html template literals are bundled from [lit-html](https://lit-html.polymer-project.org/). Everything is bundled together so this is a single dependency.

## Installation

Use the package manager [npm](https://npmjs.org) to install.

```bash
npm install @niht/haunted --save
```

### Importing

**Haunted** can be imported just like any other library when using a bundler of your choice:

```js
import { component, html, useState } from "@niht/haunted"
```

### Web modules

**Haunted** can work directly in the browser without using any build tools. Simply import the `haunted.js` bundle. You can use the [unpkg] or [pika](https://www.pika.dev/cdn) CDNs. This works great for demo pages and small apps. Here's an example with unpkg:

```js
import { html, css, define } from "https://unpkg.com/@niht/haunted/lib/haunted-niht.mjs"
```

If using pika then, remember to specify the version

```js
import { html, css, define } from "https://cdn.pika.dev/@niht/haunted/v0"
```

If you install Haunted **locally** this build is located at `node_modules/@niht/haunted/lib/haunted-niht.js`.

## Contributing

This repo is being used to experiment with the libraries that are bundled with it. Its fate is very uncertain, I would recommend using and contributing to the libraries described above.

## License

[UNLICENSE](https://unlicense.org/)
