import { AllowAttribute } from "packages/markdoc-html-tags/src/lib/schema/iframe"




describe("Testing AllowAttribute.returnMarkdocErrorObjectOrNothing()", () => {


    const allowAttribute = new AllowAttribute()


    test.todo("A MarkdocErrorObject is returned if value is not an object", () => {



        const res = allowAttribute.returnMarkdocErrorObjectOrNothing({})


        expect(res).toEqualMarkdocErrorObjectThatTellsTheUserThatATypeIsNotRight()


    })



    test.todo("A MarkdocErrorObject is returned when not all keys in the object are allowed permission directive keys",
        () => {



            const res = allowAttribute.returnMarkdocErrorObjectOrNothing({})

            expect(res).toEqualMarkdocErrorObjectThatTellsTheUserThatAValueIsNotRight()


        })



    test.todo("Makes sure that all values in the object correct values for allowed permission directive keys",
        () => {



            const res = allowAttribute.returnMarkdocErrorObjectOrNothing({})


        })



})