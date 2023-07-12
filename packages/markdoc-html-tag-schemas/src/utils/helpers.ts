import * as markdoc from '@markdoc/markdoc';

import type {
    SchemaAttributesWithAPrimaryKey,
    SchemaAttributesWithNoPrimaryKey,
    ProperSchemaMatches,
    MarkdocAttributeSchema,
    RequiredSchemaAttribute,
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
    U extends RequiredSchemaAttribute,
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
    U extends RequiredSchemaAttribute,
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


type GeneratePrimarySchemaPrimaryConfig<
    T extends ProperSchemaMatches,
    U extends RequiredSchemaAttribute,
    R extends string,
> = Pick<
    NonPrimaryTagsSchema<T, U, R>,
    "render" | "description" | "selfClosing" | "inline"
> & {
    type: MarkdocAttributeSchema<T, U>["type"]
}


type CustomTransformConfig<
    T extends ProperSchemaMatches,
    U extends RequiredSchemaAttribute,
    R extends string
> = Pick<NonPrimaryTagsSchema<T, U, R>, "slots" | "validate" | "children">
    & ObjectWithTransformMethod<R>
    & {
        attributes: SchemaAttributesWithNoPrimaryKey<T, U>
    }


export const getGeneratePrimarySchema = <
    T extends ProperSchemaMatches,
    U extends RequiredSchemaAttribute,
    R extends string,
>({ type, render, ...rest }: GeneratePrimarySchemaPrimaryConfig<T, U, R>) =>
    <const W extends CustomTransformConfig<T, U, R>>({ transform, attributes = {}, ...rest2 }: W) =>
        Object.freeze({
            render,
            attributes: {
                primary: {
                    type,
                    render: true,
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
    U extends RequiredSchemaAttribute,
    R extends string
> = (NonSelfClosing | SelfClosing) &
    Pick<NonPrimaryTagsSchema<T, U, R>, 'attributes' | 'render' | 'description'>;

export type GenerateNonPrimarySchemaSecondaryConfig<
    T extends ProperSchemaMatches,
    U extends RequiredSchemaAttribute,
    R extends string
> = Pick<NonPrimaryTagsSchema<T, U, R>, 'slots' | 'validate'> &
    ObjectWithTransformMethod<R>;

export const getGenerateNonPrimarySchema = <
    T extends ProperSchemaMatches,
    U extends RequiredSchemaAttribute,
    R extends string,
    const V extends GenerateNonPrimarySchemaConfig<T, U, R>
>(
    primaryConfig: V,
) => {
    const generateNonPrimarySchema = <W extends GenerateNonPrimarySchemaSecondaryConfig<T, U, R>>(
        secondaryConfig?: W
    ) =>
        Object.freeze(
            secondaryConfig
                ? Object.assign({ ...primaryConfig }, secondaryConfig, {

                    transform: secondaryConfig.transform
                        ? (node: markdoc.Node, config: markdoc.Config) =>
                            secondaryConfig.transform?.(
                                node,
                                config,
                                createTag
                            )
                        : undefined,

                })
                : primaryConfig
        ) satisfies NonPrimaryTagsSchema<T, U, R>;

    return generateNonPrimarySchema;
};


type GenerateSelfClosingTagSchemaPrimaryConfig<
    T extends ProperSchemaMatches,
    U extends RequiredSchemaAttribute,
    R extends string
> = Required<
    Pick<NonPrimaryTagsSchema<T, U, R>, 'description' | 'render'>
    & {
        type: MarkdocAttributeSchema<T, U>['type'];
    }
>;

type GenerateSelfClosingTagSchemaSecondaryConfig<
    T extends ProperSchemaMatches,
    U extends RequiredSchemaAttribute,
    R extends string
> = Partial<Pick<NonPrimaryTagsSchema<T, U, R>, "attributes" | "inline">>
    & ObjectWithTransformMethod<R>;

export function generateSelfClosingTagSchema<
    T extends ProperSchemaMatches,
    U extends RequiredSchemaAttribute,
    R extends string,
>(
    primaryConfig: GenerateSelfClosingTagSchemaPrimaryConfig<T, U, R>,
    secondaryConfig: GenerateSelfClosingTagSchemaSecondaryConfig<T, U, R> = {}
) {

    const { render, type, description, } = primaryConfig;


    const {
        inline = true,
        attributes = {},
        transform = (node, config, createTag) => {

            const { primary, ...rest } = node.transformAttributes(config)

            return createTag(render, [primary], rest)

        }
    } = secondaryConfig

    const generatePrimarySchema = getGeneratePrimarySchema<T, RequiredSchemaAttribute, R>(
        {
            render,
            type,
            description,
            selfClosing: true,
            inline,
        }
    );


    return generatePrimarySchema({
        attributes,
        transform
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
    U extends RequiredSchemaAttribute,
    R extends string
> = GenerateNonPrimarySchemaConfig<T, U, R> & {
    attributes: { data?: never } & Partial<
        SchemaAttributesWithNoPrimaryKey<T, U>
    >;
};

type GenerateNonSecondarySchemaConfigThatDoesNotAllowTransformConfig<
    T extends ProperSchemaMatches,
    U extends RequiredSchemaAttribute,
    R extends string
> = Omit<GenerateNonPrimarySchemaSecondaryConfig<T, U, R>, 'transform' | 'validate'>;

export const generateNonPrimarySchemaWithATransformThatGeneratesDataAttributes =
    <
        T extends ProperSchemaMatches,
        U extends RequiredSchemaAttribute,
        R extends string,
        const V extends GenerateNonPrimarySchemaConfigThatDoesNotAllowDataConfig<T, U, R> =
        GenerateNonPrimarySchemaConfigThatDoesNotAllowDataConfig<T, U, R>
    >(
        primaryConfig: V
    ) => {
        const { attributes, render } = primaryConfig;

        return <
            const W extends GenerateNonSecondarySchemaConfigThatDoesNotAllowTransformConfig<
                T,
                U,
                R
            > = GenerateNonSecondarySchemaConfigThatDoesNotAllowTransformConfig<
                T,
                U,
                R
            >>(
                secondaryConfig?: W
            ) => {

            const objectWithRenderPropertyDataAttributeFilledInAndOtherAttributesSpreadIn = {
                render,
                attributes: {
                    data: {
                        type: Object,
                        required: false
                    },
                    ...attributes,
                },
            }

            const primaryConfigWithDataAttributeInserted =
                Object.assign(
                    primaryConfig,
                    objectWithRenderPropertyDataAttributeFilledInAndOtherAttributesSpreadIn
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
                        (carry: Array<string>, [key, value]) => !isViableMarkdocValue(value) ? carry.concat(key) : carry,
                        []
                    );

                    return createAnArrayOfMarkdocErrorObjectsBasedOnEachConditionThatIsTrue(
                        [
                            keysWithNoNumberBooleanOrStringValues.length !== 0,
                            generateMarkdocErrorObjectThatHasAMessageThatTellsTheUserAValueIsNotRight(
                                `Data attribute values are only supposed to have strings numbers and booleans.
                                HTML can't parse those anything else.
                                Please fix the following keys ${keysWithNoNumberBooleanOrStringValues.join(',')}.
                                `
                            ),
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
                                `data-${toLowercaseWithDashes(key)}`,
                                value,
                            ]);


                        newAttributes = Object.fromEntries(
                            arrayTuplesWithKeysThatHaveDataAsThePrefixForEachWordAndIsCamelCased
                        ),


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
