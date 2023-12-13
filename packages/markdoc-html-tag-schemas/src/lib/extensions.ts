
import * as selfClosingTags from 'packages/markdoc-html-tag-schemas/src/lib/schema/tag/self-closing';
import * as nonPrimaryTags from 'packages/markdoc-html-tag-schemas/src/lib/schema/tag/non-primary';
import { createDocSchema, createHeadingSchema } from 'packages/markdoc-html-tag-schemas/src/utils';
const { a, ul, img, ...restOfTheNonPrimaryTags } = nonPrimaryTags







export const markdocHTMLTagSchemas = (
    options: Partial<{ blankDoc: false, strictHeadings: true }> = {}
) => {


    const { blankDoc = true, strictHeadings = false } = options as Record<"blankDoc" | "strictHeadings", boolean>


    return {
        nodes: {
            document: createDocSchema(blankDoc),
            heading: createHeadingSchema(strictHeadings),
            image: {
                render: img.render,
                attributes: {
                    src: img.attributes.src,
                    title: img.attributes.title,
                    alt: img.attributes.alt,
                }
            },
            link: {
                render: a.render,
                attributes: {
                    href: a.attributes["href"],
                    title: a.attributes["title"]
                }
            },
        },
        tags: {
            img,
            a,
            ul,
            ...selfClosingTags,
            ...restOfTheNonPrimaryTags
        }

    }
};

