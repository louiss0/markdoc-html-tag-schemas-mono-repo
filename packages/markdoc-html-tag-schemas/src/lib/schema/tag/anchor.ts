import type { ValidationError } from "@markdoc/markdoc"
import { DownloadAttribute, HttpURLAttribute, MarkdocValidatorAttribute, PathAttribute } from "packages/markdoc-html-tag-schemas/src/lib/custom-attributes";
import { MarkdocAttributes } from "packages/markdoc-html-tag-schemas/src/lib/attributes";
import {
    generateMarkdocErrorObject,
    getGenerateNonPrimarySchema,
} from "packages/markdoc-html-tag-schemas/src/utils"


export class HrefAttribute extends MarkdocValidatorAttribute {



    private readonly httpUrlAttribute = new HttpURLAttribute()

    private readonly pathAttribute = new PathAttribute()

    readonly mailtoRegex = /^mailto:([\w.-]+@[\w.-]+)(\?.+)?$/;

    readonly telRegex = /^tel:[\d-]+$/

    readonly routePathRegex = /(?<init_path>\/)(?<folder_path>[a-z0-9\-_]+\/)*(?<destination>[a-z0-9\-_])?/

    readonly wordThatStartsWithAHashRegex = /^#(?<word>\b\w+)?$/

    override returnMarkdocErrorObjectOrNothing(value: string): ValidationError | void {


        const theValueIsNotValid = ![
            this.httpUrlAttribute.httpUrlRegex.test(value),
            this.pathAttribute.absolutePathRegex.test(value),
            this.pathAttribute.relativePathRegex.test(value),
            this.routePathRegex.test(value),
            this.mailtoRegex.test(value),
            this.telRegex.test(value),
            this.wordThatStartsWithAHashRegex.test(value)
        ].some(Boolean)



        if (theValueIsNotValid) {

            return generateMarkdocErrorObject(
                "invalid-value",
                "error",
                `
          This value ${value} is not a valid href attribute.
          It must be one of these things.
          A word with a / or a # at the beginning of the string.
          A valid HTTP URL.
          A valid mailto string
          A valid tel string.
          A relative or absolute path.
          `
            )

        }

    }



}


export const a = getGenerateNonPrimarySchema()(
  {
    render: "a",
    attributes: {
        href: {
            type: HrefAttribute,
            required: true,
        },
        title: MarkdocAttributes.title,
        target: MarkdocAttributes.target,
        type: {
            type: String,
            matches: /^(application|audio|font|example|image|message|model|multipart|text|video)\/w+$/
        },
        rel: {
            type: String,
            matches: [
                "alternate",
                "author",
                "bookmark",
                "external",
                "help",
                "license",
                "next",
                "nofollow",
                "noreferrer",
                "noopener",
                "prev",
                "search",
                "tag",
            ]
        },

        reffererpolicy: {
            type: String,
            matches: [
                "no-referrer",
                "no-referrer-when-downgrade",
                "origin",
                "origin-when-cross-origin",
                "same-origin",
                "strict-origin",
                "strict-origin-when-cross-origin",
                "unsafe-url",
            ]

        },
        download: {
            type: DownloadAttribute,
            errorLevel: "error",
            description: "Allows the user to download a file from the computer or the project file system"
        }

    },
    children: [
        "span",
        "em",
        "strong",
        "abbr",
        "text",
        "image",
        "img",
    ]
}
)



