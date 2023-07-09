import * as markdoc from '@markdoc/markdoc';

import type {
    SchemaAttributesWithAPrimaryKey,
    SchemaAttributesWithNoPrimaryKey,
    ProperSchemaMatches,
    MarkdocAttributeSchema,
    RequiredSchemaAttributeType,
} from 'packages/markdoc-html-tag-schemas/src/lib/attributes';

import {
    toLowercaseWithDashes,
    type AllowedMarkdocTypesAsStrings,
    isViableMarkdocValue,
} from 'packages/markdoc-html-tag-schemas/src/utils/internal';

const createTag = <T extends string>(
    name: T | Omit<string, T>,
    children: Exclude<markdoc.Tag['children'], undefined>,
    attributes?: Record<string, unknown>
) => new markdoc.Tag(name as string, attributes, children);


type MarkdocTransform = Exclude<markdoc.Schema['transform'], undefined>;

type ObjectWithTransformMethod<T extends string> = {
    transform?(
        node: Parameters<MarkdocTransform>[0],
        config: Parameters<MarkdocTransform>[1],
        createTagFt: typeof createTag<T>
    ): ReturnType<MarkdocTransform>;
};

type StrictMarkdocSchema<
    R extends string,
    C extends markdoc.ConfigType = markdoc.ConfigType
> = markdoc.Schema<C, R> & { render: R };

type TagsSchema<
    T extends ProperSchemaMatches,
    U extends RequiredSchemaAttributeType,
    R extends string,
    C extends markdoc.ConfigType = markdoc.ConfigType
> = Omit<StrictMarkdocSchema<R, C>, 'attributes'> & {
    attributes: SchemaAttributesWithAPrimaryKey<T, U>;
};

type SelfClosing = {
    selfClosing: true;
    children?: never;
};

type NonSelfClosing = {
    selfClosing?: never;
    children: Exclude<markdoc.Schema['children'], undefined>;
};

type NonPrimaryTagsSchema<
    T extends ProperSchemaMatches,
    U extends RequiredSchemaAttributeType,
    R extends string
> = Omit<TagsSchema<T, U, R>, 'attributes'> & {
    attributes: SchemaAttributesWithNoPrimaryKey<T, U>
};

export const createAnArrayOfMarkdocErrorObjectsBasedOnEachConditionThatIsTrue =
    (
        ...conditionalErrors: Array<
            [condition: boolean, error: ReturnType<typeof generateMarkdocErrorObject>]
        >
    ) =>
        conditionalErrors.reduce(
            (carry: Array<markdoc.ValidationError>, [condition, error]) =>
                condition ? carry.concat(error) : carry,
            []
        );


type GeneratePrimarySchemaPrimaryConfig<T extends ProperSchemaMatches,
    U extends RequiredSchemaAttributeType, R extends string,> = Pick<
        NonPrimaryTagsSchema<T, U, R>,
        "render" | "description" | "selfClosing" | "inline"
    > & {
        type: MarkdocAttributeSchema<T, U>["type"]
    }


type CustomTransformConfig<
    T extends ProperSchemaMatches,
    U extends RequiredSchemaAttributeType,
    R extends string
> = Pick<NonPrimaryTagsSchema<T, U, R>, "slots" | "validate" | "children">
    & ObjectWithTransformMethod<R>
    & {
        attributes?: SchemaAttributesWithNoPrimaryKey<T, U>
    }


export const getGeneratePrimarySchema = <
    T extends ProperSchemaMatches,
    U extends RequiredSchemaAttributeType,
    R extends string,
>({ type, render, ...rest }: GeneratePrimarySchemaPrimaryConfig<T, U, R>) =>
    ({ transform, attributes = {}, ...rest2 }: CustomTransformConfig<T, RequiredSchemaAttributeType, R>) =>
        Object.freeze({
            render,
            attributes: {
                primary: {
                    type,
                    required: true
                },
                ...attributes
            },
            ...rest,
            transform: transform
                ? (node: markdoc.Node, config: markdoc.Config) =>
                    transform(node, config, createTag)
                : undefined,
            ...rest2
        } satisfies TagsSchema<T, U, R>)




