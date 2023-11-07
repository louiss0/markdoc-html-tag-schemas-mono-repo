<!-- markdownlint-disable MD033 -->
<!-- markdownlint-disable MD041 -->

[SourceAttribute]: /attributes/custom#sourceattribute

[IntegerAttribute]: /attributes/custom#integerattribute

[SizesAttribute]: ./external-media/custom#sizes-attribute

[SrcSetAttribute]: ./external-media#srcset-attribute

[MediaAttribute]: ./external-media#media-attribute

<script setup>

const iframeAttributesDataList = [
    {
        attribute:"name",
        type: {
            href:"/attributes/custom#sourceattribute",
            text:"SourceAttribute",
        },
        required: "false",
     },
    {
        attribute:"loading",
        type: "String",
        required: "false",
        matches: [
            "eager",
            "lazy",
        ]
     },
    {
        attribute:"sandbox",
        type: "String",
        required: "false",
        matches: [
            "allow-top-navigation-to-custom-protocols",
             "allow-top-navigation-by-user-activation",
             "allow-top-navigation",
              "allow-scripts",
              "allow-same-origin",
              "allow-popups-to-escape-sandbox",
              "allow-popups allow-pointer-lock",
              "allow-orientation-lock",
            "allow-modals",
            "allow-forms",
            "allow-downloads",
        ]
     },
    {
        attribute:"width",
        type: {
            href:"/attributes/custom#integerattribute",
            text:"IntegerAttribute",
        },
        required: "false",
     },
    {
        attribute:"height",
        type: {
            href:"/attributes/custom#integerattribute",
            text:"IntegerAttribute",
        },
        required: "false",
     },
]

</script>

# External Media

When it comes to the use of external media you can use the HTML tags you know.
If you want to download a file you can use the `a` tag in markdoc
and the map and area tag as well. The audio, video tags are also available.
You can use the picture tag and the image tag this section isn't about them.
Information about images can be found [here](/schemas/images).

:::danger
 The audio video and picture tag must use a source to render anything.
 We don't allow any use of a `src=` attribute at all.

It's easier to omit it's use whether than to check if it exists
and the tag has no child at all.
:::

## Audio and Video

The audio tag allows you to play audio by linking to a file.

```md
{%audio %}
    {%source src="audio.mp4" /%}
{% /audio %}
```

The video tag allows you to play video by linking to a file.

```md
{%video %}
    {%source src="video.mp4" /%}
{% /video %}
```

:::info
They both share the following attributes With the following values.

| attribute    | type    | required | matches                                    |
| ------------ | ------- | -------- | ------------------------------------------ |
| autoplay     | Boolean | false    |                                            |
| controls     | Boolean | false    |                                            |
| loop         | Boolean | false    |                                            |
| muted        | Boolean | false    |                                            |
| controlslist | String  | false    | nodownload, nofullscreen, noremoteplayback |
| crossorigin  | String  | false    | anonymous, use-credentials,                |

:::

:::info Unique to Audio

| attribute | type   | required | matches              |
| --------- | ------ | -------- | -------------------- |
| preload   | String | false    | none,metadata,audio, |
:::

:::info Unique to Video

| attribute   | type                                 | required |
| ----------- | ------------------------------------ | -------- |
| playsinline | Boolean                              | false    |
| poster      | String                               | false    |
| width       | [IntegerAttribute][IntegerAttribute] | false    |
| height      | [IntegerAttribute][IntegerAttribute] | false    |
:::

## Iframe

You can use an iframe as well it's a tag that allows you to display a website inside of another website.
 It's a [Leaf Schema](/attributes/index#leaf-schema) with the following attributes.

 ```md
 {% iframe 
    src="https://forastro-docs.onrender.com/libraries/utilities/content-collection-helpers" 
 /%}
 ```

