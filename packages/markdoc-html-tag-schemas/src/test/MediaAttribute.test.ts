import { MediaAttribute } from "packages/markdoc-html-tag-schemas/src/lib/schema/source"


describe("Testing MediaAttribute.returnMarkdocErrorObjectOrNothing()", () => {


    const mediaAttribute = new MediaAttribute()

    describe("It returns an invalid-type markdoc error object when a string is not passed", () => {

        it.each([null, undefined, true, 4])
            ("Returns %# a invalid-type markdoc error object", (value) => {


                expect(mediaAttribute.returnMarkdocErrorObjectOrNothing(value))
                    .toEqualMarkdocErrorObjectThatTellsTheUserThatATypeIsNotRight()


            })


    })






    describe("It returns nothing when a valid media query is passed", () => {




        it("returns undefined when a proper deviceOperatorAndOrientation query is passed", () => {


            expect(
                mediaAttribute.returnMarkdocErrorObjectOrNothing("screen , (orientation:landscape)")
            ).toBeUndefined()

        })


        it("returns undefined when a proper deviceOperatorAndAspectRatioRegex query is passed", () => {

            expect(mediaAttribute.returnMarkdocErrorObjectOrNothing(
                "screen and (aspect-ratio:16/9)"
            )).toBeUndefined()

        })

        it("returns undefined when a proper deviceOperatorAndMediaQueryRegex query is passed", () => {

            expect(mediaAttribute.returnMarkdocErrorObjectOrNothing(
                "screen and (min-width:500px)"
            )).toBeUndefined()
        })


        it("returns undefined when a proper deviceOperatorAndColorOrColorIndexRegex query is passed", () => {


            expect(mediaAttribute.returnMarkdocErrorObjectOrNothing("screen and (color:3)"))
                .toBeUndefined()

            expect(mediaAttribute.returnMarkdocErrorObjectOrNothing("screen and (color-index:256)"))
                .toBeUndefined()

        })


        it("returns undefined when a proper deviceOperatorAndMonoChromeRegex query is passed", () => {


            expect(mediaAttribute.returnMarkdocErrorObjectOrNothing("screen and (monochrome:2)"))
                .toBeUndefined()


        })


        it("returns undefined when a proper deviceOperatorAndGridRegex query is passed", () => {

            expect(mediaAttribute.returnMarkdocErrorObjectOrNothing("handheld and (grid:1)"))
                .toBeUndefined()


        })

        it("returns undefined when a proper deviceOperatorAndScanRegex query is passed", () => {

            expect(mediaAttribute.returnMarkdocErrorObjectOrNothing("tv and (scan:interlace)"))
                .toBeUndefined()


        })



    })


})
