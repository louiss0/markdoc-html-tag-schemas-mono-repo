import { isAnObjectThatHasViableMarkdocValues, isViableMarkdocValue, transformObjectIntoStyleString } from "packages/markdoc-html-tag-schemas/src/utils/internal"


describe("Checking to see if the internal utilities work as expected", () => {


    describe("Testing isAnObjectThatHasViableMarkdocValues", () => {



        it("Passes if an object has viable markdoc primitives", () => {


            expect(isAnObjectThatHasViableMarkdocValues({
                name: "John Doe",
                age: 25,
                isStudent: true
            }))
                .toBe(true)


        })

        it("Passes if an object has arrays with viableMarkdocPrimitives", () => {

            expect(isAnObjectThatHasViableMarkdocValues({
                fruits: ["apple", "banana", "orange"],
                numbers: [1, 2, 3, 4, 5],
                flags: [true, false, true, false]
            })).toBe(true)

        })


        it("Passes if an object has arrays with objects that have viable markdoc primitives", () => {

            expect(isAnObjectThatHasViableMarkdocValues(
                {
                    fruits: [
                        {
                            name: "apple",
                            quantity: 10
                        },
                        {
                            name: "banana",
                            quantity: 5
                        }
                    ],
                    cars: [
                        {
                            brand: "Toyota",
                            year: 2020,
                            isElectric: false
                        },
                        {
                            brand: "Tesla",
                            year: 2022,
                            isElectric: true
                        }
                    ],
                    colors: [
                        {
                            name: "red",
                            code: "#FF0000",
                            isPrimary: true,
                            description: null
                        },
                        {
                            name: "blue",
                            code: "#0000FF",
                            isPrimary: true,
                            description: "A cool color"
                        },
                        {
                            name: "green",
                            code: "#00FF00",
                            isPrimary: false,
                            description: "A refreshing color"
                        }
                    ]
                }

            )).toBe(true)


        })





    })


    describe("Testing transformObjectIntoStyleString", () => {


        it("transforms an object with into a string", () => {


            const cssStyles = {
                color: "blue",
                fontSize: "20px",
                backgroundColor: "yellow",
                borderRadius: "5px",
                margin: "10px"
            };


            expect(transformObjectIntoStyleString(cssStyles))
                .toBeTypeOf("string")

        })


        it("transforms an object into a string with colons and semi-colons", () => {

            const cssStyles = {
                width: "200px",
                height: "150px",
                background: "linear-gradient(to right, #ff0000, #00ff00)",
                border: "2px solid #000",
                boxShadow: "3px 3px 5px rgba(0, 0, 0, 0.3)"
            };


            expect(transformObjectIntoStyleString(cssStyles))
                .toMatch(/^(?:(?<style_key>\b[a-z\-]+:)(?<style_value>[a-z0-9\-#,\.\s()]+);)+$/)



        })


    })

    describe("Testing is isViableMarkdocValue", () => {




        it.each([
            ["string", ""],
            ["number", 2],
            ["boolean", false],
            ["null", null],
            ["array", []],
            ["objectWithKeys are passed", { name: "James" }],
        ])("passes when a s% is passed", (_, value) => {


            expect(isViableMarkdocValue(value)).toBe(true)

        })


        it.each([
            ["emptyObject", {}],
            ["undefined", undefined],
        ])("fails when s% is passed ", (_, value) => {

            expect(isViableMarkdocValue(value)).toBe(false)

        })


    })



})