export type GenerateNonPrimarySchemaConfig<
    T extends ProperSchemaMatches,
    U extends RequiredSchemaAttributeType,
    R extends string
> = (NonSelfClosing | SelfClosing) &
    Pick<NonPrimaryTagsSchema<T, U, R>, 'attributes' | 'render' | 'description'>;

export type GenerateNonSecondarySchemaConfig<
    T extends ProperSchemaMatches,
    U extends RequiredSchemaAttributeType,
    R extends string
> = Pick<NonPrimaryTagsSchema<T, U, R>, 'slots' | 'validate'> &
    ObjectWithTransformMethod<R>;

export const getGenerateNonPrimarySchema = <
    T extends ProperSchemaMatches,
    U extends RequiredSchemaAttributeType,
    const V extends GenerateNonPrimarySchemaConfig<T, U, R>,
    R extends string
>(
    { attributes, ...rest }: V
) => {
    const generateNonPrimarySchema = <
        const W extends GenerateNonSecondarySchemaConfig<T, U, R>
    >(
        secondaryConfig?: W
    ) =>
        Object.freeze(
            secondaryConfig
                ? {
                    attributes,
                    ...rest,
                    ...{
                        ...secondaryConfig,
                        transform: secondaryConfig.transform
                            ? (node: markdoc.Node, config: markdoc.Config) =>
                                secondaryConfig.transform?.(
                                    node,
                                    config,
                                    createTag
                                )
                            : undefined,

                    },

                }
                : Object.assign(rest, { attributes })
        ) satisfies NonPrimaryTagsSchema<T, U, R>;

    return generateNonPrimarySchema;
};


getGenerateNonPrimarySchema({
    render: "test",
    description: "",
    attributes: {
        label: {
            type: String,
            description: "This is the label for the text"
        },
        number: {
            type: Number,
            description: "This is the label for the text"
        },
        isSubscribed: {
            type: Boolean,
            description: "This is the label for the text"
        },
    },
    selfClosing: true
})();


type GenerateSelfClosingTagSchemaPrimaryConfig<
    T extends ProperSchemaMatches,
    U extends RequiredSchemaAttributeType,
    R extends string
> = Required<
    Pick<NonPrimaryTagsSchema<T, U, R>, 'description' | 'render'> & {
        validationType: MarkdocAttributeSchema<T, U>['type'];
    }
>;

type GenerateSelfClosingTagSchemaSecondaryConfig<
    T extends ProperSchemaMatches,
    U extends RequiredSchemaAttributeType,
    R extends string
> = Partial<Pick<NonPrimaryTagsSchema<T, U, R>, 'attributes' | 'inline'>> &
    ObjectWithTransformMethod<R>;

export function generateSelfClosingTagSchema<
    T extends ProperSchemaMatches,
    U extends RequiredSchemaAttributeType,
    R extends string
>(
    primaryConfig: GenerateSelfClosingTagSchemaPrimaryConfig<T, U, R>,
    secondaryConfig: GenerateSelfClosingTagSchemaSecondaryConfig<T, RequiredSchemaAttributeType, R> = {}
) {
    const { render, validationType, description } = primaryConfig;

    const {
        attributes,
        inline = true,
        transform = (node, config, createTag) => {
            const { primary, ...attributes } = node.transformAttributes(config);

            return createTag(render, [primary], attributes);
        },
    } = secondaryConfig;

    const generatePrimarySchema = getGeneratePrimarySchema<T, U, R>(
        {
            render,
            type: validationType,
            description,
            selfClosing: true,
            inline,
        }
    );

    return generatePrimarySchema({
        attributes,
        transform,
    });
}

export const generateMarkdocErrorObject = (
    id: markdoc.ValidationError['id'],
    level: markdoc.ValidationError['level'],
    message: markdoc.ValidationError['message'],
    location?: markdoc.ValidationError['location']
) =>
    Object.freeze(
        location ? { id, level, message, location } : { id, level, message }
    ) satisfies markdoc.ValidationError;

