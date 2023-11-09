<!-- markdownlint-disable MD033 -->
<!-- markdownlint-disable MD041 -->

[SourceAttribute]:/attributes/custom#sourceattribute

<script setup lang="ts">
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

const imageAttributesList = [
    { attribute:'src',
      type:{
        href:'/attributes/custom#sourceattribute',
        text:''
    },
    errorLevel:'critical',
    required:'true',
  },
    { attribute:'srcset',
      type:{
        href:'/attributes/custom#srcset-attribute',
        text:''
    },
    errorLevel:'critical',
    required:'true',
  },
    { attribute:'sizes',
      type:{
        href:'/attributes/custom#sizes-attribute',
        text:''
    },
    errorLevel:'warning',
    required:'true',
  },
  {
    attribute:'alt',
    type:'String',
    required:'true',
  },
  {
    attribute:'crossorigin',
    type:'String',
    matches: [
        'anonymous',
        'use-credentials'
    ]
  },
  {
    attribute:'fetchpriority',
    type:'String',
    matches: [
        'high',
        'low',
        'auto'
    ]
  },
  {
    attribute:'decoding',
    type:'String',
    matches: [
        'auto',
        'sync',
        'async'
    ]
  },
  {
    attribute:'loading',
    type:'String',
    matches: [
        'eager',
        'lazy'
    ]
  },
]

const trackAttributesList = [
  {
    attribute: 'src',
      type:{
        href:'/attributes/custom#sourceattribute',
        text:''
    },
    required:'true',
  },
  {
    attribute: 'srclang',
    type: "Boolean",
    reference: {
      href: "attributes/index.md#lang",
      text: "lang"
    }
  },{
    attribute: 'default',
    type:"Boolean",
  },
  {
    attribute: 'label',
    type:"String",
  },
  
  {
    attribute: 'kind',
    type: "String",
    matches: [
          "captions",
          "chapters",
          "descriptions",
          "metadata",
          "subtitles",
        ]
  },
]

</script>

# Leaf

A leaf schema is a self-closing schema with no primary attribute.
They are typically used to render HTML tags that are supposed to be self-closing
and use attributes as a way to make the so special things.

:::info The ones that fall into this category are.

- source
- hr
- br
- track
- img
- wbr

:::

## iframe

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

<AttributeTable :attributeList="iframeAttributesDataList" />

## image

A schema that allows the use of the `img` tag in Markdoc.

```md
{%img src="flower.jpg" /%}
```

:::info This schema has supports the following global attributes.

- [width](../attributes/index.md#width)
- [height](../attributes/index.md#height)
- [refferpolicy](../attributes/index.md#refferpolicy)

:::

<AttributeTable :attributeList="imageAttributesList" />

## track

A schema that allows the use of the `track` tag in Markdoc.

```md
{% video %}
  {%track src="/media/examples/friday.vtt" /%}
{% /video %}
```

```md
{% audio %}
  {%track src="track.mp4" /%}
{% /audio %}
```

<AttributeTable :attributeList="trackAttributesList" />

## wbr

 This schema allows `wbr` tags to be rendered in markdoc.

```md
{% wbr  /%}
```

## br

 This schema allows `br` tags to be rendered in markdoc.

```md
{% br  /%}
```

## hr

 This schema allows `hr` tags to be rendered in markdoc.

```md
{% hr  /%}
```
