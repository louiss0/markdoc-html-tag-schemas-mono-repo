import { SrcSetAttribute } from "packages/markdoc-html-tag-schemas/src/lib/custom-attributes"





describe("Testing SizesAttribute.returnMarkdocErrorObjectOrNothing()", () => {


    const srcSetAttribute = new SrcSetAttribute()



    describe("returns an error when a value that is not a string or array is passed", () => {

        it.each([0, {}, "foo", null,])
            ("For the %# index it returns undefined", (value) => {




                const res = srcSetAttribute
                    .returnMarkdocErrorObjectOrNothing(value)



                expect(res).toEqualMarkdocErrorObjectThatTellsTheUserThatAValueIsNotRight()





            })
    })





    describe("returns undefined with passing in a string with a relative absolute path, and either a width viewport with", () => {


        it.each([
            "../foo/image.jpg 200w",
            "../foo/image.jpg 200w",
            "foo/image.jpg 200vw",
            "foo/image.jpg 200vw",
        ])("returns undefined with %s passed in", (value) => {


            const res = srcSetAttribute
                .returnMarkdocErrorObjectOrNothing(value)


            expect(res).toBeUndefined()



        })



    })


    describe("returns undefined with passing in a string with a relative absolute path, and either 1-2 pixel density", () => {

        it.each([
            "../foo/image.jpg 2x",
            "foo/image.jpg 2x",
            "../foo/image.jpg 1x",
            "foo/image.jpg 1x",
        ])("returns undefined with %s passed in", (value) => {


            const res = srcSetAttribute
                .returnMarkdocErrorObjectOrNothing(value)

            expect(res).toBeUndefined()


        })

    })



    describe("Returns a Error Object based on array shape", () => {


        it("returns an error object when the length of an array passed is less than two", () => {


            const res = srcSetAttribute
                .returnMarkdocErrorObjectOrNothing([""])


            expect(res).toEqualMarkdocErrorObjectThatTellsTheUserThatAValueIsNotRight()



            expect(res).toMatchInlineSnapshot(`
              {
                "id": "invalid-value",
                "level": "error",
                "message": "If you want to use an array you should use more than one value. 
                                  A string is better in that situation
                                  ",
              }
            `)


        })


        it("A MarkdocErrorObject is returned if one value is not a viable one", () => {


            const res = srcSetAttribute
                .returnMarkdocErrorObjectOrNothing([
                    "",
                    ""
                ])

            expect(res).toEqualMarkdocErrorObjectThatTellsTheUserThatAValueIsNotRight()


            expect(res).toMatchInlineSnapshot(`
              {
                "id": "invalid-value",
                "level": "error",
                "message": "If you are using an array please use a string that specifies,
                                   a relative or absolute path and either a width viewport width or a pixel density at the end.
                                  
                                  Please use a space before writing the number.                          

                      ",
              }
            `)


        })


        describe("A MarkdocErrorObject is returned if one value is not an absolute path with a width or viewport width", () => {


            it.each([
                ["wrong unit", ["/about 80w", "/home 100v"]],
                ["no unit", ["/contact 50", "/blog 75w",]],
                ["no absolute path", ["gallery 120vw", "/blog 75w",]]
            ])
                ("returns markdocErrorObjectThatHasAMessageThatTellsTheUserAValueIsNotRight for s% ", (_, value) => {

                    const res = srcSetAttribute
                        .returnMarkdocErrorObjectOrNothing(value)

                    expect(res).toEqualMarkdocErrorObjectThatTellsTheUserThatAValueIsNotRight()


                })






        })

        describe("A MarkdocErrorObject is returned if one value is not an relative path with a width or viewport width", () => {

            it.each([
                ["wrong unit", ["gallery 120vw", "../home 100v"]],
                ["no unit", ["gallery 120vw", "../contact 50"]],
                ["no absolute path", ["gallery 120vw", "../blog 66vw"]]
            ])
                ("returns markdocErrorObjectThatHasAMessageThatTellsTheUserAValueIsNotRight for s% ", (_, value) => {

                    const res = srcSetAttribute
                        .returnMarkdocErrorObjectOrNothing(value)

                    expect(res).toEqualMarkdocErrorObjectThatTellsTheUserThatAValueIsNotRight()


                })



        })




        describe("A MarkdocErrorObject is returned if one value is not an absolute path with a valid pixel density ", () => {


            it.each([
                ["string with unit but no number", ["/images/image3.jpg x",]],
                ["invalid path with unit", ["images/image4.jpg 2.5x"]],
                ["number with no unit", ["/images/image5.jpg 1"]]
            ])("returns markdocErrorObjectThatHasAMessageThatTellsTheUserAValueIsNotRight for s%", (_, value) => {

                const res = srcSetAttribute
                    .returnMarkdocErrorObjectOrNothing(value)

                expect(res).toEqualMarkdocErrorObjectThatTellsTheUserThatAValueIsNotRight()

            })



        })

        describe("A MarkdocErrorObject is returned if one value is not an relative path with a valid pixel density", () => {


            it.each([
                ["string with unit but no number", [
                    "/images/image3.jpg x",
                    "../images/image1.jpg 2x",
                    "../images/image2.jpg 1.5x",
                    "../images/image3.jpg 3x",
                ]],
                ["invalid path with unit", [
                    "images/image4.jpg 2.5x",
                    "../images/image1.jpg 2x",
                    "../images/image2.jpg 1.5x",
                    "../images/image3.jpg 3x",
                ]],
                ["number with no unit", [
                    "/images/image5.jpg 1",
                    "../images/image1.jpg 2x",
                    "../images/image2.jpg 1.5x",
                    "../images/image3.jpg 3x",
                ]]
            ])("returns markdocErrorObjectThatHasAMessageThatTellsTheUserAValueIsNotRight for s%", (_, value) => {

                const res = srcSetAttribute
                    .returnMarkdocErrorObjectOrNothing(value)

                expect(res).toEqualMarkdocErrorObjectThatTellsTheUserThatAValueIsNotRight()

            })

        })


    })



})
