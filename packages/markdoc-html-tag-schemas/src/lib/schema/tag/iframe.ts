
import { MarkdocValidatorAttribute, SourceAttribute } from "packages/markdoc-html-tag-schemas/src/lib/custom-attributes";
import { MarkdocAttributeSchemas } from "packages/markdoc-html-tag-schemas/src/lib/schema/attribute";
import { generateMarkdocErrorObjectThatHasAMessageThatTellsTheUserATypeIsNotRight, generateMarkdocErrorObjectThatHasAMessageThatTellsTheUserAValueIsNotRight, getGenerateNonPrimarySchema } from "packages/markdoc-html-tag-schemas/src/utils"
import { isObject } from "packages/markdoc-html-tag-schemas/src/utils/internal"


const { ariaHidden, height, width } = MarkdocAttributeSchemas

export class AllowAttribute extends MarkdocValidatorAttribute {



    readonly allowedPermissionDirectives = [
        "camera",
        "display-capture",
        "fullscreen",
        "gamepad",
        "geolocation",
        "microphone",
        "web-share",
    ]

    readonly keywordAndOriginGroupsRegex = /^(?<keywords>self|src)\s(?<origin>https?:\/\/[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6})*$/;

    readonly anchoredStarRegex = /^\*$/;

    returnMarkdocErrorObjectOrNothing(value: unknown) {


        if (!isObject(value)) return generateMarkdocErrorObjectThatHasAMessageThatTellsTheUserATypeIsNotRight("object")


        const allKeysAreOneOfTheRequiredListOfAllowedPermissionDirectives = Object.keys(value).every(
            key => typeof key === "string" && this.allowedPermissionDirectives.includes(key)
        )

        if (!allKeysAreOneOfTheRequiredListOfAllowedPermissionDirectives)
            return generateMarkdocErrorObjectThatHasAMessageThatTellsTheUserAValueIsNotRight(`The keys in this object are not viable keys use one of these keys instead ${this.allowedPermissionDirectives.join(",")} `)


        const keysWithValuesThatDoNotHaveAProperAllowlist = Object.entries(value).reduce(
            (carry: Array<string>, [key, value]) =>
                typeof value === "string" && this.keywordAndOriginGroupsRegex.test(value)
                    || typeof value === "string" && this.anchoredStarRegex.test(value)
                    ? carry
                    : carry.concat(key),
            [])



        if (keysWithValuesThatDoNotHaveAProperAllowlist.length !== 0)
            return generateMarkdocErrorObjectThatHasAMessageThatTellsTheUserAValueIsNotRight(`
            Please don't use any kind of string as a value. Use the keywords src of self followed by multiple URL's. 
            You just use the * to allow all all url's 
            `)



    }
}



export const iframe = getGenerateNonPrimarySchema({
    render: "iframe",
    selfClosing: true,
    attributes: {
        src: {
            type: SourceAttribute,
            required: true,
            description: "This attribute is the path to the place containing media to display"
        },
        allow: {
            type: AllowAttribute,
            description: `An attribute that makes sure that the user creates an object. 
            The allowed allowedPermissionDirectives as keys.
            The values for them as values.
            `
        },
        name: {
            type: String,
            description: "The name of the iframe",
        },
        loading: {
            type: String,
            matches: [
                "eager",
                "lazy",
            ]
        },
        credentialess: {
            type: Boolean,
            required: false,
        },
        sandbox: {
            type: String,
            matches: [
                "allow-downloads",
                "allow-forms",
                "allow-modals",
                "allow-orientation-lock",
                "allow-pointer-lock",
                "allow-popups",
                "allow-popups-to-escape-sandbox",
                "allow-same-origin",
                "allow-scripts",
                "allow-top-navigation",
                "allow-top-navigation-by-user-activation",
                "allow-top-navigation-to-custom-protocols",
            ]
        },
        ariaHidden,
        width,
        height,
    },
})();
