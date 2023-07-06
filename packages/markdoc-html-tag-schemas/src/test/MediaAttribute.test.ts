import { MediaAttribute } from "packages/markdoc-html-tags/src/lib/schema/source"

describe.todo("Testing MediaAttribute.returnMarkdocErrorObjectOrNothing()", () => {


    const mediaAttribute = new MediaAttribute()

    describe.todo("It returns an invalid-type markdoc error object when a string is not passed", () => {

        it.each([null, undefined, true, 4])
            ("Returns, %# a invalid-type markdoc error object", (value) => {


                expect(
                    mediaAttribute.returnMarkdocErrorObjectOrNothing(value)
                )


            })


    })



    describe.todo("It returns nothing when a valid media query is passed", () => {


        it("returns undefined when a proper deviceOperatorAndOrientation query is passed", () => {

        })

        it.todo("returns undefined when a proper deviceOperatorAndAspectRatioRegex query is passed", () => {

        })

        it.todo("returns undefined when a proper deviceOperatorAndMediaQueryRegex query is passed", () => {

        })

        it.todo("returns undefined when a proper deviceOperatorAndColorOrColorIndexRegex query is passed", () => {

        })

        it.todo("returns undefined when a proper deviceOperatorAndMonoChromeRegex query is passed", () => {

        })


        it.todo("returns undefined when a proper deviceOperatorAndGridRegex query is passed", () => {

        })

        it.todo("returns undefined when a proper deviceOperatorAndScanRegex query is passed", () => {

        })



    })


})
