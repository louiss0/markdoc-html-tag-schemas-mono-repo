import {
    createAnArrayOfMarkdocErrorObjectsBasedOnEachConditionThatIsTrue,
    generateMarkdocErrorObject,
    generateNonPrimarySchemaWithATransformThatGeneratesDataAttributes,
    getGenerateNonPrimarySchema,
} from "packages/markdoc-html-tag-schemas/src/utils";

import {
    MediaAttribute,
    SizesAttribute,
    SourceAttribute,
    SrcSetAttribute,
} from 'packages/markdoc-html-tag-schemas/src/lib/custom-attributes';

import { MarkdocAttributes } from "packages/markdoc-html-tag-schemas/src/lib/attributes";

export { iframe } from "packages/markdoc-html-tag-schemas/src/lib/schema/tag/iframe"

export { a } from "packages/markdoc-html-tag-schemas/src/lib/schema/tag/anchor"

const {
    contenteditable,
    draggable,
    lang,
    title,
    translate,
    spellcheck,
    dir,
    cite,
    width,
    height,

    hidden,
    refferpolicy,
} = MarkdocAttributes


// * Self Closing Tag Schemas


export const source = getGenerateNonPrimarySchema({
    render: "source",
    selfClosing: true,
    description: "This is the schema for the HTML source tag",
    attributes: {
        src: {
            type: SourceAttribute,
            description: "A set of urls and image sizes that are required to use upload the picture",

        },
        srcset: {
            type: SrcSetAttribute,
            description: "A set of urls and image sizes that are required to use upload the picture",

        },
        sizes: {
            type: SizesAttribute,
            description: "The size of each image in a media query",
            errorLevel: "warning",
        },
        media: {
            type: MediaAttribute,
            description: "The art resolution or time for an image to appear in a media query",
            errorLevel: "warning",
        },
        type: {
            type: String,
            errorLevel: "warning",
            description: "The type of image that is being used",
        },

    }
})()

export const track = getGenerateNonPrimarySchema(
    {
        render: 'track',
        selfClosing: true,
        attributes: {
            src: {
                type: SourceAttribute,
                required: true,
                description: "The url where the file is placed"

            },
            default: {
                type: Boolean,
            },
            label: {
                type: String,
            },
            srclang: lang,
            kind: {
                type: String,
                matches: [
                    "captions",
                    "chapters",
                    "descriptions",
                    "metadata",
                    "subtitles",
                ]
            },
        },
    }
)(
    {
        validate(node) {

            const { attributes } = node

            const kindIsSubtitlesAndThereIsASrcLang =
                "kind" in attributes
                && attributes["kind"] === "subtitles"
                && "srclang" in attributes

            return createAnArrayOfMarkdocErrorObjectsBasedOnEachConditionThatIsTrue(
                [
                    !kindIsSubtitlesAndThereIsASrcLang,
                    generateMarkdocErrorObject(
                        "invalid-attributes",
                        "error",
                        "If the kind is equal to subtitles you must specify a srclang"
                    )
                ]
            )


        },
    }
);

export const hr = getGenerateNonPrimarySchema({
    render: "hr",
    selfClosing: true,
    attributes: { hidden }
})();



export const br = getGenerateNonPrimarySchema({
    render: "br",
    selfClosing: true,
    attributes: { hidden },
})();



export const img = getGenerateNonPrimarySchema(
    {
        render: "img",
        selfClosing: true,
        attributes: {
            width,
            height,
            title,
            refferpolicy,
            src: {
                type: SourceAttribute,
                required: true,
                errorLevel: "critical",
                description: "The src of the image you want to see"

            },
            alt: {
                type: String,
                required: true,
                errorLevel: "critical",
                description: "The description of the image"

            },
            srcset: {
                type: SrcSetAttribute,
                description: "A set of urls and image sizes that are required to use upload the picture",
                errorLevel: "warning",
            },

            sizes: {
                type: SizesAttribute,
                description: "The size of each image in a media query",
                errorLevel: "warning",
            },

            crossorigin: {
                type: String,
                errorLevel: "critical",
                matches: [
                    "anonymous",
                    "use-credentials",
                ],
            },
            decoding: {
                type: String,
                matches: [
                    "sync",
                    "async",
                    "auto",
                ]
            },
            fetchprority: {
                type: String,
                matches: [
                    "high",
                    "low",
                    "auto",
                ]
            },
            loading: {
                type: String,
                matches: [
                    "eager",
                    "lazy",
                ]
            },
        }
    }
)();

//* Children Tag Schemas

const videoTypeRegex = /^video\/\b\w+/

