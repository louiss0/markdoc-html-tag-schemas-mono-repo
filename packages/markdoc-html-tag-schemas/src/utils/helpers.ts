import markdoc from '@markdoc/markdoc';
import type {
    Tag, Schema, ConfigType, ValidationError, Config, Node
} from '@markdoc/markdoc';
import type {
    SchemaAttributesWithAPrimaryKey,
    SchemaAttributesWithNoPrimaryKey,
    RequiredSchemaAttribute,
} from 'packages/markdoc-html-tag-schemas/src/lib/attributes';

import {
    toLowercaseWithDashes,
    type AllowedMarkdocTypesAsStrings,
    isViableMarkdocValue,
    mergeObjects,
} from 'packages/markdoc-html-tag-schemas/src/utils/internal';

const createTag = <T extends string>(
    name: T | Omit<string, T>,
    children: Exclude<Tag['children'], undefined>,
    attributes?: Record<string, unknown>
) => new markdoc.Tag(name as string, attributes, children);




type CreateTagFunction<T extends string> = typeof createTag<T>

type MarkdocTransform = Exclude<Schema['transform'], undefined>;

type ObjectWithTransformMethod<T extends string> = {
    transform?(
        node: Parameters<MarkdocTransform>[0],
        config: Parameters<MarkdocTransform>[1],
        createTagFt: typeof createTag<T>
    ): ReturnType<MarkdocTransform>;
};


type GenericRenderProperty<T extends string> = { render: T }


type TagsSchema<
    T extends RequiredSchemaAttribute,
    R extends string,
> = Omit<Schema<ConfigType, R>, 'attributes'>
    & GenericRenderProperty<R>
    & {
        attributes: SchemaAttributesWithAPrimaryKey<T>;
    }


type TagsSchemaWithRequiredPrimaryAttribute<
    T extends RequiredSchemaAttribute,
    R extends string,
> = Omit<TagsSchema<T, R>, 'attributes'>
    & GenericRenderProperty<R>
    & {
        attributes: Required<SchemaAttributesWithAPrimaryKey<T>>;
    }



type SelfClosing = {
    selfClosing: true;
    children?: never;
};

type NonSelfClosing = {
    selfClosing?: never;
    children: ReadonlyArray<string>;
};

type NonPrimaryTagsSchema<
    T extends RequiredSchemaAttribute,
    R extends string
> = Omit<TagsSchema<T, R>, 'attributes'>
    & {
        attributes: SchemaAttributesWithNoPrimaryKey<T>
    };



export const createAnArrayOfMarkdocErrorObjectsBasedOnEachConditionThatIsTrue =
    (
        ...conditionalErrors: Array<
            readonly [condition: boolean, error: ReturnType<typeof generateMarkdocErrorObject>]
        >
    ) =>
        conditionalErrors.reduce(
            (carry: Array<ValidationError>, [condition, error]) =>
                condition ? carry.concat(error) : carry,
            []
        );




type GeneratePrimarySchemaPrimaryConfig<
    T extends RequiredSchemaAttribute,
    R extends string,
> = Pick<TagsSchemaWithRequiredPrimaryAttribute<T, R>, "description" | "selfClosing" | "inline" | "attributes">
    & GenericRenderProperty<R>


type CustomTransformConfig<
    T extends RequiredSchemaAttribute,
    R extends string
> = Pick<TagsSchemaWithRequiredPrimaryAttribute<T, R>, "slots" | "validate" | "children">
    & ObjectWithTransformMethod<R>



export const getGeneratePrimarySchema = <
    T extends RequiredSchemaAttribute,
    R extends string,
>() => <
    ST extends RequiredSchemaAttribute,
    V extends GeneratePrimarySchemaPrimaryConfig<T, R>,
    W extends CustomTransformConfig<ST, R>,
