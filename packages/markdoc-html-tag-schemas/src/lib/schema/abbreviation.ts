
import type { ValidationError } from "@markdoc/markdoc";
import type { ProperSchemaMatches, RequiredSchemaAttribute } from "packages/markdoc-html-tag-schemas/src/lib/attributes";
import { MarkdocValidatorAttribute, generateMarkdocErrorObject, generateSelfClosingTagSchema, } from "packages/markdoc-html-tag-schemas/src/utils";

export class AbbreviationAttribute extends MarkdocValidatorAttribute {

    returnMarkdocErrorObjectOrNothing(value: string,): ValidationError | void {




        const matchCapitalisedWordCaptureOtherCapitalizedWordsOnOneLineRegex =
            /^[A-Z][a-z]*(\s[A-Z][a-z]*)*$/;

        const thePrimaryAttributeIsNotASetOfWordsThatAreCapitalizedAndSpaced =
            !matchCapitalisedWordCaptureOtherCapitalizedWordsOnOneLineRegex.test(value);


        if (thePrimaryAttributeIsNotASetOfWordsThatAreCapitalizedAndSpaced)
            return generateMarkdocErrorObject(
                "invalid-attribute",
                "critical",
                `You are supposed to supply only words that are capitalised with Spaces.
                This word ${value} doesn't meet that condition.
          `
            )

    }
}



export const abbr = generateSelfClosingTagSchema<ProperSchemaMatches, RequiredSchemaAttribute, "abbr">(
    {
        render: "abbr",
        type: AbbreviationAttribute,
        description: "A tag that automatically creates an abbreviation of a capitalised word"
    },
    {
        attributes: {
            label: {
                type: String,
                required: false,
                errorLevel: "error",
                matches: /[A-Z]/
            }
        },
        transform(node, config, createTag) {


            const { primary, label } = node.transformAttributes(config);

            return createTag("abbr",
                label ? [label] : primary.match(/[A-Z]/g),
                {
                    title: primary
                },
            )
        }
    }
)