---
    outline: [2,3]
---

[SourceAttribute]: /attributes/custom#sourceattribute

[IntegerAttribute]: /attributes/custom#integerattribute

# External Media

When it comes to the use of external media you can use the HTML tags you know.
If you want to download a file you can use the `a` tag in markdoc
and the map and area tag as well. The audio, video tags are also available.
You can use the picture tag and the image tag this section isn't about them.
Information about images can be found [here](/schemas/images).

:::warning

- You must use video with source or track as children.
- You must use  audio with source as a child.

:::

## Audio and Video

The audio tag allows you to play audio by linking to a file.
The video tag allows you to play video by linking to a file.

:::info
They both share the following attributes With the following values.
:::

### autoplay

| key      | value   |
| -------- | ------- |
| type     | Boolean |
| required | false   |

### controls

| key      | value   |
| -------- | ------- |
| type     | Boolean |
| required | false   |

### loop

| key      | value   |
| -------- | ------- |
| type     | Boolean |
| required | false   |

### muted

| key      | value   |
| -------- | ------- |
| type     | Boolean |
| required | false   |

### controlslist

| key      | value                                    |
| -------- | ---------------------------------------- |
| type     | String                                   |
| required | false                                    |
| matches  | nodownload,nofullscreen,noremoteplayback |

### crossorigin

| key      | value                      |
| -------- | -------------------------- |
| type     | String                     |
| required | false                      |
| matches  | anonymous,use-credentials, |

### Unique to Audio

#### preload

| key      | value                |
| -------- | -------------------- |
| type     | String               |
| required | false                |
| matches  | none,metadata,audio, |

### Unique to Video

#### playsinline

| key      | value   |
| -------- | ------- |
| type     | Boolean |
| required | false   |

#### poster

| key      | value  |
| -------- | ------ |
| type     | String |
| required | false  |

#### width

| key      | value                                |
| -------- | ------------------------------------ |
| type     | [IntegerAttribute][IntegerAttribute] |
| required | false                                |

#### height

| key      | value                                |
| -------- | ------------------------------------ |
| type     | [IntegerAttribute][IntegerAttribute] |
| required | false                                |

## Iframe

You can use an iframe as well it's a tag that allows you to display a website inside of another website.
 It's a [Leaf Schema](/attributes/index#leaf-schema) with the following attributes.

### src

| key      | value                              |
| -------- | ---------------------------------- |
| type     | [SourceAttribute][SourceAttribute] |
| required | true                               |

### allow

| key      | value          |
| -------- | -------------- |
| type     | AllowAttribute |
| required | true           |

#### Allow Attribute

The AllowAttribute is an attribute that looks for and object with
**keys** that are **one or more** of the following words.

- camera
- display-capture
- fullscreen
- gamepad
- geolocation
- microphone
- web-share

The values of each property must be either

- A *****.
- A string that starts with either src or self and ends with a http url.

:::info It will then transform that object into a string that places all keys and values side by side.
This code will transform

```md
    {% iframe 
        allow={
        camera:"'src' http://example.com"
        microphone:"'src' http://example.com"
        } 
    /%}
```

into this code.

```html
    <iframe 
        allow="camera 'src' http://example.com microphone 'src' http://example.com"
    />
```

:::

### name

| key      | value                              |
| -------- | ---------------------------------- |
| type     | [SourceAttribute][SourceAttribute] |
| required | false                              |

### loading

| key      | value                              |
| -------- | ---------------------------------- |
| type     | [SourceAttribute][SourceAttribute] |
| required | false                              |

### sandbox

| key      | value                              |
| -------- | ---------------------------------- |
| type     | [SourceAttribute][SourceAttribute] |
| required | false                              |

:::info This attribute checks for one of the following values.

- allow-downloads
- allow-forms
- allow-modals
- allow-orientation-lock
- allow-pointer-lock
- allow-popups
- allow-popups-to-escape-sandbox
- allow-same-origin
- allow-scripts
- allow-top-navigation
- allow-top-navigation-by-user-activation
- allow-top-navigation-to-custom-protocols

:::

#### width

| key      | value                                |
| -------- | ------------------------------------ |
| type     | [IntegerAttribute][IntegerAttribute] |
| required | false                                |

#### height

| key      | value                                |
| -------- | ------------------------------------ |
| type     | [IntegerAttribute][IntegerAttribute] |
| required | false                                |
