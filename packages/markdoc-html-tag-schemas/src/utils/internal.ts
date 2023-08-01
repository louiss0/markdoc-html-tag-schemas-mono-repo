import type { Scalar, } from "@markdoc/markdoc";


export type AllowedMarkdocTypesAsStrings = "string" | "number" | "array" | "boolean" | "object"

type prettify<T extends Record<PropertyKey, unknown> > = { [k in keyof T]: T[k] } & {};

export const mergeObjects = <
  T extends Record<string, unknown>,
  U extends Record<string, unknown>
>(
  t: T,
  u: U
) => {
  return { ...t, ...u } as prettify<{
    [k in keyof T | keyof U]: k extends keyof U
      ? U[k]
      : k extends keyof T
      ? T[k]
      : never;
  }>;
};


const isValidPropKey = (value: unknown): value is PropertyKey =>
    typeof value === "string"
    || typeof value === "number"
    || typeof value === "symbol"


const everyValueIsAValidPropKey = (value: Array<unknown>): value is Array<PropertyKey> =>
    value.length !== 0 && value.every(isValidPropKey)


export const isObject = (value: unknown): value is Record<PropertyKey, unknown> =>
    typeof value === "object"
    && value != null
    && everyValueIsAValidPropKey(Object.keys(value))




export function toLowercaseWithDashes(str: string) {
    return str.replace(/(?<uppercasedLetter>[A-Z])/g, function (_, p1: Record<"uppercasedLetter", string>) {
        return `-${p1.uppercasedLetter?.toLowerCase()}`;
    }).toLowerCase();
}

const isAViableMarkdocPrimitive = (value: unknown) =>
    typeof value === "string"
    || typeof value === "number"
    || typeof value === "boolean"
    || value === null

export const isAnObjectThatHasViableMarkdocValues = (value: unknown): value is Record<PropertyKey, Scalar> =>
    isObject(value)
    && Object.values(value).every(
        (value: unknown) =>
            isAViableMarkdocPrimitive(value)
            || Array.isArray(value)
            && value.every(
                (value) =>
                    isAViableMarkdocPrimitive(value)
                    || isAnObjectThatHasViableMarkdocValues(value)
            )
    )

export const isViableMarkdocValue = (value: unknown): value is Scalar =>
    isAViableMarkdocPrimitive(value)
    || Array.isArray(value)
    && value.every(
        (value) =>
            isAViableMarkdocPrimitive(value)
            || isAnObjectThatHasViableMarkdocValues(value)
    )
    || isAnObjectThatHasViableMarkdocValues(value);

export const isAnObjectWithStringKeysAndValuesThatAreStringsOrNumbers =
    (value: unknown): value is Record<"string", string | number> => isObject(value)
        && Object.keys(value).every(
            (key) => typeof key === "string"
        )
        && Object.values(value).every(
            (value) => typeof value === "string" || typeof value === "number"
        )

export const transformObjectIntoStyleString =
    (object: Record<string, string | number>) => Object.entries(object).reduce(
        (carry, [key, value]) => `${carry}${toLowercaseWithDashes(key)}:${value};`,
        ""
    );

