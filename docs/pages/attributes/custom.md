# Custom Attributes

Custom Attributes are not exposed by this library.
This library will transform all attributes into what they
are supposed to be when written as HTML If the type isn't a string.

There are some custom attributes are are simply just the value of the `type:`
and nothing else for those situations. The Sentence should look like one of these.

:::info
  
- An attribute that **transforms** an **type** into a
- An attribute that **validates** based on if it's a  
- An attribute that **validates** based on it it's a then transforms it into a
:::

The sections below are all the custom attributes in the library.

:::tip
They will be mentioned as values for the `type:`
on an attribute.
:::

:::tip
GO [here](/attributes/index) for information on schemas.
:::

## PathAttribute

- It validates based on if the value is a relative or absolute path.
- The attribute will be transformed into a trimmed string.

## HttpURLAttribute

It validates based on if it's a valid http URL

## SourceAttribute

It validates based on if the attribute is a valid http url or a valid path

## SrcSet Attribute

This attribute validates the value if it's a.

- A relative or absolute path.
- An array of relative or absolute paths.
- A relative or absolute path spaced with a pixel density.
- An array of relative or absolute paths spaced with a pixel density.
- A relative or absolute path spaced with a number suffixed with `w`  or `vw`.
- An array of relative or absolute paths spaced with a number suffixed with `w`  or `vw`.

If you pass in an array all the values will joined into a string
with a comma at the end of each word.

## Sizes Attribute

This attribute validates the value if it's an array of strings.
That are media queries written without the `@media` keyword and
has a spaced up to 4 digit number with a **v** or vw at the end.

## DownloadAttribute

It validates based on if the value is a boolean or a valid path

## IntegerAttribute

It validates the value only if it's an integer.
