
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

| attribute    | type    | required | matches                                    |
| ------------ | ------- | -------- | ------------------------------------------ |
| autoplay     | Boolean | false    |                                            |
| controls     | Boolean | false    |                                            |
| loop         | Boolean | false    |                                            |
| muted        | Boolean | false    |                                            |
| controlslist | String  | false    | nodownload, nofullscreen, noremoteplayback |
| crossorigin  | String  | false    | anonymous, use-credentials,                |

### Unique to Audio

| attribute | type   | required | matches              |
| --------- | ------ | -------- | -------------------- |
| preload   | String | false    | none,metadata,audio, |

### Unique to Video

| attribute   | type                                 | required |
| ----------- | ------------------------------------ | -------- |
| playsinline | Boolean                              | false    |
| poster      | String                               | false    |
| width       | [IntegerAttribute][IntegerAttribute] | false    |
| height      | [IntegerAttribute][IntegerAttribute] | false    |

## Iframe

You can use an iframe as well it's a tag that allows you to display a website inside of another website.
 It's a [Leaf Schema](/attributes/index#leaf-schema) with the following attributes.

| attribute | type                               | required |
| --------- | ---------------------------------- | -------- |
| src       | [SourceAttribute][SourceAttribute] | true     |
| allow     | [AllowAttribute](#allow-attribute) | true     |

### Allow Attribute

The AllowAttribute is an attribute that looks for and object with
**types** trequired are **one or more** of the following words.

- camera
- display-capture
- fullscreen
- gamepad
- geolocation
- microphone
- web-share

The values of each property must be either

- A "*".
- A string that starts with either src or self and ends with a http url.

:::info It will then transform that object into a string that places all types and required side by side.

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

| attribute | type                                 | required | matches                                  |
| --------- | ------------------------------------ | -------- | ---------------------------------------- |
| name      | [SourceAttribute][SourceAttribute]   | false    |                                          |
| loading   | [SourceAttribute][SourceAttribute]   | false    |                                          |
| sandbox   | string                               | false    | allow-downloads                          |
|           |                                      |          | allow-forms                              |
|           |                                      |          | allow-modals                             |
|           |                                      |          | allow-orientation-lock                   |
|           |                                      |          | allow-pointer-lock                       |
|           |                                      |          | allow-popups                             |
|           |                                      |          | allow-popups-to-escape-sandbox           |
|           |                                      |          | allow-same-origin                        |
|           |                                      |          | allow-scripts                            |
|           |                                      |          | allow-top-navigation                     |
|           |                                      |          | allow-top-navigation-by-user-activation  |
|           |                                      |          | allow-top-navigation-to-custom-protocols |
| width     | [IntegerAttribute][IntegerAttribute] | false    |                                          |
| height    | [IntegerAttribute][IntegerAttribute] | false    |                                          |
