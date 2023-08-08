

import type { ValidationError, Config as MarkdocConfig, Scalar } from "@markdoc/markdoc"
import { generateMarkdocErrorObject, generateMarkdocErrorObjectThatHasAMessageThatTellsTheUserATypeIsNotRight, generateMarkdocErrorObjectThatHasAMessageThatTellsTheUserAValueIsNotRight } from "packages/markdoc-html-tag-schemas/src/utils/helpers"


export interface CustomAttributeTransformContract {
    transform(value: NonNullable<unknown>, config: MarkdocConfig): Scalar
}

export interface CustomAttributeValidationContract {
    validate(value: unknown, config: MarkdocConfig): ValidationError[];
}

export abstract class MarkdocValidatorAttribute implements CustomAttributeValidationContract {




    validate(value: unknown, config: MarkdocConfig) {

        const res = this.returnMarkdocErrorObjectOrNothing(value, config)
        return res ? [res] : []

    }

    abstract returnMarkdocErrorObjectOrNothing(
        value: unknown,
        config: MarkdocConfig
    ): ValidationError | void

}


export class MediaAttribute extends MarkdocValidatorAttribute {
    private readonly deviceOperatorAndOrientationRegex =
        /(?<device_choice>screen|aural|braille|print|tty|tv|handheld|projection)\s(?<operator>and|not|,)\s(?<orientation_query>\(orientation:(?:portrait|landscape)\))?/


    private readonly deviceOperatorAndAspectRatioRegex =
        /(?<device_choice>screen|aural|braille|print|tty|tv|handheld|projection)\s(?<operator>and|not|,)\s(?<aspect_ratio_query>(device-)?aspect-ratio:(?:[1-16]{1,2}\/[1-16]{1,2}))/

    private readonly deviceOperatorAndMediaQueryRegex =
        /(?<device_choice>screen|aural|braille|print|tty|tv|handheld|projection)\s(?<operator>and|not|,)\s(?<screen_or_device_size_query>\((?:min-|max-)?(?:device-)?(?:width|height):\d{2,4}(?:em)?\))/


    private readonly deviceOperatorAndColorOrColorIndexRegex =
        /(?<device_choice>screen|aural|braille|print|tty|tv|handheld|projection)\s(?<operator>and|not|,)\s(?<color_or_color_index>\(color(?:-index)?:\d{1,3}\))/

    private readonly deviceOperatorAndMonoChromeRegex =
        /(?<device_choice>screen|aural|braille|print|tty|tv|handheld|projection)\s(?<operator>and|not|,)\s(?<monochrome_query>\(monochrome:\d\))/

    private readonly deviceOperatorAndResolutionRegex =
        /(?<device_choice>screen|aural|braille|print|tty|tv|handheld|projection)\s(?<operator>and|not|,)\s(?<resolution_query>\(resolution:\d{1,3}(?:dpi|dpcm)\))/

    private readonly deviceOperatorAndGridRegex =
        /(?<device_choice>screen|aural|braille|print|tty|tv|handheld|projection)\s(?<operator>and|not|,)\s(?<grid_query>\(grid:\d{1,3}\))/

    private readonly deviceOperatorAndScanRegex =
        /(?<device_choice>screen|aural|braille|print|tty|tv|handheld|projection)\s(?<operator>and|not|,)\s(?<scan_query>\(scan:(?:interlace|progressive)\))/

