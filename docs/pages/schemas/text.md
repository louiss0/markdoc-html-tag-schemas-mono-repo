---
 outline: [2,3]
---

# Text

A text schema is a schema that allows tags that render html tags that
change the text of their children to rendered in Markdoc.
These kinds of schema only allow self-closing tags with primary attributes.
Most of these schemas don't allow any attributes at all.

The ones that do have attributes are specified in the following sections.

Some of them use the primary attribute to create new text that is used as the child.
Those are called [Text Manipulation Schemas](#text-manipulation-schemas).

Here is a list of all schema that belong in that category.

- sup
- sub
- small
- code
- samp
- q
- kbd
- bdo
- bdi
- data
- mark
- dd
- dt
- span

## Ins and Del

The ins and del schemas render the html attributes `<ins>` and `<del>`.

```md
 My favorite color is  {% ins "blue" /%} {% del "red" /%}!.

```

- [cite](../attributes/index.md#cite)
- [datetime](../attributes/index.md#datetime)

## Text Manipulation Schemas

This library also provides schemas that will attempt to transform
it's primary attribute into a different string or string format.
They are **Auto Transform Text Schemas** these schemas attempt to use
the primary attribute and either transform it into something else
or use it in a different attribute.

### abbr

The abbreviation schema will take an set of spaced capitalised words,
then tries to transform them into an abbreviation.
It will the render the abbreviated word as the child of the `<abbr>` element.
The text that was the primary attribute will be the title attribute of the abbr tag.

:::info

Writing this

```md
    {% abbr "Hyper Text Markup Language"  /%}
```

Will create this HTML

```html
    <abbr title=Hyper Text Markup Language >HTML</abbr>
```

:::

:::tip
If you decide to write the title and the primary attribute.
Then the abbreviation tag will behave as normal.
:::

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

## sup

This schema allows `sup` tags to be rendered in markdoc.

```md
4{% sup "3" /%}
```

## sub

 This schema allows `sub` tags to be rendered in markdoc.

```md
5{% sub "4" /%}
```

## small

 This schema allows `small` tags to be rendered in markdoc.

```md
 The color {% small "black" /%} is intimidating.
```

## code

 This schema allows `code` tags to be rendered in markdoc.

```md
The {% code "const" /%} keyword in js is used for not
reassign able variables. 
```

## samp

 This schema allows `samp` tags to be rendered in markdoc.

```md
{% samp "Keyboard not found Press F1 to continue" /%}
```

## mark

 This schema allows `mark` tags to be rendered in markdoc.

```md
I love the {% mark "moonlit" /%} night.
```

## q

 This schema allows `q` tags to be rendered in markdoc.

```md
{% q "Build a future where people live in harmony with nature.</q>
We hope they succeed." /%}
```

## kbd

 This schema allows `kbd` tags to be rendered in markdoc.

```md
{% kbd "Ctrl" /%}
```

## bdo

 This schema allows `bdo` tags to be rendered in markdoc.

```md
{% bdo ", אני אוהב להיות ליד חוף הים" /%}
```

## bdi

 This schema allows `bdi` tags to be rendered in markdoc.

```md
{% bdi "رجل القوي إيان" /%}
```

## data

 This schema allows `data` tags to be rendered in markdoc.

```md
{% data value="398 "Mini Ketchup" /%}
```

## span

 This schema allows `span` tags to be rendered in markdoc.

```md
{% span "Im just here" /%}
```
