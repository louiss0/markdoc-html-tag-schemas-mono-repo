
[markdoc]: https://markdoc.dev

[w3 schools]: https://www.w3schools.com

[mozilla developer network]: https://developer.mozilla.org

# Schemas

This library is created to configure [Markdoc][markdoc] to use schemas that represent HTML.
This is done according to the research I conducted using
[Mozilla Developer Network][mozilla developer network] and [W3 Schools][w3 schools].
This means that they are schemas that respect HTML rules and standards.
I have decided to only created schemas for HTML tags that are used to write articles.
This means no headers,main,section, or footer and no form related and no div tags.

:::tip
The name of the schema is the name of the tag that will be rendered.
:::

:::tip
If you want to know how attributes are implemented by this library.
refer to this [page](/attributes/index)
:::

To see what schemas are in which category go to the flowing pages.

- [Container Schemas](./container.md)
- [Leaf Schemas](./leaf.md)
- [Text Schemas](./text.md)