| attribute | type                               | required |
| --------- | ---------------------------------- | -------- |
| src       | [SourceAttribute][SourceAttribute] | true     |
| allow     | [AllowAttribute](#allow-attribute) | false    |

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
- A string that starts with either `'src'` or `'self'` and ends with a http url.

:::warning Beware
**src** and **self** must be written with quotes,
:::

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

<table>
<caption>
Iframe Attributes
</caption>
<thead>
 <th>attribute</th>
 <th>type</th>
 <th>required</th>
 <th>matches</th>
</thead>
<tbody>
 <template
 v-for="{attribute, type, required, matches,} of iframeAttributesDataList" :key="attribute"
 >
  <tr>
   <td>{{attribute}}</td>
   <template v-if="typeof type === 'string'">
   <td>{{type}}</td>
   </template>
   <template v-else>
   <td>
   <a :href="type.href">
    {{type.text}}
   </a>
   </td>
   </template>
   <td>{{required}}</td>
   <td>
    <template v-if="matches">
    <template v-for="(match, index) of matches">
         <div>{{match}}</div>
    </template>
    </template>
   </td>
  </tr>
 </template>
</tbody>
</table>

## Images

You can use the image tag and the picture tag in markdoc when using this library.
When you do use them. When it comes to the image node
the src,title and alt attribute are validated in the
same way is the image tag. The image tag allows for the use
of all the attributes that are needed in the img tag.

The picture tag requires the use of the source tag to make it function.
When it comes to using the picture tag it must have a source in order for it to work.

### Image Tag

:::info This tag supports the following global attributes.

- [width](../attributes/index.md#width)
- [height](../attributes/index.md#height)
- [refferpolicy](../attributes/index.md#refferpolicy)

:::

| attribute     | type                               | required | error Level | matches                   |
| ------------- | ---------------------------------- | -------- | ----------- | ------------------------- |
| src           | [SourceAttribute][SourceAttribute] | true     | critical    |                           |
| srcset        | [SrcSetAttribute][SrcSetAttribute] | false    | critical    |                           |
| sizes         | [SizesAttribute][SizesAttribute]   | false    | warning     |                           |
| alt           | String                             | true     |             |                           |
| crossorigin   | Attribute                          | false    |             | anonymous,use-credentials |
| decoding      | String                             | false    |             | auto,sync,async           |
| fetchpriority | String                             | false    |             | high,low,auto             |
| loading       | String                             | false    |             | eager,lazy                |

### The Picture Tag

```md
{%picture %}
    {%source srcset="audio.mp4" /%}
{% /picture %}
```

The picture tag is a tag that only requires the source and img tag as children. It will validate the source tags,
only if they have a `srcset=` attribute.

### The source tag

The source tag is a tag that can't be used on it's own. It must be used as the child of the picture,audio and video tags.

It has the following attributes.

| attribute | type                               | required | error Level |
| --------- | ---------------------------------- | -------- | ----------- |
| src       | [SourceAttribute][SourceAttribute] | true     | critical    |
| srcset    | [SrcSetAttribute][SrcSetAttribute] | false    | critical    |
| sizes     | [SizesAttribute][SizesAttribute]   | false    | warning     |
| media     | [MediaAttribute][MediaAttribute]   | true     |             |

#### SrcSet Attribute

This attribute validates the value if it's a.

- A relative or absolute path.
- An array of relative or absolute paths.
- A relative or absolute path spaced with a pixel density.
- An array of relative or absolute paths spaced with a pixel density.
- A relative or absolute path spaced with a number suffixed with `w`  or `vw`.
- An array of relative or absolute paths spaced with a number suffixed with `w`  or `vw`.

If you pass in an array all the values will joined into a string
with a comma at the end of each word.

#### Sizes Attribute

This attribute validates the value if it's an array of strings.
That are media queries written without the `@media` keyword and
has a spaced up to 4 digit number with a **v** or vw at the end.

#### Media Attribute

The Media Attribute is an attribute that validates a value if it's is a string that
conforms to the required format for writing media and device media queries.

:::tip
For the required media queries check out this [page](https://www.w3schools.com/tags/att_source_media.asp) under **Syntax**.
:::