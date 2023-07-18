import type { Assertion, TestAPI } from 'vitest'

declare module "vitest" {

    interface CustomMatchers<T extends unknown> {
        toEqualMarkdocErrorObject(): T
        toEqualMarkdocErrorObjectThatTellsTheUserThatATypeIsNotRight(): T
        toEqualMarkdocErrorObjectThatTellsTheUserThatAValueIsNotRight(): T

    }

    interface Assertion<T = unknown> extends CustomMatchers<T> { }

}