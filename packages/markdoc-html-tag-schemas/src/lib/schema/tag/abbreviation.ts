
import { createAnArrayOfMarkdocErrorObjectsBasedOnEachConditionThatIsTrue, generateMarkdocErrorObjectThatHasAMessageThatTellsTheUserAValueIsNotRight, getGenerateSelfClosingTagSchema } from "packages/markdoc-html-tag-schemas/src/utils";


const matchCapitalisedWordCaptureOtherCapitalizedWordsOnOneLineRegex =
    /^[A-Z][a-z]*(\s[A-Z][a-z]*)*$/;
// const isAnUppercasedWord = /^[A-Z]+/
export const abbr = getGenerateSelfClosingTagSchema()(
    {
        render: "abbr",
        type: String,
        description: "A tag that automatically creates an abbreviation of a capitalised word"
    },
    {
        attributes: {
            title: {
                type: String,
                required: false,
                errorLevel: "error",
                matches: matchCapitalisedWordCaptureOtherCapitalizedWordsOnOneLineRegex
            }
        },

        validate(node, config) {

            const { primary, title } = node.transformAttributes(config)


            const thePrimaryAttributeIsNotASetOfWordsThatAreCapitalizedAndSpaced =
                !matchCapitalisedWordCaptureOtherCapitalizedWordsOnOneLineRegex.test(primary);

            const thePrimaryAttributeIsNotTheAbbreviationOfTheTitle =
                typeof title === "string"
                && typeof primary === "string"
                && !title
                    .match(/[A-Z]/)
                    ?.some((value) => primary.includes(value))

            return createAnArrayOfMarkdocErrorObjectsBasedOnEachConditionThatIsTrue(
                [
                    thePrimaryAttributeIsNotASetOfWordsThatAreCapitalizedAndSpaced && !title,
                    generateMarkdocErrorObjectThatHasAMessageThatTellsTheUserAValueIsNotRight(
                        `You are supposed to supply only words that are capitalised with spaces
                         when using the primary attribute.
                         If you want to write an abbreviation in the primary attribute
                         use the title attribute along with it and put the
                         capitalised word there.
                         Please make sure to place the abbreviation as the primary attribute
                         if you do.
                         This word ${primary} doesn't meet that condition.
                        `
                    )
                ],
                [
                    thePrimaryAttributeIsNotTheAbbreviationOfTheTitle,
                    generateMarkdocErrorObjectThatHasAMessageThatTellsTheUserAValueIsNotRight(
                        `If you are going to supply both title and primary attribute
                        the primary attribute ${primary} must be the same as the title ${title}.
                        `
                    )
                ]
            )


        },

        transform(node, config, createTag) {


            const { primary, title } =
                node.transformAttributes(config);

            return createTag(
                "abbr",
                title && primary
                    ? [primary]
                    : primary.match(/[A-Z]/g),
                {
                    title: title ?? primary
                },
            )
        }
    }
)