export const generateMarkdocErrorObjectThatHasAMessageThatTellsTheUserATypeIsNotRight =
    (type: AllowedMarkdocTypesAsStrings) =>
        generateMarkdocErrorObject(
            'invalid-type',
            'error',
            `The value passed is not the right type is supposed to be a ${type}`
        );

export const generateMarkdocErrorObjectThatHasAMessageThatTellsTheUserAValueIsNotRight =
    (message: string) =>
        generateMarkdocErrorObject('invalid-value', 'error', message);

type GenerateNonPrimarySchemaConfigThatDoesNotAllowDataConfig<
    T extends ProperSchemaMatches,
    U extends RequiredSchemaAttributeType,
    R extends string
> = GenerateNonPrimarySchemaConfig<T, U, R> & {
    attributes: { data?: never } & Partial<
        SchemaAttributesWithNoPrimaryKey<T, U>
    >;
};

type GenerateNonSecondarySchemaConfigThatDoesNotAllowTransformConfig<
    T extends ProperSchemaMatches,
    U extends RequiredSchemaAttributeType,
    R extends string
> = Omit<GenerateNonSecondarySchemaConfig<T, U, R>, 'transform' | 'validate'>;

export const generateNonPrimarySchemaWithATransformThatGeneratesDataAttributes =
    <
        T extends ProperSchemaMatches,
        U extends RequiredSchemaAttributeType,
        V extends GenerateNonPrimarySchemaConfigThatDoesNotAllowDataConfig<T, U, R>,
        R extends string
    >(
        primaryConfig: V
    ) => {
        const { attributes, render } = primaryConfig;

        return <
            W extends GenerateNonSecondarySchemaConfigThatDoesNotAllowTransformConfig<
                T,
                U,
                R
            >
        >(
            secondaryConfig?: W
        ) => {
            const primaryConfigWithDataAttributeInserted = Object.assign(
                primaryConfig,
                {
                    render,
                    attributes: {
                        ...attributes,
                    },
                }
            );
            const generateNonPrimarySchema = getGenerateNonPrimarySchema(
                primaryConfigWithDataAttributeInserted
            );

            return generateNonPrimarySchema({
                validate(node, config) {
                    const attrs = node.transformAttributes(config);

                    if (!('data' in attrs)) return [];

                    const keysWithNoNumberBooleanOrStringValues = Object.entries(
                        attrs['data']
                    ).reduce(
                        (carry: Array<string>, [key, value]) =>
                            isViableMarkdocValue(value) ? carry.concat(key) : carry,
                        []
                    );

                    return createAnArrayOfMarkdocErrorObjectsBasedOnEachConditionThatIsTrue(
                        [
                            keysWithNoNumberBooleanOrStringValues.length !== 0,
                            generateMarkdocErrorObjectThatHasAMessageThatTellsTheUserAValueIsNotRight(`
                                Data attribute values are only supposed to have strings numbers and booleans.
                                HTML can't parse those anything else.
                                Please fix the following keys ${keysWithNoNumberBooleanOrStringValues.join(
                                ','
                            )
                                }.  
                            `),
                        ]
                    );
                },
                transform(node, config, createTag) {
                    const { attributes } = node;

                    let newAttributes = {};
                    if ('data' in attributes) {
                        const { data } = attributes;

                        const arrayTuplesWithKeysThatHaveDataAsThePrefixForEachWordAndIsCamelCased =
                            Object.entries(data).map(([key, value]) => [
                                `data - ${toLowercaseWithDashes(key)}`,
                                value,
                            ]);

                        newAttributes = {
                            ...Object.fromEntries(
                                arrayTuplesWithKeysThatHaveDataAsThePrefixForEachWordAndIsCamelCased
                            ),
                        };

                        delete attributes['data'];
                    }

                    return createTag(
                        render,
                        node.transformChildren(config), {
                        ...attributes,
                        ...newAttributes,
                    });
                },
                ...secondaryConfig,
            });
        };
    };
