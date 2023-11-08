---
 outline: [2,3]
---
# Text

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

## Ins and Del

The ins and del schemas render the html attributes `<ins>` and `<del>`.

```md
 My favorite color is  {% ins "blue" /%} {% del "red" /%}!.

```

- [cite](../attributes/index.md#cite)
- [datetime](../attributes/index.md#datetime)

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
    {% abbr "Hyper Text Markup Language"  /%}
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