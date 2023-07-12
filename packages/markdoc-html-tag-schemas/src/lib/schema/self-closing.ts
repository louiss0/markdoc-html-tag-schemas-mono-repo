
import { generateSelfClosingTagSchema } from "packages/markdoc-html-tag-schemas/src/utils";

export { abbr } from "packages/markdoc-html-tag-schemas/src/lib/schema/abbreviation"
import { MarkdocAttributeSchemas, type ProperSchemaMatches, type RequiredSchemaAttribute } from "packages/markdoc-html-tag-schemas/src/lib/attributes"


//* Inline tags

export const sup = generateSelfClosingTagSchema({
    render: "sup",
    type: String,
    description: "A schema for creating a sup element"
});

export const li = generateSelfClosingTagSchema({
    render: "li",
    type: String,
    description: "A schema for creating a sup element"
}, { inline: false });

export const small = generateSelfClosingTagSchema({
    render: "small",
    type: String,
    description: "A schema for creating a sup element",

});

export const wbr = generateSelfClosingTagSchema({
    render: "wbr",
    type: String,
    description: "A schema for creating a sup element"
},);



export const del = generateSelfClosingTagSchema<ProperSchemaMatches, RequiredSchemaAttribute, "del">({
    render: "del",
    type: String,
    description: "A schema for creating a sup element"
}, {
    attributes: {
        cite: MarkdocAttributeSchemas.cite,
        datetime: MarkdocAttributeSchemas.datetime
    }
});

export const ins = generateSelfClosingTagSchema<ProperSchemaMatches, RequiredSchemaAttribute, "ins">({
    render: "ins",
    type: String,
    description: "A schema for creating a sup element"
}, {
    attributes: {
        cite: MarkdocAttributeSchemas.cite,
        datetime: MarkdocAttributeSchemas.datetime

    }
});


export const sub = generateSelfClosingTagSchema({
    render: "sub",
    type: String,
    description: "A schema for creating a sub element"
});


export const cite = generateSelfClosingTagSchema({
    render: "cite",
    type: String,
    description: "A schema for creating a cite element"
});
export const code = generateSelfClosingTagSchema({
    render: "code",
    type: String,
    description: "A schema for creating a code element"
});
export const samp = generateSelfClosingTagSchema({
    render: "samp",
    type: String,
    description: "A schema for creating a samp element"
});


export const mark = generateSelfClosingTagSchema({
    render: "mark",
    type: String,
    description: "A schema for creating a mark element"
});
export const q = generateSelfClosingTagSchema({
    render: "q",
    type: String,
    description: "A schema for creating a mark element"
});
export const kbd = generateSelfClosingTagSchema({
    render: "kbd",
    type: String,
    description: "A schema for creating a sup element"
});
export const bdo = generateSelfClosingTagSchema({
    render: "bdo",
    type: String,
    description: "A schema for creating a bdo element"
});

export const bdi = generateSelfClosingTagSchema({
    render: "bdi",
    type: String,
    description: "A schema for creating a bdi element"
});

export const data = generateSelfClosingTagSchema({
    render: "data",
    type: String,
    description: "A schema for creating a data element"
});

//* Non inline tags 

export const time = generateSelfClosingTagSchema<ProperSchemaMatches, RequiredSchemaAttribute, "time">({
    render: "time",
    type: String,
    description: "A schema for creating a time element"
}, {
    inline: false,
    attributes: {
        datetime: {
            ...MarkdocAttributeSchemas.datetime,
            required: true
        }
    }
});

export const summary = generateSelfClosingTagSchema({
    render: "summary",
    type: String,
    description: "This is the summary for the details tag"
}, { inline: false });


export const dd = generateSelfClosingTagSchema({
    render: "dd",
    type: String,
    description: "A schema for creating a dd element"
}, { inline: false });

export const dt = generateSelfClosingTagSchema({
    render: "dt",
    type: String,
    description: "A schema for creating a dt element",
}, { inline: false });


export const span = generateSelfClosingTagSchema({
    render: "span",
    type: String,
    description: "A schema for creating a span element"
}, { inline: false });


export const dfn = generateSelfClosingTagSchema({
    render: "dfn",
    type: String,
    description: "A schema for creating a dfn element"
}, { inline: false });