export const video = getGenerateNonPrimarySchema({
    render: "video",
    children: [
        "source",
        "track"
    ],
    attributes: {
        width,
        height,
        refferpolicy,
        autoplay: {
            type: Boolean,
            description: "A Boolean attribute: if specified, the audio will automatically begin playback as soon as it can do so"
        },
        controls: {
            type: Boolean,
            description: "A Boolean attribute: if specified, the user can control the audio of the "
        },
        controlslist: {
            type: String,
            matches: [
                "nodownload",
                "nofullscreen",
                "noremoteplayback"
            ],
            description: "A String attribute: if specified, helps the browser select what controls to show for the audio element whenever the browser shows its own set of controls (that is, when the controls attribute is specified)."
        },
        crossorigin: {
            type: String,
            matches: [
                "anonymous",
                "use-credentials",
            ],
        },
        loop: {
            type: Boolean,
            description: "A Boolean attribute: if specified, the audio player will automatically seek back to the start upon reaching the end of the audio."
        },
        muted: {
            type: Boolean,
            description: "A Boolean attribute that indicates whether the audio will be initially silenced.Its default value is false."
        },
        preload: {
            type: String,
            description: "This enumerated attribute is intended to provide a hint to the browser about what the author thinks will lead to the best user experience.",
            matches: [
                "none",
                "metadata",
                "audio",
            ]
        },
        playsinline: {
            type: Boolean,
            description: "A Boolean attribute indicating that the video is to be played 'inline', that is within the element's playback area. Note that the absence of this attribute does not imply that the video will always be played in fullscreen."
        },
        poster: {
            type: String,
            description: "A URL for an image to be shown while the video is downloading. If this attribute isn't specified, nothing is displayed until the first frame is available, then the first frame is shown as the poster frame."
        }

    },
})({
    validate(node) {


        const sourceTags = node.children
            .filter(child => child.tag === "source");
        const allChildrenWithSourceTagsHaveASrcAttribute =
            sourceTags
                .every(child => "src" in child.attributes)

        const anySourceTagWithATypeAttributeIsInvalid =
            sourceTags
                .some((node) => "type" in node.attributes
                    && !videoTypeRegex.test(node.attributes["type"])
                )

        return createAnArrayOfMarkdocErrorObjectsBasedOnEachConditionThatIsTrue(
            [
                !allChildrenWithSourceTagsHaveASrcAttribute,
                generateMarkdocErrorObject(
                    "invalid-children",
                    "error",
                    "All children of the video tag must have a src attribute "
                )
            ],
            [anySourceTagWithATypeAttributeIsInvalid,
                generateMarkdocErrorObject(
                    "invalid-children",
                    "error",
                    `All children of the picture tag that is a src attribute must have a type attribute with a string
                    that starts with video/ and ends with a word.
                    `
                )

            ]
        )

    }
});

const audioTypeRegex = /^audio\/\b\w+/
export const audio = getGenerateNonPrimarySchema({
    render: "audio",
    children: [
        "source"
    ],
    attributes: {
        autoplay: {
            type: Boolean,
            description: "A Boolean attribute: if specified, the audio will automatically begin playback as soon as it can do so"
        },
        controls: {
            type: Boolean,
            description: "A Boolean attribute: if specified, the user can control the audio of the "
        },
        controlslist: {
            type: String,
            matches: [
                "nodownload",
                "nofullscreen",
                "noremoteplayback"
            ],
            description: "A String attribute: if specified, helps the browser select what controls to show for the audio element whenever the browser shows its own set of controls (that is, when the controls attribute is specified)."
        },
        crossorigin: {
            type: String,
            matches: [
                "anonymous",
                "use-credentials",
            ],
        },

        loop: {
            type: Boolean,
            description: "A Boolean attribute: if specified, the audio player will automatically seek back to the start upon reaching the end of the audio."
        },
        muted: {
            type: Boolean,
            default: false,
            description: "A Boolean attribute that indicates whether the audio will be initially silenced.Its default value is false."
        },

        preload: {
            type: String,
            description: "This enumerated attribute is intended to provide a hint to the browser about what the author thinks will lead to the best user experience.",
            matches: [
                "none",
                "metadata",
                "audio",
            ]
        },

    },
})({
    validate(node) {


        const sourceTags = node.children
            .filter(child => child.tag === "source");

        const allChildrenWithSourceTagsHaveASrcAttribute =
            sourceTags
                .every(child => "src" in child.attributes)

        const anySourceTagWithATypeAttributeIsInvalid =
            sourceTags
                .some((node) => "type" in node.attributes
                    && !audioTypeRegex.test(node.attributes["type"])
                )

        return createAnArrayOfMarkdocErrorObjectsBasedOnEachConditionThatIsTrue(
            [
                !allChildrenWithSourceTagsHaveASrcAttribute,
                generateMarkdocErrorObject(
                    "invalid-children",
                    "error",
                    "All children of the audio tag must have a src attribute "
                )
            ],
            [anySourceTagWithATypeAttributeIsInvalid,
                generateMarkdocErrorObject(
                    "invalid-children",
                    "error",
                    `All children of the picture tag that is a src attribute must have a type attribute  with a a string that is one of the following values.
                    
                        image/jpg
                        image/jpeg
                        image/gif
                        image/tiff
                        image/webp
                        image/png
                    `
                )

            ]
        )

    }
});




