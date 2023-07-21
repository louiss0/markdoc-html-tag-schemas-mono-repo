import { MarkdocAttributes } from "packages/markdoc-html-tag-schemas/src/lib/attributes";

const { height, width } = MarkdocAttributes

import {
    getGenerateNonPrimarySchema
} from "packages/markdoc-html-tag-schemas/src/utils";


import {
    MediaAttribute,
    SizesAttribute,
    SourceAttribute,
    SrcSetAttribute,
} from 'packages/markdoc-html-tag-schemas/src/lib/custom-attributes';



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
            matches: /^image\/(?<image_type>jpg|jpeg|gif|tiff|webp|png)$/
        },
        width,
        height,
    }
})()
