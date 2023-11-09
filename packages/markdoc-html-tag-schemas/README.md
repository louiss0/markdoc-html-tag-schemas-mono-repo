[Docs]: https://markdoc-html-tag-schemas-docs.onrender.com

# Markdoc-HTML-Tag-Schemas

```md
  {% ul title="chores" %}
    {% li "Clean my room" %}
    {% li "Wash the dishes" %}
    {% li "Takeout the garbage" %}
    {% li "Go to the recital" %}
  {% /ul %}


  {% a href="/" %}
    Go Home 
  {% /a %}


{% video %}
    {% source src="video.mp4" /%}
{% /video %}

```

This library is a library that was created to add essential tags that are meant to used in Markdoc.
Markdoc doesn't allow you to use HTML at all it will only respect tags and Common Mark syntax.
This library comes with a set of Markdoc attributes that are supposed to check for proper types
of HTML attributes. The list of html elements that are supported as tags are.

- a
- img
- br
- hr
- video
- audio
- iframe
- source
- picture
- time
- span
- track
- ul
  - li  
- blockquote
- details
  - summary
- dl
  - dd
  - dt
- colgroup
  - col
- p
- sup
- sub
- small
- wbr
- del
- ins
- cite
- code
- samp
- mark
- q
- kbd
- bdo
- bdi
- data
- span
- time
- dfn

For further documentation go to the [Markdoc HTML Tag Schemas Docs][Docs].

To look at supported schemas go [here](https://markdoc-html-tag-schemas-docs.onrender.com/schemas)

To look at supported attributes go [here](https://markdoc-html-tag-schemas-docs.onrender.com/attributes)

## Installation

```shell
npm i markdoc-html-tag-schemas
```

## Configuration

In the `markdoc.config.mjs` file for `@astrojs/markdoc`. Do this.

```js
import { defineMarkdocConfig,} from '@astrojs/markdoc/config';

import { markdocHTMLTagSchemas } from 'markdoc-html-tag-schemas';

export default defineMarkdocConfig({
  extends: [
    markdocHTMLTagSchemas()
    ],
});
 
```

For other frameworks you can choose to import the schemas or you can destructure from the `markdocHTMLTagSchemas()`

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

## Extension features

The Markdoc Extension for Astro will do these things for you.

- Automatically set the document render to null.
- Add all the tag schemas in this library to the config.
- Change the link node's href and title attributes to use the `a` schema's ones.
- Change the image node's src,title and alt attributes to use the img schema's ones
- It allows you to disable the use of heading's 5-6

To opt out of the use of the document.render to null .

```js
markdocHTMLTagSchemas({blankDoc:false})
```

To enable strict headings you can do this.

```js
markdocHTMLTagSchemas({strictHeadings:true})
```
