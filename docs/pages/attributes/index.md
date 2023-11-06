
[IntegerAttribute]: /attributes/custom#integerattribute
[SourceAttribute]: /attributes/custom#sourceattribute

# Attributes

:::tip
 If you want to see the custom attributes click [here](/attributes/custom)
:::

## style

| key      | value                                                                                 |
| -------- | ------------------------------------------------------------------------------------- |
| type     | An attribute that validates based on an object if so it will transform into a string. |
| required | false                                                                                 |

:::info
 The transformed string will be lowercased with a `:` at the end of the key
 and a `;` at the end of the value.
:::

:::info This written code

```md
{% div style={fontSize:30px} %}
    Text here
{% /div  %}

```

:::

:::info Will transform into this

```html
<div style="font-size:30px;">
    Text here
</div>
```

:::

## target

| key      | value                       |
| -------- | --------------------------- |
| type     | String                      |
| matches  | _target,_blank,_parent,_top |
| required | false                       |

## tabindex

| key      | value                                |
| -------- | ------------------------------------ |
| type     | [IntegerAttribute][IntegerAttribute] |
| required | false                                |

## hidden

| key      | value   |
| -------- | ------- |
| type     | Boolean |
| required | false   |

## refferpolicy

| key      | value  |
| -------- | ------ |
| required | false  |
| type     | String |

:::info This attribute tries check if the the value is one of these.

- no-referrer
- no-referrer-when-downgrade
- origin
- origin-when-cross-origin
- same-origin
- strict-origin-when-cross-origin
- unsafe-url,

:::

## title

| key      | value                                                           |
| -------- | --------------------------------------------------------------- |
| type     | An attribute that validates the value if it's a proper sentence |
| required | false                                                           |

## width

| key      | value                                |
| -------- | ------------------------------------ |
| type     | [IntegerAttribute][IntegerAttribute] |
| required | false                                |

## height

| key      | value                                |
| -------- | ------------------------------------ |
| type     | [IntegerAttribute][IntegerAttribute] |
| required | false                                |

## cite

| key      | value                              |
| -------- | ---------------------------------- |
| type     | [SourceAttribute][SourceAttribute] |
| required | false                              |

## datetime

| key      | value                                                              |
| -------- | ------------------------------------------------------------------ |
| type     | An attribute that validates the value if it's a viable date string |
| required | false                                                              |

## translate

| key     | value  |
| ------- | ------ |
| type    | String |
| matches | yes,no |
| default | yes    |

## lang

| key     | value  | matches |
| ------- | ------ | ------- |
| type    | String | az-Arab |
|         |        | ba      |
|         |        | bal     |
|         |        | ban     |
|         |        | bar     |
|         |        | bas     |
|         |        | bax     |
|         |        | bbc     |
|         |        | bbj     |
|         |        | be      |
|         |        | bej     |
|         |        | bem     |
|         |        | bew     |
|         |        | bez     |
|         |        | bfd     |
|         |        | bfq     |
|         |        | bg      |
|         |        | bgn     |
|         |        | bho     |
|         |        | bi      |
|         |        | bik     |
|         |        | bin     |
|         |        | bjn     |
|         |        | bkm     |
|         |        | bla     |
|         |        | bm      |
|         |        | bn      |
|         |        | bo      |
|         |        | bpy     |
|         |        | bqi     |
|         |        | br      |
|         |        | bra     |
|         |        | brh     |
|         |        | brx     |
|         |        | bs      |
|         |        | bss     |
|         |        | bua     |
|         |        | bug     |
|         |        | bum     |
|         |        | byn     |
|         |        | byv     |
|         |        | ca      |
|         |        | cad     |
|         |        | car     |
|         |        | cay     |
|         |        | cch     |
|         |        | ccp     |
|         |        | ce      |
|         |        | ceb     |
|         |        | cgg     |
|         |        | ch      |
|         |        | chb     |
|         |        | chg     |
|         |        | chk     |
|         |        | chm     |
|         |        | chn     |
|         |        | cho     |
|         |        | chp     |
|         |        | chr     |
|         |        | chy     |
|         |        | ckb     |
|         |        | co      |
|         |        | cop     |
|         |        | cps     |
|         |        | cr      |
|         |        | crh     |
|         |        | crs     |
|         |        | cs      |
|         |        | csb     |
|         |        | cu      |
|         |        | cv      |
|         |        | cy      |
|         |        | da      |
|         |        | dak     |
|         |        | dar     |
|         |        | dav     |
|         |        | de      |
|         |        | del     |
|         |        | den     |
|         |        | dgr     |
|         |        | din     |
|         |        | dje     |
|         |        | doi     |
|         |        | dsb     |
|         |        | dtp     |
|         |        | dua     |
|         |        | dum     |
|         |        | dv      |
|         |        | dyo     |
|         |        | dyu     |
|         |        | dz      |
|         |        | dzg     |
|         |        | ebu     |
|         |        | ee      |
|         |        | efi     |
|         |        | egl     |
|         |        | egy     |
|         |        | eka     |
|         |        | el      |
|         |        | elx     |
|         |        | en      |
|         |        | en-AU   |
|         |        | en-CA   |
|         |        | en-GB   |
|         |        | en-US   |
|         |        | enm     |
|         |        | eo      |
|         |        | es      |
|         |        | es-419  |
|         |        | es-AR   |
|         |        | es-CL   |
|         |        | es-CO   |
|         |        | es-CR   |
|         |        | es-EC   |
|         |        | es-ES   |
|         |        | es-GT   |
|         |        | es-HN   |
|         |        | es-MX   |
|         |        | es-NI   |
|         |        | es-PA   |
|         |        | es-PE   |
|         |        | es-PR   |
|         |        | es-PY   |
|         |        | es-SV   |
|         |        | es-US   |
|         |        | es-UY   |
|         |        | es-VE   |
|         |        | et      |
|         |        | eu      |
|         |        | ewo     |
|         |        | ext     |
|         |        | fa      |
|         |        | fa-AF   |
|         |        | ff      |
|         |        | ff-Adlm |
|         |        | ff-Latn |
|         |        | fi      |
|         |        | fil     |
|         |        | fit     |
|         |        | fj      |
|         |        | fo      |
|         |        | fon     |
|         |        | fr      |
|         |        | fr-CA   |
|         |        | fr-CH   |
|         |        | frc     |
|         |        | frm     |
|         |        | fro     |
|         |        | frp     |
|         |        | frr     |
|         |        | frs     |
|         |        | fur     |
|         |        | fy      |
|         |        | ga      |
|         |        | gaa     |
|         |        | gag     |
|         |        | gan     |
|         |        | gay     |
|         |        | gba     |
|         |        | gbz     |
|         |        | gd      |
|         |        | gez     |
|         |        | gil     |
|         |        | gl      |
|         |        | glk     |
|         |        | gmh     |
| default | en     |

:::info This attribute tries to match the following values



:::

## dir

| key     | value        |
| ------- | ------------ |
| type    | String       |
| matches | auto,ltr,rtl |
| default | auto         |

## draggable

| key      | value  |
| -------- | ------ |
| type     | String |
| required | false  |

## spellcheck

| key      | value  |
| -------- | ------ |
| type     | String |
| required | false  |

## contenteditable

| key      | value  |
| -------- | ------ |
| type     | String |
| required | false  |
