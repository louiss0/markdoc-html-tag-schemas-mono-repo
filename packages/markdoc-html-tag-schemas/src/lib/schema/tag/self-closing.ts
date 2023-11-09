
import { generateMarkdocErrorObjectThatHasAMessageThatTellsTheUserATypeIsNotRight, generateMarkdocErrorObjectThatHasAMessageThatTellsTheUserAValueIsNotRight, getGenerateSelfClosingTagSchema } from "packages/markdoc-html-tag-schemas/src/utils";
import { MarkdocValidatorAttribute, } from 'packages/markdoc-html-tag-schemas/src/lib/custom-attributes';
import { MarkdocAttributes } from "packages/markdoc-html-tag-schemas/src/lib/attributes";
import type { ValidationError } from "@markdoc/markdoc";
export { abbr } from "packages/markdoc-html-tag-schemas/src/lib/schema/tag/abbreviation"


//* Inline tags


export const sup = getGenerateSelfClosingTagSchema()({
  render: "sup",
  attributes: {
    primary: {
      required: true,
      render: true,
      type: String,
    }
  },
  description: "A schema for creating a sup element",
});



export const li = getGenerateSelfClosingTagSchema()({
  render: "li",
  attributes: {
    primary: {
      required: true,
      render: true,
      type: String,
    }
  },
  description: "A schema for creating a sup element",
  inline: false
});



export const small = getGenerateSelfClosingTagSchema()({
  render: "small",
  attributes: {
    primary: {
      required: true,
      render: true,
      type: String,
    }
  },
  description: "A schema for creating a sup element",

});




export const del = getGenerateSelfClosingTagSchema()({
  render: "del",
  attributes: {
    primary: {
      required: true,
      render: true,
      type: String,
    },
    cite: MarkdocAttributes.cite,
    datetime: MarkdocAttributes.datetime
  },
  description: "A schema for creating a sup element"
});


export const ins = getGenerateSelfClosingTagSchema()({
  render: "ins",
  attributes: {
    primary: {
      required: true,
      render: true,
      type: String,
    },
    cite: MarkdocAttributes.cite,
    datetime: MarkdocAttributes.datetime
  },
  description: "A schema for creating a sup element"
},);


export const sub = getGenerateSelfClosingTagSchema()({
  render: "sub",
  attributes: {
    primary: {
      required: true,
      render: true,
      type: String,
    }
  },
  description: "A schema for creating a sub element"
});



export const code = getGenerateSelfClosingTagSchema()({
  render: "code",
  attributes: {
    primary: {
      required: true,
      render: true,
      type: String,
    }
  },
  description: "A schema for creating a code element"
});
export const samp = getGenerateSelfClosingTagSchema()({
  render: "samp",
  attributes: {
    primary: {
      required: true,
      render: true,
      type: String,
    }
  },
  description: "A schema for creating a samp element"
});


export const mark = getGenerateSelfClosingTagSchema()({
  render: "mark",
  attributes: {
    primary: {
      required: true,
      render: true,
      type: String,
    }
  },
  description: "A schema for creating a mark element"
});
export const q = getGenerateSelfClosingTagSchema()({
  render: "q",
  attributes: {
    primary: {
      required: true,
      render: true,
      type: String,
    }
  },
  description: "A schema for creating a mark element"
});
export const kbd = getGenerateSelfClosingTagSchema()({
  render: "kbd",
  attributes: {
    primary: {
      required: true,
      render: true,
      type: String,
    }
  },
  description: "A schema for creating a sup element"
});
export const bdo = getGenerateSelfClosingTagSchema()({
  render: "bdo",
  attributes: {
    primary: {
      required: true,
      render: true,
      type: String,
    }
  },
  description: "A schema for creating a bdo element"
});

export const bdi = getGenerateSelfClosingTagSchema()({
  render: "bdi",
  attributes: {
    primary: {
      required: true,
      render: true,
      type: String,
    }
  },
  description: "A schema for creating a bdi element"
});

export const data = getGenerateSelfClosingTagSchema()({
  render: "data",
  attributes: {
    primary: {
      required: true,
      render: true,
      type: String,
    }
  },
  description: "A schema for creating a data element"
});

export const dd = getGenerateSelfClosingTagSchema()({
  render: "dd",
  attributes: {
    primary: {
      required: true,
      render: true,
      type: String,
    }
  },
  inline: false,
  description: "A schema for creating a dd element"
});

export const dt = getGenerateSelfClosingTagSchema()({
  render: "dt",
  attributes: {
    primary: {
      required: true,
      render: true,
      type: String,
    }
  },
  inline: false,
  description: "A schema for creating a dt element",
});

export const span = getGenerateSelfClosingTagSchema()({
  render: "span",
  attributes: {
    primary: {
      required: true,
      render: true,
      type: String,
    }
  },
  description: "A schema for creating a span element"
});


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


export const time = getGenerateSelfClosingTagSchema()({
  render: "time",
  attributes: {
    primary: {
      required: true,
      render: true,
      type: TimeAttribute,
    },
    datetime: MarkdocAttributes.datetime
  },
  description: "A schema for creating a time element",
  inline: false,
}, {
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



export const summary = getGenerateSelfClosingTagSchema()({
  render: "summary",
  attributes: {
    primary: {
      required: true,
      render: true,
      type: String,
    }
  },
  description: "This is the summary for the details tag",
  inline: false
});



export const dfn = getGenerateSelfClosingTagSchema()({
  render: "dfn",
  attributes: {
    primary: {
      required: true,
      render: true,
      type: String,
    }
  },
  description: "A schema for creating a dfn element",
  inline: false,
},);