>(primaryConfig: V, secondaryConfig?: W) => {


        if (secondaryConfig) {


            const { transform, ...rest } = secondaryConfig

            return Object.freeze(mergeObjects(
                primaryConfig,
                {
                    ...rest,
                    transform: (node: Node, config: Config) =>
                        transform?.(node, config, createTag),
                }))

        }


        return Object.freeze(primaryConfig)




    }









type GenerateNonPrimarySchemaConfig<
    T extends RequiredSchemaAttribute,
    R extends string
> = Pick<NonPrimaryTagsSchema<T, R>, 'attributes' | 'description'>
& GenericRenderProperty<R>
& NonSelfClosing
    | Pick<NonPrimaryTagsSchema<T, R>, 'attributes' | 'description'>
    & GenericRenderProperty<R>
    & SelfClosing;


type GenerateNonPrimarySchemaSecondaryConfig<
    T extends RequiredSchemaAttribute,
    R extends string
> = Pick<NonPrimaryTagsSchema<T, R>, 'slots' | 'validate'> &
    ObjectWithTransformMethod<R>;

export const getGenerateNonPrimarySchema = <
    T extends RequiredSchemaAttribute,
    R extends string,
>() => <
    const V extends GenerateNonPrimarySchemaConfig<T, R>,
    const W extends GenerateNonPrimarySchemaSecondaryConfig<T, R>,
>(
    primaryConfig: V,
    secondaryConfig?: W
) => {


        if (secondaryConfig) {


            const {
                transform = (node, config, createTag) => createTag(primaryConfig.render, node.transformChildren(config), node.transformAttributes(config))
                , ...rest
            } = secondaryConfig

            const transformWithSecondaryConfig = {
                transform: (node: Node, config: Config) =>
                    transform(node, config, createTag),
                ...rest
            }

            return Object.freeze(mergeObjects(primaryConfig, transformWithSecondaryConfig))
        }




        return Object.freeze(mergeObjects(primaryConfig, {}))
    }




type GenerateSelfClosingTagSchemaPrimaryConfig<
    T extends RequiredSchemaAttribute,
    R extends string
> =
    Required<
        Pick<TagsSchemaWithRequiredPrimaryAttribute<T, R>, "render" | "attributes">
    >
    & Pick<TagsSchemaWithRequiredPrimaryAttribute<T, R>, 'description' | "inline">



type GenerateSelfClosingTagSchemaSecondaryConfig<
    T extends RequiredSchemaAttribute,
    R extends string
> = Pick<NonPrimaryTagsSchema<T, R>, | "validate">
    & ObjectWithTransformMethod<R>;

export const getGenerateSelfClosingTagSchema = <
    T extends RequiredSchemaAttribute,
    R extends string,
>() => <
    SU extends RequiredSchemaAttribute,
    const V extends GenerateSelfClosingTagSchemaPrimaryConfig<T, R>,
    const W extends GenerateSelfClosingTagSchemaSecondaryConfig<SU, R>,
>
        (
            primaryConfig: V,
            secondaryConfig?: W
        ) => {




        const generatePrimarySchema = getGeneratePrimarySchema<T, R>();







        return generatePrimarySchema(
            {
                ...primaryConfig,
                selfClosing: true,
            },
            secondaryConfig ?? {
                transform(node, config, createTag) {

                    const { primary, ...rest } = node.transformAttributes(config)


                    return createTag(primaryConfig.render, [primary], rest)




                }

            });



    }


export const generateMarkdocErrorObject = (
    id: ValidationError['id'],
    level: ValidationError['level'],
    message: ValidationError['message'],
    location?: ValidationError['location']
) =>
    Object.freeze(
        location ? { id, level, message, location } : { id, level, message }
    ) satisfies ValidationError;

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

export const generateInvalidChildrenMarkdocErrorObject = (message: string) =>
    generateMarkdocErrorObject("invalid-children", "critical", message);


