[IntegerAttribute]: /attributes/custom#integerattribute

[DownloadAttribute]: /attributes/custom#downloadattribute

[Media Types]: https://www.iana.org/assignments/media-types/media-types.xhtml

# Container

A container schema is a schema for any html tag that can contain children.
Some of them are created to enforce the relationships between them.
They will never be self-closing, have a primary attribute or be inline.
Some of them must have specific children in order to be rendered.

:::info The ones that fall into this category are.

- details
- video
- audio
- address
- ul
- ol
- blockquote
- picture
- dl
- colgroup
- col
- p

:::

## Lists

You can have ordered and unordered lists with attributes by using the `ol` and `ul` tags.
You can't write attributes on lists but you can now do so with this library.
You can even use the `li` tag as only a self closing one.

:::info The following attributes are allowed

- [title](../attributes/index.md#title)
- [spellcheck]((../attributes/index.md#spellcheck))
- [lang]((../attributes/index.md#lang))
- [translate]((../attributes/index.md#translate))
- [dir]((../attributes/index.md#dir))

:::

:::info ul

```md

{% ul %}
    {%li "Clean my room" /%}
    {%li "Throw out the garbage" /%}
    {%li "Do the laundry" /%}
    {%li "Wash the dishes" /%}
{% /ul %}

```

:::

:::info ol

```md
{% ol %}
    {%li "Clean my room" /%}
    {%li "Throw out the garbage" /%}
    {%li "Do the laundry" /%}
    {%li "Wash the dishes" /%}
{% /ol %}
```

:::

### Columns

You can now specify columns in a table by using the colgroup and col.
Both of them share the following attributes.

```md
{%colgroup %}
    {%col "content one" /%}
    {%col "content two" span=2 /%}
{%/colgroup %}
```

- [hidden](../attributes/index.md#hidden)
- [style](../attributes/index.md#style)

| span | type                                 | required |
| ---- | ------------------------------------ | -------- |
| span | [IntegerAttribute][IntegerAttribute] | false    |

### Definitions

Definition list are available through the `dl` container schema
and the `dd` and `dt` text schemas.

:::danger
The dl tag can only have `dd` and `dt` as it's children.
They must also be written as dd first then dt each time they are used as children.
:::

:::info Example

```md
 {% dd %}
 {% dt "verb"  /%} {% dd "a word used to describe a action" /%}
 {% dt "noun"  /%} {% dd "a word used to describe a person place or thing" /%}
 {% /dd %}
```

:::

### Details

Details are also allowed in this library by using. the `details` and `summary` tags.
The summary tag is a self-closing one.

:::info Example

```md
{% details %}
    {% summary The dog ate my homework /%}
{% /details %}
```

:::

### Anchor

```md
{% a href="/" %}
  Home
{% /a  %}
```

You can use the anchor tag like a regular anchor tag.

It's children must can only be.

- span
- em
- strong
- abbr
- image
- img
- text

It's schema is called `a` it supports the following attributes.

| attribute      | type                                   | ref                        | required | matches                         |
| -------------- | -------------------------------------- | -------------------------- | -------- | ------------------------------- |
| href           | [HrefAttribute](#href-attribute)       |                            | true     |                                 |
| type           | String                                 | [Media Types][Media Types] | false    |                                 |
| referrerpolicy | String                                 |                            | false    | no-referrer                     |
|                |                                        |                            |          | no-referrer-when-downgrade      |
|                |                                        |                            |          | origin                          |
|                |                                        |                            |          | origin-when-cross-origin        |
|                |                                        |                            |          | same-origin                     |
|                |                                        |                            |          | strict-origin                   |
|                |                                        |                            |          | strict-origin-when-cross-origin |
|                |                                        |                            |          | unsafe-url                      |
| download       | [DownloadAttribute][DownloadAttribute] |                            | false    |

#### Href Attribute

This is an attribute that checks for the following strings.
It's a relative or absolute path
A word that starts with `tel:` and ends with a phone number.
A http URL
A word that starts with a #.
A word that starts with `mailto:` and ends with an email.

### blockquote

You can use the blockquote tag.It's schema has the cite attribute
built in.

It can only have the following children.

- list
- paragraph
- img

### address

You can use the address tag. It's schema has the following attributes.

- [draggable](../attributes/index.md#draggable)
- [translate](../attributes/index.md#translate)
- [spellcheck](../attributes/index.md#spellcheck)
- [dir](../attributes/index.md#dir)

It can only have the following children.

- inline
- span
- p
- list

#### paragraph

You can use paragraphs and the paragraph tag as well. It's
schema has the following attributes built in.

- [contenteditable](../attributes/index.md#contenteditable)
- [draggable](../attributes/index.md#draggable)
- [title](../attributes/index.md#title)
- [lang](../attributes/index.md#lang)
- [spellcheck](../attributes/index.md#spellcheck)
- [dir](../attributes/index.md#dir)
- [translate](../attributes/index.md#translate)

It can only have the following children.

- inline
- text
- link

## Data Schemas

A [Container Schema](#container) that accepts a property with a key called data
and an value as an object literal is called a **Data Schema**.
It's a schema that takes the keys of each value adds a **data-** as the prefix to it,
lowercase's it, then it mixes that object with attributes that written on the tag.  

:::info The ones that fall into this category are.

- address
- ul
- ol
- details
- p
- img

:::
