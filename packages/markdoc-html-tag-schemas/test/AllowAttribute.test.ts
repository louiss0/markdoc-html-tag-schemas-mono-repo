import { AllowAttribute } from "packages/markdoc-html-tag-schemas/src/lib/schema/tag/iframe"




describe("Testing AllowAttribute.returnMarkdocErrorObjectOrNothing()", () => {


    const allowAttribute = new AllowAttribute()


    test("A MarkdocErrorObject is returned if value is not an object", () => {



        const res = allowAttribute.returnMarkdocErrorObjectOrNothing({})


        expect(res).toEqualMarkdocErrorObjectThatTellsTheUserThatATypeIsNotRight()


    })



    test("A MarkdocErrorObject is returned when not all keys in the object are allowed permission directive keys",
        () => {



            const res = allowAttribute.returnMarkdocErrorObjectOrNothing({ name: '' })

            expect(res)
                .toEqualMarkdocErrorObjectThatTellsTheUserThatAValueIsNotRight()

            expect(res).toMatchInlineSnapshot(`
              {
                "id": "invalid-value",
                "level": "error",
                "message": "The keys in this object are not viable keys use one of these keys instead camera,display-capture,fullscreen,gamepad,geolocation,microphone,web-share ",
              }
            `)


        })





    test("Makes sure that all values in the object correct values for allowed permission directive keys",
        () => {



            const res = allowAttribute.returnMarkdocErrorObjectOrNothing({
                camera: "*",
                gamepad: "src https://www.test.com",
                fullscreen: null
            })

            expect(res)
                .toEqualMarkdocErrorObjectThatTellsTheUserThatAValueIsNotRight(

            )

            expect(res).toMatchInlineSnapshot(`
              {
                "id": "invalid-value",
                "level": "error",
                "message": "
                          Please don't use any kind of string as a value. Use the keywords src of self followed by multiple URL's. 
                          You just use the * to allow all all url's 
                          ",
              }
            `)

        })



})