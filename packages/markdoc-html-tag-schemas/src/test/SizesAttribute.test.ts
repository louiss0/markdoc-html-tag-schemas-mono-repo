import { SizesAttribute } from "packages/markdoc-html-tag-schemas/src/utils"


describe.todo("Testing SizesAttribute.returnMarkdocErrorObjectOrNothing()", () => {


    const sizesAttribute = new SizesAttribute()


    describe.todo(
        "Returns a markdoc error object when a value is not an object",
        () => {

            it.each(["foo", null, [], undefined])
                ("Expect %# to return a markdoc error object that is based of type", (value) => {


                    expect(sizesAttribute.returnMarkdocErrorObjectOrNothing(value)
                    ).toEqualMarkdocErrorObjectThatTellsTheUserThatATypeIsNotRight()

                })
        }
    )


    describe.todo("Returns a markdoc error object that tells the user a value is not right when the array passed has incorrect values", () => {



        it.each([])
            ("returns %# a markdoc error object that tells the user a value isn't right", () => {


            })


    })



})