export const generateEmptyChildrenMarkdocErrorObject = (...tagNames: Array<string>) =>
    generateInvalidChildrenMarkdocErrorObject(
        `This tag requires children. 
        ${tagNames.length > 0 ? `Please add the following tagNames ${tagNames.join(",")} ` : ""}  
   `);


type GenerateNonPrimarySchemaConfigThatDoesNotAllowDataConfig<
    T extends RequiredSchemaAttribute,
    R extends string
> = GenerateNonPrimarySchemaConfig<T, R>
    & {
        attributes: SchemaAttributesWithNoPrimaryKey<T> & {
            data: {
                type: ObjectConstructor,
                required?: true
            },
        }
    };

type GenerateNonSecondarySchemaConfigThatDoesNotAllowTransformConfig<
    T extends RequiredSchemaAttribute,
    R extends string
> = Pick<GenerateNonPrimarySchemaSecondaryConfig<T, R>, "slots" | "validate">;


export const getGenerateNonPrimarySchemaWithATransformThatGeneratesDataAttributes =
    <
        T extends RequiredSchemaAttribute,
        R extends string,
    >() => {

        return <
            const V extends GenerateNonPrimarySchemaConfigThatDoesNotAllowDataConfig<T, R>,
            const W extends GenerateNonSecondarySchemaConfigThatDoesNotAllowTransformConfig<T, R>
        >(
            primaryConfig: V,
            secondaryConfig?: W
        ) => {

            const generateNonPrimarySchema = getGenerateNonPrimarySchema<T, R>();


            const transformAndValidate = {

                validate(node: Node, config: Config) {
                    const attrs = node.transformAttributes(config);

                    const validationErrorsFromConfig = secondaryConfig?.validate?.(node, config)


                    if (!('data' in attrs)) return validationErrorsFromConfig ?? [];

                    const keysWithNoNumberBooleanOrStringValues = Object.entries(
                        attrs['data']
                    ).reduce(
                        (carry: Array<string>, [key, value]) => !isViableMarkdocValue(value) ? carry.concat(key) : carry,
                        []
                    );



                    const internalValidationErrors = createAnArrayOfMarkdocErrorObjectsBasedOnEachConditionThatIsTrue(
                        [
                            keysWithNoNumberBooleanOrStringValues.length !== 0,
                            generateMarkdocErrorObjectThatHasAMessageThatTellsTheUserAValueIsNotRight(
                                `Data attribute values are only supposed to have strings numbers and booleans.
                              HTML can't parse those anything else.
                              Please fix the following keys ${keysWithNoNumberBooleanOrStringValues.join(',')}.
                              `
                            ),
                        ]
                    )


                    return Array.isArray(validationErrorsFromConfig)
                        ? internalValidationErrors.concat(validationErrorsFromConfig)
                        : internalValidationErrors

                },

                transform(node: Node, config: Config, createTag: CreateTagFunction<R>) {

                    const attributes = node.transformAttributes(config);

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
                        primaryConfig.render,
                        node.transformChildren(config), {
                        ...attributes,
                        ...newAttributes,
                    });
                },

            }





            return generateNonPrimarySchema(
                primaryConfig,
                mergeObjects(secondaryConfig ?? {}, transformAndValidate)
            )
        };
    };




export const getHeadingSchema = (strictHeadings: boolean) => {

    const headingLevels = [1, 2, 3, 4, 5, 6]

    const FIRST_LEVEL = 0;
    const STOP_LEVEL = 4;



    return {
        ...markdoc.nodes.heading,
        attributes: {
            ...markdoc.nodes.heading.attributes,
            level: {
                type: Number,
                required: true,
                matches: strictHeadings
                    ? headingLevels.slice(
                        FIRST_LEVEL,
                        STOP_LEVEL
                    ) : headingLevels
            },
        },


    }
}

export const getDocSchema = (doNotRenderArticle: boolean) => (
    {

        ...markdoc.nodes.document,
        render: doNotRenderArticle ? null : "article",

    }
)

