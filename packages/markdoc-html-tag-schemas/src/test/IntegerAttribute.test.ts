import { IntegerAttribute } from "packages/markdoc-html-tag-schemas/src/utils"

describe("Testing IntegerAttribute.returnMarkdocErrorObjectOrNothing()", () => {

    const integerAttribute = new IntegerAttribute()

    it("returns generateMarkdocErrorObjectThatHasAMessageThatTellsTheUserATypeIsNotRight return value whe not passed an attribute ", () => {



        const res = integerAttribute.returnMarkdocErrorObjectOrNothing(null)

        expect(res).toEqualMarkdocErrorObjectThatTellsTheUserThatATypeIsNotRight()






    })

    it("returns a valueMarkdocObject when number is not an integer ", () => {

        const res = integerAttribute.returnMarkdocErrorObjectOrNothing(4.5)

        expect(res).toEqualMarkdocErrorObjectThatTellsTheUserThatAValueIsNotRight()


    })




})