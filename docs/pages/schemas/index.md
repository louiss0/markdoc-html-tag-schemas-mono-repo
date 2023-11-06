[IntegerAttribute]: /attributes/custom#integerattribute

[markdoc]: https://markdoc.dev

[w3 schools]: https://www.w3schools.com

[mozilla developer network]: https://developer.mozilla.org

[SourceAttribute]: /attributes/custom#sourceattribute

[DownloadAttribute]: /attributes/custom#downloadattribute

# Schemas

This library is created to configure [Markdoc][markdoc] to use schemas that represent HTML.
This is done according to the research I conducted using
[Mozilla Developer Network][mozilla developer network] and [W3 Schools][w3 schools].
This means that they are schemas that respect HTML rules and standards.
I have decided to only created schemas for HTML tags that are used to write articles.
This means no headers,main,section, or footer and no form related and no div tags.

The sections below are meant to show you how schemas work in general and the attributes
that I decided to place on each schema. The names of all the schemas in this library
are documented in this page [External Media](/schemas/external-media) and [Images](/schemas/images).

:::tip
The name of the schema is the name of the tag that will be rendered.
:::

## Text Schemas

A schema that takes a required primary attribute and uses it as a child.
All of them are self-closing and most of them are not.
They require the use of a primary attribute which is a string.
Some of them use the primary attribute to create new text that is used as the child.
Those are called [Auto Text Transform Schemas](#auto-transform-text-schemas).

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

### Ins and Del

Both the ins and del schemas have the following attributes.

| attribute | type                                                             | required |
| --------- | ---------------------------------------------------------------- | -------- |
| cite      | [SourceAttribute][SourceAttribute]                               | false    |
| datetime  | An attribute that validates the value only if it's a date string | false    |

## Auto Transform Text Schemas

This library also provides schemas that will attempt to transform
it's primary attribute into a different string or string format.
They are **Auto Transform Text Schemas** these schemas attempt to use
the primary attribute and either transform it into something else
or use it in a different attribute.

:::info
The following sections are the schemas that do what is said above.
:::

### abbr

The abbreviation schema will take an set of spaced capitalised words,
then tries to transform them into an abbreviation.
It will the render the abbreviated word as the child of the `<abbr>` element.
The text that was the primary attribute will be the title attribute of the abbr tag.

:::info

Writing this

```md
    {% abbr Hyper Text Markup Language  /%}
```

Will create this HTML

```html
    <abbr title=Hyper Text Markup Language >HTML</abbr>
```

:::

If you decide to write the title and the primary attribute.
Then the abbreviation tag will behave as normal.

### time

The time tag will try to use the primary attribute to render a time with a child,
that has a `datetime=` that is a locale date string
The is.

| key   | value   |
| ----- | ------- |
| year  | numeric |
| month | short   |
| day   | numeric |

The datetime attribute will automatically rendered as an ISO String.

:::info

This will

```md
    {% time 12-26-1960 /%}
```

Render this.

```html
    <time datetime=1960-12-26T00:00:00.000Z>1960, 26 Dec</time>
```

:::

If you specify your own `datetime=` the time tag will be rendered as normal.

## Container Schemas

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

### Lists

You can have ordered and unordered lists with attributes by using the `ol` and `ul` tags.
You can't write attributes on lists but you can now do so with this library.
You can even use the `li` tag as only a self closing one.

:::info The following attributes are allowed

- title
- spellcheck
- lang
- translate
- dir

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

- hidden
- style

| span | type                                 | required |
| ---- | ------------------------------------ | -------- |
| span | [IntegerAttribute][IntegerAttribute] | false    |

### Definitions

Definition list are available through the `dl` container schema
and the `dd` and `dt` text schemas.  

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

| attribute      | type                                   | required | matches                                                        |
| -------------- | -------------------------------------- | -------- | -------------------------------------------------------------- |
| href           | String                                 | true     | - It's a relative or absolute path                             |
|                |                                        |          | - A http URL                                                   |
|                |                                        |          | - A word that starts with `mailto:` and ends with an email.    |
|                |                                        |          | - A word that starts with `tel:` and ends with a phone number. |
|                |                                        |          | - A word that starts with a #.                                 |
| type           | String                                 | false    |                                                                |
| referrerpolicy | String                                 | false    | - no-referrer                                                  |
|                |                                        |          | - no-referrer-when-downgrade                                   |
|                |                                        |          | - origin                                                       |
|                |                                        |          | - origin-when-cross-origin                                     |
|                |                                        |          | - same-origin                                                  |
|                |                                        |          | - strict-origin                                                |
|                |                                        |          | - strict-origin-when-cross-origin                              |
|                |                                        |          | - unsafe-url                                                   |
| download       | [DownloadAttribute][DownloadAttribute] | false    |                                                                |

### Others

#### blockquote

You can use the blockquote tag.It's schema has the cite attribute
built in.

It can only have the following children.

- list
- paragraph
- img

#### address

You can use the address tag. It's schema has the following attributes.

- draggable
- translate
- spellcheck
- dir

It can only have the following children.

- inline
- span
- paragraph
- list

#### paragraph

You can use paragraphs and the paragraph tag as well. It's
schema has the following attributes built in.

- contenteditable,
- draggable,
- title,
- lang,
- spellcheck,
- dir,
- translate

It can only have the following children.

- inline
- text
- link

## Leaf Schemas

A leaf schema is a self-closing schema with no primary attribute.
They are typically used to render HTML tags that are supposed to be self-closing
and use attributes as a way to make the so special things.

:::info The ones that fall into this category are.

- source
- hr
- br
- track
- img

:::

## Data Schemas

A [Container Schema](#container-schemas) that accepts a property with a key called data
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
