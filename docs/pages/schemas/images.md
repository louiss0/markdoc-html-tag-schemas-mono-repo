---
    outline: [2,3]
---
[SizesAttribute]: /attributes/custom#sizesattribute

[SrcSetAttribute]: /attributes/custom#srcsetattribute

[MediaAttribute]: /attributes/custom#srcsetattribute

[SourceAttribute]: /attributes/custom#sourceattribute

# Images

You can use the image tag and the picture tag in markdoc when using this library.
When you do use them. When it comes to the image node
the src,title and alt attribute are validated in the
same way is the image tag. The image tag allows for the use
of all the attributes that are needed in the img tag.

The picture tag requires the use of the source tag to make it function.
When it comes to using the picture tag it must have a source in order for it to work.

## Image Attributes

:::info This schema supports the following global attributes.

- width
- height
- refferpolicy

:::

### src

| key        | value                              |
| ---------- | ---------------------------------- |
| type       | [SourceAttribute][SourceAttribute] |
| required   | true                               |
| errorLevel | critical                           |

### alt

| key      | value  |
| -------- | ------ |
| type     | String |
| required | true   |

### srcset

| key        | value                              |
| ---------- | ---------------------------------- |
| type       | [SrcSetAttribute][SrcSetAttribute] |
| required   | false                              |
| errorLevel | critical                           |

### sizes

| key        | value                            |
| ---------- | -------------------------------- |
| type       | [SizesAttribute][SizesAttribute] |
| required   | false                            |
| errorLevel | warning                          |

### crossorigin

| key      | value                     |
| -------- | ------------------------- |
| type     | Attribute                 |
| required | false                     |
| matches  | anonymous,use-credentials |

### decoding

| key      | value           |
| -------- | --------------- |
| type     | String          |
| required | false           |
| matches  | auto,sync,async |

### fetchpriority

| key      | value         |
| -------- | ------------- |
| type     | String        |
| required | false         |
| matches  | high,low,auto |

### loading

| key      | value      |
| -------- | ---------- |
| type     | String     |
| required | false      |
| matches  | eager,lazy |

## The Picture Tag

The picture tag is a tag that only requires the source and img tag as children. It will validate the source tags,
only if they have a `srcset=` attribute.

## The source tag

The source tag is a tag that can't be used on it's own. It must be used as the child of the picture,audio and video tags.
x
It has the following attributes.

### src

| key      | value                              |
| -------- | ---------------------------------- |
| type     | [SourceAttribute][SourceAttribute] |
| required | true                               |

### srcset

| key      | value                              |
| -------- | ---------------------------------- |
| type     | [SrcSetAttribute][SrcSetAttribute] |
| required | true                               |

### sizes

| key      | value                            |
| -------- | -------------------------------- |
| type     | [SizesAttribute][SizesAttribute] |
| required | true                             |

### media

| key      | value                            |
| -------- | -------------------------------- |
| type     | [MediaAttribute][MediaAttribute] |
| required | true                             |

### media

| key      | value                            |
| -------- | -------------------------------- |
| type     | [MediaAttribute][MediaAttribute] |
| required | true                             |