    override returnMarkdocErrorObjectOrNothing(value: unknown): void | ValidationError {



        if (typeof value !== "string") {

            return generateMarkdocErrorObjectThatHasAMessageThatTellsTheUserATypeIsNotRight("string")
        }

        const valueIsAValidMediaQuery = [
            this.deviceOperatorAndColorOrColorIndexRegex.test(value),
            this.deviceOperatorAndAspectRatioRegex.test(value),
            this.deviceOperatorAndMediaQueryRegex.test(value),
            this.deviceOperatorAndScanRegex.test(value),
            this.deviceOperatorAndResolutionRegex.test(value),
            this.deviceOperatorAndMonoChromeRegex.test(value),
            this.deviceOperatorAndGridRegex.test(value),
            this.deviceOperatorAndOrientationRegex.test(value),
        ].some(Boolean)

        if (!valueIsAValidMediaQuery) {

            return generateMarkdocErrorObjectThatHasAMessageThatTellsTheUserAValueIsNotRight(
                `You need to supply the correct media query.
                Remember not to put any spaces when writing code in the parenthesises of a media query.
                You must write a media query like this. 
                
                <device_choice> operator <media_query>
                
                device_choices are: screen|aural|braille|print|tty|tv|handheld|projection
                
                operators are: and|not|,

                media_query's are: grid|scan|color|color-index|resolution|width|height|aspect-ratio|orientation
                
                When using the width and height you can prefix them with min- and max-.
            `)
        }


    }
}

export class PathAttribute extends MarkdocValidatorAttribute implements CustomAttributeTransformContract {
    readonly relativePathRegex =
        /^(?<init_path>\.?\.\/)+(?<folder_path>[a-z0-9\-_]+\/)*(?<filename>(?:\w+(?:\s?\w+)+)|[a-zA-Z0-9\-_]+)(?<extension>\.[a-z0-9]{2,6})?$/

    readonly absolutePathRegex = /^\/(?<folder_path>[a-z0-9\-_]+\/)*(?<filename>(?:\w+(?:\s?\w+)+)|[a-zA-Z0-9\-_]+)(?<extension>\.[a-z0-9]{2,6})?$/


    returnMarkdocErrorObjectOrNothing(value: unknown,): void | ValidationError {

        if (typeof value !== "string") {
            return generateMarkdocErrorObjectThatHasAMessageThatTellsTheUserATypeIsNotRight("string")
        }

        const oneOfTheseIsTrue = [
            this.relativePathRegex.test(value),
            this.absolutePathRegex.test(value)
        ].some(Boolean)

        if (!oneOfTheseIsTrue) return generateMarkdocErrorObjectThatHasAMessageThatTellsTheUserAValueIsNotRight(
            `This is not the right string. 
             A relative path must have:
                
             1 or more ( ../ ) which is a relative path

             0 or more ( word/ )  which is a path file that uses a folder name at the start. 

             A file name and an extension which is a dot (.) followed by a word with 2-6 letters.  
                
             A absolute path must have:

             1 or more ( word/ )  which is a path file that uses a folder name at the start. 
                
             0 or more ( ../ ) which is a relative path

             A file name and an extension which is a dot (.) followed by a word with 2-6 letters.
            `
        )


    }


    transform(value: string) {

        return value?.trim()

    }

};


export class HttpURLAttribute extends MarkdocValidatorAttribute {


    readonly httpUrlRegex =
        /^(https?:\/\/)[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$/



    override returnMarkdocErrorObjectOrNothing(value: unknown,): void | ValidationError {



        if (typeof value !== "string")
            return generateMarkdocErrorObjectThatHasAMessageThatTellsTheUserATypeIsNotRight("string");


        if (!this.httpUrlRegex.test(value))
            return generateMarkdocErrorObject(
                "invalid-attribute",
                "error",
                `The string ${value} must be a valid URL, a Relative or Absolute Path.
                `
            );



    }


};


export class SourceAttribute extends MarkdocValidatorAttribute {



    private readonly httpUrlAttribute = new HttpURLAttribute()
    private readonly pathAttribute = new PathAttribute()

