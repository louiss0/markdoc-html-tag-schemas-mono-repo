<!-- markdownlint-disable MD033 -->
<!-- markdownlint-disable MD041 -->

[SourceAttribute]:/attributes/custom#sourceattribute

[SrcSetAttribute]:/attributes/custom#src-set-attribute

[SizesAttribute]:/attributes/custom#sizes-attribute

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
 v-for="{attribute, type, required, matches} of iframeAttributesDataList" :key="attribute"
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
    <template v-for="match of matches">
         <div>{{match}}</div>
    </template>
    </template>
   </td>
  </tr>
 </template>
</tbody>
</table>

## image

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