export const address = generateNonPrimarySchemaWithATransformThatGeneratesDataAttributes({
    render: "address",
    attributes: {
        draggable,
        translate,
        spellcheck,
        dir,
    },
    children: ["inline", "span", "paragraph", "list"]
})();





export const ul = generateNonPrimarySchemaWithATransformThatGeneratesDataAttributes({
    render: "ul",
    children: [
        "li"
    ],
    attributes: {
        title,
        spellcheck,
        lang,
        contenteditable,
        translate,
        dir,
    }
})();

export const ol = generateNonPrimarySchemaWithATransformThatGeneratesDataAttributes({
    render: "ol",
    children: [
        "li"
    ],
    attributes: {
        title,
        spellcheck,
        lang,
        contenteditable,
        translate,
        dir,
    }
})();







export const blockquote = getGenerateNonPrimarySchema({
    render: "blockquote",
    attributes: {
        cite,
        hidden,
    },
    children: [
        "list",
        "paragraph",
        "img"
    ],
})();

export const details = generateNonPrimarySchemaWithATransformThatGeneratesDataAttributes({
    render: "details",
    attributes: {
        open: {
            type: Boolean,
            required: false,
            default: false
        }
    },
    children: [
        "summary",
        "text",
        "paragraph"
    ]
})();



const imageTypeRegex = /^image\/(?<image_type>jpg|jpeg|gif|tiff|webp|png)$/;

export const picture = getGenerateNonPrimarySchema({
    render: "picture",
    attributes: {
        hidden
    },
    children: [
        "img",
        "source",
    ]
})({
    validate(node) {
        const sourceTags = node.children
            .filter(child => child.tag === "source");

        const allChildrenWithSourceTagsHaveASrcAttribute =
            sourceTags
                .every(child => "srcset" in child.attributes)

        const anySourceTagWithATypeAttributeIsInvalid =
            sourceTags
                .some((node) => "type" in node.attributes
                    && !imageTypeRegex.test(node.attributes["type"])
                )

        return createAnArrayOfMarkdocErrorObjectsBasedOnEachConditionThatIsTrue(
            [
                !allChildrenWithSourceTagsHaveASrcAttribute,
                generateMarkdocErrorObject(
                    "invalid-children",
                    "error",
                    "All children of the picture tag that is a src attribute must have a srcset attribute "
                )
            ],
            [anySourceTagWithATypeAttributeIsInvalid,
                generateMarkdocErrorObject(
                    "invalid-children",
                    "error",
                    `All children of the picture tag that is a src attribute must have a type attribute  with a a string that is one of the following values.
                    
                        image/jpg
                        image/jpeg
                        image/gif
                        image/tiff
                        image/webp
                        image/png
                    `
                )

            ]

        )
    }
}
)

export const dl = getGenerateNonPrimarySchema({
    render: "dl",
    attributes: {
        hidden,
        title,
        spellcheck,
        lang,
        contenteditable,
        translate,
        dir,
    },
    children: [
        "dt",
        "dd",
    ]
})()



export const colgroup = getGenerateNonPrimarySchema({
    render: "colgroup",
    attributes: {
        hidden
    },
    children: [
        "col",
        "text",
    ]
})();

export const col = getGenerateNonPrimarySchema({
    render: "col",
    attributes: {
        hidden
    },
    children: [
        "inline",
        "text",
    ]
})();

/** 
 * This is an attribute that is experimental 
 * const disableremoteplayback = generateAttributeSchema{
            type: Boolean,
            description: "A Boolean attribute used to disable the capability of remote playback in devices that are attached using wired and wireless technologies"
    }),
*/


export const p = generateNonPrimarySchemaWithATransformThatGeneratesDataAttributes({
    render: "p",
    attributes: {
        contenteditable,
        draggable,
        title,
        lang,
        spellcheck,
        dir,
        translate,
    },
    children: [
        "inline",
        "text",
        "link",
    ]
})();





