
import * as selfClosingTags from 'packages/markdoc-html-tag-schemas/src/lib/schema/self-closing';
import * as nonPrimaryTags from 'packages/markdoc-html-tag-schemas/src/lib/schema/non-primary';
import { type Config, type NodeType } from '@markdoc/markdoc';
import { getNodes, type FilledNonPrimaryTagsSchema, type FilledTagsSchema } from 'packages/markdoc-html-tag-schemas/src/utils';
const { a, ul, img, ...restOfTheNonPrimaryTags } = nonPrimaryTags


type MarkdocHTMLTagSchemasViableExtension = Omit<Config, "tags" | "nodes"> & {
    tags: Record<string, FilledTagsSchema | FilledNonPrimaryTagsSchema>
    nodes: Partial<Record<NodeType, FilledTagsSchema | FilledNonPrimaryTagsSchema>>
}

const nodes = getNodes() as {
    heading: {
        attributes: Record<"level", { type: NumberConstructor, render: false, required: true }>
        children: Array<string>
        render: `h${1 | 2 | 3 | 4 | 5 | 6}`

    }
    document: {
        render: "article"
        children: Array<string>
        attributes: Record<"frontmatter", Record<"render", false>>
    }
}


export const markdocHTMLTagSchemas = (strictHeadings = false, blankDoc = true,) => {


    return {
        nodes: {
            document: {
                ...nodes?.document,
                render: blankDoc ? undefined : nodes?.document?.render
            },
            heading: {
                ...nodes?.heading,
                attributes: {
                    level: {
                        ...nodes?.heading.attributes["level"],
                        matches: strictHeadings ? [1, 2, 3, 4] : undefined
                    }
                }
            },
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
            ...selfClosingTags,
            ...restOfTheNonPrimaryTags
        }

    } satisfies MarkdocHTMLTagSchemasViableExtension
};
