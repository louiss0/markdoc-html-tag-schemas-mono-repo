
import { SizesAttribute } from "packages/markdoc-html-tag-schemas/src/utils"


describe("Testing SizesAttribute.returnMarkdocErrorObjectOrNothing()", () => {


    const sizesAttribute = new SizesAttribute()


    describe("Returns a markdoc error object when a value is not an object", () => {


        it.each(["foo", null, false,])
            ("Expect %# to return a markdoc error object that is based of type", (value) => {


                expect(sizesAttribute
                    .returnMarkdocErrorObjectOrNothing(value)
                )
                    .toEqualMarkdocErrorObjectThatTellsTheUserThatATypeIsNotRight()



            })
    }
    )


    describe("Returns a markdoc error object that tells the user a value is not right when the array passed has incorrect values", () => {



        it.each([
            ['arrayHasEmptyString', ["(max-width: 710px) 120px", ""]],
            ['arrayHasANull', ["(max-width: 710px) 120px", , null]],
            ['arrayHasANumber', ["(max-width: 710px) 120px", , 4]],
        ])("returns s% a markdoc error object that tells the user a value isn't right", (_, value) => {


            expect(sizesAttribute.returnMarkdocErrorObjectOrNothing(value))
                .toEqualMarkdocErrorObjectThatTellsTheUserThatAValueIsNotRight()


        })


    })


})