    override returnMarkdocErrorObjectOrNothing(value: unknown,): void | ValidationError {



        const pathAttributeReturnMarkdocErrorOrNothingResult =
            this.pathAttribute.returnMarkdocErrorObjectOrNothing(value)

        const httpURLAttributeReturnMarkdocErrorOrNothingResult =
            this.httpUrlAttribute.returnMarkdocErrorObjectOrNothing(value)



        if (pathAttributeReturnMarkdocErrorOrNothingResult
            && httpURLAttributeReturnMarkdocErrorOrNothingResult) {

            const messages = new Set()


            messages
                .add(pathAttributeReturnMarkdocErrorOrNothingResult.message)
                .add(httpURLAttributeReturnMarkdocErrorOrNothingResult.message)

            return generateMarkdocErrorObjectThatHasAMessageThatTellsTheUserAValueIsNotRight(
                `${[...messages.values()].join()},`
            )

        }



    }



};

export class DownloadAttribute extends MarkdocValidatorAttribute {



    private readonly pathAttribute = new PathAttribute()

    override returnMarkdocErrorObjectOrNothing(value: unknown,): void | ValidationError {



        if (typeof value === "string") {

            const isInvalidPath = [
                this.pathAttribute.absolutePathRegex.test(value),
                this.pathAttribute.relativePathRegex.test(value),
            ].some(Boolean)

            if (!isInvalidPath) return generateMarkdocErrorObjectThatHasAMessageThatTellsTheUserAValueIsNotRight(`
            This string ${value} is not a valid absolute or relative path  
            `)

        }

        if (typeof value !== "boolean" && typeof value !== "string")
            return generateMarkdocErrorObjectThatHasAMessageThatTellsTheUserAValueIsNotRight(
                "This is not a string or a boolean please type one of those."
            )



    }




};



export class SrcSetAttribute extends MarkdocValidatorAttribute implements CustomAttributeTransformContract {



    constructor () {
        super()
    }


    protected readonly relativePathAndEitherViewportWidthOrWidthSizeRegex =
        /^(?<init_path>\.?\.\/)+(?<folder_path>[a-z0-9\-_]+\/)*(?<filename>(?:\w+(?:\s?\w+)+)|[a-zA-Z0-9\-_]+)(?<extension>\.[a-z]{2,6})\s(?<width_or_viewport_width>\d{1,4}v?w)$/

    protected readonly relativePathAndPixelDensityRegex =
        /^(?<init_path>\.?\.\/)+(?<folder_path>[a-z0-9\-_]+\/)*(?<filename>(?:\w+(?:\s?\w+)+)|[a-zA-Z0-9\-_]+)(?<extension>\.[a-z]{2,6})\s(?<pixel_density>\d{1,3}(?:\.\d)?x)$/

    protected readonly absolutePathAndEitherViewportWidthOrWidthSizeRegex =
        /^(?<folder_path>[a-z0-9\-_]+\/)+(?<filename>(?:\w+(?:\s?\w+)+)|[a-zA-Z0-9\-_]+)(?<extension>\.[a-z]{2,6})\s(?<width_or_viewport_width>\d{1,4}v?w)$/

    protected readonly absolutePathAndPixelDensityRegex =
        /^(?<folder_path>[a-z0-9\-_]+\/)+(?<filename>(?:\w+(?:\s?\w+)+)|[a-zA-Z0-9\-_]+)(?<extension>\.[a-z]{2,6})\s(?<pixel_density>\d{1,3}(?:\.\d)?x)$/


    transform(value: unknown): Scalar {

        return typeof value !== "string"
            ? Array.isArray(value) && value?.join(",")
            : value

    }


    private checkIfStringIsValid(value: string) {


        return [
            this.relativePathAndEitherViewportWidthOrWidthSizeRegex.test(value),
            this.relativePathAndPixelDensityRegex.test(value),
            this.absolutePathAndEitherViewportWidthOrWidthSizeRegex.test(value),
            this.absolutePathAndPixelDensityRegex.test(value),
        ].some(Boolean)




    }

