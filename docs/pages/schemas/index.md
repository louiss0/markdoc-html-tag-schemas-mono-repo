# Schemas

[markdoc]: https://markdoc.dev

[w3 schools]: https://www.w3schools.com

[mozilla developer network]: https://developer.mozilla.org

This library is created to configure [Markdoc][markdoc] to use schemas that represent HTML.
This is done according to the research I conducted using
[Mozilla Developer Network][mozilla developer network] and [W3 Schools][w3 schools].
The schemas that exist in this library work the way they are supposed
to work according to the research that I conducted. I decided to only allow attributes that are official.
There are some Schemas that are only allowed to be written left to right **inline**.
Some that are self closing. THe ones that are paired are few. Most tags are self-closing and inline.

:::tip
The name of the schema is the name of the tag that will be rendered.
:::

## Text Tag Schemas

A set of schemas that are created to render HTML tags that manipulate the text of it's children
are called Text Tag Schemas. They are self-closing and inline.

They have a primary attribute that is.

- A string
- Required
- Will be used as the child of the tag that will be rendered by Markdoc.

Here is a list of all schema that belong in that category.

- sup
- sub
- small
- wbr
- code
- cite
- samp
- mark
- q
- kbd
- bdo
- bdi
- data
- mark
- dd
- dt
- span

## Container Schemas

A container Schema is a schema that does not require a primary attribute and requires children.
If provided the wrong children it will error. They are schemas that aren't inline.

## Leaf Schemas

A leaf schema is a schema with no required children or primary attribute.

:::info
It's a schema that normally represents an HTML tag that activates some
kind of browser behavior by linking to file or by typing in a special string.
:::

## Data Schemas

A schema that accepts a property with a key called data
and an value as an object literal is called a **Data Schema**.
It's a schema that takes the keys of each value
adds a **data-** as the prefix to it, lowercase's it,
then it mixes that object with attributes that written on the tag.  

:::warning
 These kinds of schemas are not text schemas and will not mix with them at all.  
:::
