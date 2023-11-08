[IntegerAttribute]: /attributes/custom#integerattribute

[DownloadAttribute]: /attributes/custom#downloadattribute

[Media Types]: https://www.iana.org/assignments/media-types/media-types.xhtml

# Container

A container schema is a schema for any html tag that can contain children.
Some of them are created to enforce the relationships between them.
They will never be self-closing, have a primary attribute or be inline.
Some of them only validate specific children that are supposed to be
inside of them according to the HTML spec.

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

## Definitions

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

## colgroup

You can now specify columns in a table by using the colgroup and col.
Both of them share the following attributes.

```md
{%colgroup %}
    {%col "content one" /%}
    {%col "content two" span=2 /%}
{% /colgroup %}
```

- [hidden](../attributes/index.md#hidden)
- [style](../attributes/index.md#style)

| span | type                                 | required |
| ---- | ------------------------------------ | -------- |
| span | [IntegerAttribute][IntegerAttribute] | false    |

## a

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

### Href Attribute

This is an attribute that checks for the following strings.
It's a relative or absolute path
A word that starts with `tel:` and ends with a phone number.
A http URL
A word that starts with a #.
A word that starts with `mailto:` and ends with an email.

## blockquote

A schema that allows you to render the blockquote tag in Markdoc.

```md
{% blockquote 
    cite="https://www.builder.io/blog/wtf-is-code-extraction#export-extraction" 
%}
   Export extraction is a way to remove server code from the client bundle by relying on the bundle tree-shaker behavior.

-- Misko Hevery 
{%/blockquote %}
```

It only allows these attributes.

- [cite](../attributes/index.md#cite)
- [hidden](../attributes/index.md#hidden)

It validates only these nodes in the blockquote tag.

- list
- paragraph
- img
- fence

It validates only these tags.

- p
- ul
- ol
- img

### paragraph

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

```mdoc
  {% p 
    data={
        theme:"dark"
    } 
  %}
  I remember you were walking from the east when I saw you.
  {% /p %}
```

:::info The ones that fall into this category are.

- ul
- ol
- details
- p

:::

### Lists

There are schemas for writing HTML lists in Markdoc.
Those are called `ul` and `ol`. They both only validate
the `li` tag and only allow list nodes.

:::info The following attributes are also allowed

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

## details

A schema that allows you to render details.

```md
{% details %}
    {% summary "The dog ate my homework" /%}
{% /details %}
```

:::warning It validates only the following nodes.
  
- paragraph
- fence
- image
- list

:::

:::warning It validates only the following tags.
  
- p
- summary
- ol
- ul

:::

::info Extra Attributes

| attribute | type   | required |
| --------- | ------ | -------- |
| open      | String | false    |
:::
