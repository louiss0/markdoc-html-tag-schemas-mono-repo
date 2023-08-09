import type { Assertion, TestAPI } from 'vitest'

declare module "vitest" {

    interface CustomMatchers<T> {
        toEqualMarkdocErrorObject(): T
        toEqualMarkdocErrorObjectThatTellsTheUserThatATypeIsNotRight(): T
        toEqualMarkdocErrorObjectThatTellsTheUserThatAValueIsNotRight(): T

    }

    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface Assertion<T = unknown> extends CustomMatchers<T> { }

}