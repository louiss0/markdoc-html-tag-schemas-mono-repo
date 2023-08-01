
import { generateMarkdocErrorObjectThatHasAMessageThatTellsTheUserATypeIsNotRight, generateMarkdocErrorObjectThatHasAMessageThatTellsTheUserAValueIsNotRight, getGenerateSelfClosingTagSchema } from "packages/markdoc-html-tag-schemas/src/utils";
import { MarkdocValidatorAttribute, } from 'packages/markdoc-html-tag-schemas/src/lib/custom-attributes';
import { MarkdocAttributes } from "packages/markdoc-html-tag-schemas/src/lib/attributes";
import type { ValidationError } from "@markdoc/markdoc";
export { abbr } from "packages/markdoc-html-tag-schemas/src/lib/schema/tag/abbreviation"


//* Inline tags

// const getGenerateSelfClosingTagSchema<StringConstructor, "del">() = getGenerateSelfClosingTagSchema<StringConstructor, "del">()

export const sup = getGenerateSelfClosingTagSchema<StringConstructor, "sup">()({
    render: "sup",
    type: String,
    description: "A schema for creating a sup element"
},{});



export const li = getGenerateSelfClosingTagSchema<StringConstructor, "li">()({
    render: "li",
    type: String,
    description: "A schema for creating a sup element"
}, { inline: false });


export const small = getGenerateSelfClosingTagSchema<StringConstructor, "small">()({
    render: "small",
    type: String,
    description: "A schema for creating a sup element",

},{});

export const wbr = getGenerateSelfClosingTagSchema<StringConstructor, "wbr">()({
    render: "wbr",
    type: String,
    description: "A schema for creating a sup element"
},{});



export const del = getGenerateSelfClosingTagSchema<StringConstructor, "del">()({
    render: "del",
    type: String,
    description: "A schema for creating a sup element"
}, {
    attributes: {
        cite: MarkdocAttributes.cite,
        datetime: MarkdocAttributes.datetime
    }
});


export const ins = getGenerateSelfClosingTagSchema<StringConstructor, "ins">()({
    render: "ins",
    type: String,
    description: "A schema for creating a sup element"
}, {
    attributes: {
        cite: MarkdocAttributes.cite,
        datetime: MarkdocAttributes.datetime

    }
});


export const sub = getGenerateSelfClosingTagSchema<StringConstructor, "sub">()({
    render: "sub",
    type: String,
    description: "A schema for creating a sub element"
},{});


export const cite = getGenerateSelfClosingTagSchema<StringConstructor, "cite">()({
    render: "cite",
    type: String,
    description: "A schema for creating a cite element"
},{});
export const code = getGenerateSelfClosingTagSchema<StringConstructor, "code">()({
    render: "code",
    type: String,
    description: "A schema for creating a code element"
},{});
export const samp = getGenerateSelfClosingTagSchema<StringConstructor, "samp">()({
    render: "samp",
    type: String,
    description: "A schema for creating a samp element"
},{});


export const mark = getGenerateSelfClosingTagSchema<StringConstructor, "mark">()({
    render: "mark",
    type: String,
    description: "A schema for creating a mark element"
}, {});
export const q = getGenerateSelfClosingTagSchema<StringConstructor, "q">()({
    render: "q",
    type: String,
    description: "A schema for creating a mark element"
},{});
export const kbd = getGenerateSelfClosingTagSchema<StringConstructor, "kbd">()({
    render: "kbd",
    type: String,
    description: "A schema for creating a sup element"
},{});
export const bdo = getGenerateSelfClosingTagSchema<StringConstructor, "bdo">()({
    render: "bdo",
    type: String,
    description: "A schema for creating a bdo element"
},{});

export const bdi = getGenerateSelfClosingTagSchema<StringConstructor, "bdi">()({
    render: "bdi",
    type: String,
    description: "A schema for creating a bdi element"
},{});

export const data = getGenerateSelfClosingTagSchema<StringConstructor, "data">()({
    render: "data",
    type: String,
    description: "A schema for creating a data element"
},{});

export const dd = getGenerateSelfClosingTagSchema<StringConstructor, "dd">()({
    render: "dd",
    type: String,
    description: "A schema for creating a dd element"
},{});

export const dt = getGenerateSelfClosingTagSchema<StringConstructor, "dt">()({
    render: "dt",
    type: String,
    description: "A schema for creating a dt element",
},{});

export const span = getGenerateSelfClosingTagSchema<StringConstructor, "span">()({
    render: "span",
    type: String,
    description: "A schema for creating a span element"
},{});



//* Non inline tags

class TimeAttribute extends MarkdocValidatorAttribute {
  returnMarkdocErrorObjectOrNothing(value: unknown): void | ValidationError {

      const isNotAString = typeof value !== "string";

      if (isNotAString) {

          return generateMarkdocErrorObjectThatHasAMessageThatTellsTheUserATypeIsNotRight("string")
      }


      const dateIsNotANumber = isNaN(Date.parse(value));

      if (dateIsNotANumber)

          return generateMarkdocErrorObjectThatHasAMessageThatTellsTheUserAValueIsNotRight(
              `This value ${value} is not a parse able date time string
              Please use a proper date format
              `
          )

  }
}


export const time = getGenerateSelfClosingTagSchema<typeof TimeAttribute, "time">()({
    render: "time",
    type: TimeAttribute,
    description: "A schema for creating a time element"
}, {
    attributes: {
        datetime: MarkdocAttributes.datetime
    },
    inline: false,
    transform(node, config, createTag) {

        const { primary, datetime } = node.transformAttributes(config) as {
            primary: string;
            datetime?: string
        }

        if (datetime) return createTag("time", [primary], { datetime })

        const date = new Date(primary)

        return createTag("time",
            date.toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
            }).split(" "), {
            datetime: date.toISOString()
        })



    }
});

export const summary = getGenerateSelfClosingTagSchema<StringConstructor, "summary">()({
    render: "summary",
    type: String,
    description: "This is the summary for the details tag"
}, { inline: false });



export const dfn = getGenerateSelfClosingTagSchema<StringConstructor, "dfn">()({
    render: "dfn",
    type: String,
    description: "A schema for creating a dfn element"
}, { inline: false });

