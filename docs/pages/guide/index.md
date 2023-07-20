# Guide

## Prerequisites

- To use this library you need to use a framework the supports `@markdoc/markdoc` >= 0.3.0.
- An understanding of basic Markdoc concepts [Markdoc Docs](https://markdoc.dev)
- For astro you must use [Astro Markdoc](https://docs.astro.build/en/guides/integrations-guide/markdoc/)

## Installation

To install this package all you need to do is

::: code-group

```shell [pnpm]
    pnpm add markdoc-html-tag-schemas
```

```shell [yarn]
    yarn add markdoc-html-tag-schemas
```

```shell [npm]
    npm install markdoc-html-tag-schemas
```

:::

## Configuration

This library provides an extension that allows you to add all the Schemas provided.
The extension also uses the same type safety on image,link nodes you would get with
their tag versions.

### Astro and Markdoc

In a `markdoc.config.[m(ts|js)]` file do this.

```js
import { defineMarkdocConfig} from '@astrojs/markdoc/config';

import { markdocHTMLTagSchemas } from 'markdoc-html-tag-schemas';

export default defineMarkdocConfig({
  extends: [    
    markdocHTMLTagSchemas()
    ],
});
 
```

:::info

When using the library you can remember to remove the following code.
The extension does this for you.  

:::

```js
export default defineMarkdocConfig({
    
  extends: [ //[!code ++]
    markdocHTMLTagSchemas() //[!code ++]
  ], //[!code ++]

  nodes: {   //[!code --]
    document: {  //[!code --]
      ...nodes.document,  //[!code --]
      render: null,  //[!code --]
    },  //[!code --]
  },  //[!code --]

});
```

### Frameworks with no Extension Mechanic

 For other frameworks you can choose to import the schemas or you can destructure
from the `markdocHTMLTagSchemas` function.

```js
import { markdocHTMLTagSchemas } from 'markdoc-html-tag-schemas';
  
 const {nodes, tags } = markdocHTMLTagSchemas()

export default defineMarkdocConfig({
    nodes:{
      ...nodes 
    },
    tags:{
      ...tags
    }
});
    
```

:::info
To opt out of the use of the document.render to null.

```js
markdocHTMLTagSchemas({blankDoc:false})
```

:::

### Strict Headings

You can also make sure that when you are writing markdown you are only using headings 1-4.
This is often a best practice. But I decided to just let you opt-in.
All you have to do is this.

```js
markdocHTMLTagSchemas({strictHeadings:true})
```