    override returnMarkdocErrorObjectOrNothing(value: unknown,): void | ValidationError {




        if (typeof value === "string") {



            return !this.checkIfStringIsValid(value)
                ? generateMarkdocErrorObjectThatHasAMessageThatTellsTheUserAValueIsNotRight(
                    `This value is ${value} not valid.
                        You must specify a srcset value that has a valid absolute or relative path. 
                        
                        You can either have a valid width or a valid pixel density at the end.
                        
                        If you do use a space after each URL. 
                        
                        Ex: /path/to/image.jpg 
    
                        If you specify more then one path you must specify a width or a pixel density.
                        You must use a comma, space , then specify the next path if you want to specify
                        more paths.
                        
                        Ex: /path/to/image.jpg 30w /path/to/image-2.jpeg 40w
                        
                        Ex: ./path/to/image.jpg  ../path/to/image-2.jpeg 440w
                        
                        If you are trying to use a url please use one that is http
                        
                        Ex: 
                        `) : undefined


        }



        if (Array.isArray(value)) {


            if (value.length < 2)
                return generateMarkdocErrorObjectThatHasAMessageThatTellsTheUserAValueIsNotRight(
                    `If you want to use an array you should use more than one value. 
                    A string is better in that situation
                    `)


            const everyValueIsAStringWithARelativeOrAbsolutePathsAndEitherAWidthSizeOrPixelDensity =
                value.every(
                    value => value === "string" && this.checkIfStringIsValid(value)
                )

            if (!everyValueIsAStringWithARelativeOrAbsolutePathsAndEitherAWidthSizeOrPixelDensity)

                return generateMarkdocErrorObjectThatHasAMessageThatTellsTheUserAValueIsNotRight(
                    `If you are using an array please use a string that specifies,
                     a relative or absolute path and either a width viewport width or a pixel density at the end.
                    Please use a space before writing the number.
                    `)


        }

        return generateMarkdocErrorObjectThatHasAMessageThatTellsTheUserAValueIsNotRight(
            `You must return an array or a string when using this attribute.
            Please write the string as a valid URL or a path to a file.
            You can also specify a pixel density, a width or a viewport width.
            When writing a array you must specify more than one value and specify, a pixel density, a width or a viewport width.  
            `)

    }

}

export class SizesAttribute extends MarkdocValidatorAttribute implements CustomAttributeTransformContract {


    private readonly mediaSizesAttribute =
        /^(?<query>\((?:min|max)-width:\d{2,4}(?:em)?\))(?<extended_query>\s(?:and)\s\((?:min|max)-width:\d{2,4}(?:em)?\))?\s(?<number_unit>\d{2,4}v?w)$/


    transform(value: Array<string>): Scalar {

        return typeof value !== "string"
            ? Array.isArray(value) && value?.join(",")
            : value


    }



    override returnMarkdocErrorObjectOrNothing(value: unknown): void | ValidationError {

        if (!Array.isArray(value)) {
            return generateMarkdocErrorObjectThatHasAMessageThatTellsTheUserATypeIsNotRight("array")
        }

        const invalidMediaQueryAndSizes = value.filter(
            data => typeof data !== "string" || !this.mediaSizesAttribute.test(data)
        )

        if (invalidMediaQueryAndSizes) {

            return generateMarkdocErrorObjectThatHasAMessageThatTellsTheUserAValueIsNotRight(
                `The values that you supplied are incorrect.
                You are supposed to supply a min|max width query along with sizes for this attribute.
                Ex: (min-width:40em) 45w.
                Ex: (min-width:40em) and (max-width:30) 45vw.

                You should remember to put v|vw when specifying a digit. 
                
                The digit must only have 2-4 digits.
                
                You have to specify only one media query and size per string.

                These ${invalidMediaQueryAndSizes.join(",")} aren't the right values. 
            `)

        }


    }
}



export class IntegerAttribute extends MarkdocValidatorAttribute {

    override returnMarkdocErrorObjectOrNothing(value: unknown,): void | ValidationError {

        if (typeof value !== "number")
            return generateMarkdocErrorObjectThatHasAMessageThatTellsTheUserATypeIsNotRight("number")


        if (!Number.isInteger(value)) {

            return generateMarkdocErrorObjectThatHasAMessageThatTellsTheUserAValueIsNotRight(
                `The value ${value} is not an integer. 
                Please provide an integer not a float  
                `
            )
        }

    }
};





