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
    mergeObjects,
} from 'packages/markdoc-html-tag-schemas/src/utils/internal';

const createTag = <T extends string>(
    name: T | Omit<string, T>,
    children: Exclude<markdoc.Tag['children'], undefined>,
    attributes?: Record<string, unknown>
) => new markdoc.Tag(name as string, attributes, children);

type CreateTagFunction<T extends string> = typeof createTag<T>

type MarkdocTransform = Exclude<markdoc.Schema['transform'], undefined>;

type ObjectWithTransformMethod<T extends string> = {
    transform?(
        node: Parameters<MarkdocTransform>[0],
        config: Parameters<MarkdocTransform>[1],
        createTagFt: typeof createTag<T>
    ): ReturnType<MarkdocTransform>;
};


type GenericRenderProperty<T extends string> = { render: T }


type TagsSchema<
    T extends ProperSchemaMatches,
    U extends RequiredSchemaAttribute,
    R extends string,
    C extends markdoc.ConfigType = markdoc.ConfigType
> = Omit<markdoc.Schema<C, R>, 'attributes'> & {
    attributes: SchemaAttributesWithAPrimaryKey<T, U>;
} & GenericRenderProperty<R>;

export type FilledTagsSchema = TagsSchema<ProperSchemaMatches, RequiredSchemaAttribute, string>

type SelfClosing = {
    selfClosing: true;
    children?: never;
};

type NonSelfClosing = {
    selfClosing?: never;
    children: Array<string>;
};

type NonPrimaryTagsSchema<
    T extends ProperSchemaMatches,
    U extends RequiredSchemaAttribute,
    R extends string
> = Omit<TagsSchema<T, U, R>, 'attributes'> & {
    attributes: SchemaAttributesWithNoPrimaryKey<T, U>
};

export type FilledNonPrimaryTagsSchema = NonPrimaryTagsSchema<ProperSchemaMatches, RequiredSchemaAttribute, string>


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
    | "description" | "selfClosing" | "inline"
> & {
    type: MarkdocAttributeSchema<T, U>["type"]
} & GenericRenderProperty<R>


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
>() =>
    <
    SU extends RequiredSchemaAttribute,
    V extends GeneratePrimarySchemaPrimaryConfig<T, U, R>,
    W extends  CustomTransformConfig<T, SU, R>,
    >({ type, render, ...rest }: V,{ transform, attributes, ...rest2 }: W) => {



     const attributesThatWillBeMerged  =  {
        render,
        attributes: {
          ...attributes,
          primary: {
              type,
              render: true,
              required: true
          },
        },



    }


    const schemaBasedOnIfTransformExists = transform ? mergeObjects(
      attributesThatWillBeMerged,
      {...rest, ...rest2, transform: (node: markdoc.Node, config: markdoc.Config) =>
        transform(node, config, createTag)
      }
      ) : mergeObjects(attributesThatWillBeMerged,{...rest,...rest2})



      return  Object.freeze(schemaBasedOnIfTransformExists)


    }




type GenerateNonPrimarySchemaConfig<
    T extends ProperSchemaMatches,
    U extends RequiredSchemaAttribute,
    R extends string
> = (NonSelfClosing | SelfClosing)
    & Pick<NonPrimaryTagsSchema<T, U, R>, 'attributes' | 'description'>
    & GenericRenderProperty<R>;


type GenerateNonPrimarySchemaSecondaryConfig<
    T extends ProperSchemaMatches,
    U extends RequiredSchemaAttribute,
    R extends string
> = Pick<NonPrimaryTagsSchema<T, U, R>, 'slots' | 'validate'> &
    ObjectWithTransformMethod<R>;

export const getGenerateNonPrimarySchema = <
    T extends ProperSchemaMatches,
    U extends RequiredSchemaAttribute,
    R extends string,
   >() => <
    const V extends GenerateNonPrimarySchemaConfig<T, U, R>,
    const W extends GenerateNonPrimarySchemaSecondaryConfig<T, U, R>,
   >(
        primaryConfig: V,
        secondaryConfig: W
     ) => {

      const {transform }  = secondaryConfig

     const transformWithSecondaryConfig = Object.assign(
        {
          transform: (node: markdoc.Node, config: markdoc.Config) =>transform?.(node,config,createTag),
      }, secondaryConfig)



      return Object.freeze(mergeObjects(primaryConfig, transformWithSecondaryConfig))


      }



type GenerateSelfClosingTagSchemaPrimaryConfig<
    U extends RequiredSchemaAttribute,
    R extends string
> = Required<
    Pick<NonPrimaryTagsSchema<null, U, R>, 'description'| "render">
    & {
        type: U
    }
>;


type GenerateSelfClosingTagSchemaSecondaryConfig<
    T extends ProperSchemaMatches,
    U extends RequiredSchemaAttribute,
    R extends string
> =  Partial<Pick<NonPrimaryTagsSchema<T, U, R>, "attributes" | "inline" | "validate">>
    & ObjectWithTransformMethod<R>;

export const  getGenerateSelfClosingTagSchema = <
T extends RequiredSchemaAttribute,
R extends string,
>() => <
SU extends RequiredSchemaAttribute,
U extends ProperSchemaMatches,
const V extends  GenerateSelfClosingTagSchemaPrimaryConfig<T, R>,
const W extends GenerateSelfClosingTagSchemaSecondaryConfig<U,SU,R>,
>
(primaryConfig:V,
  secondaryConfig: W
) =>{

      const { render, type, description, } = primaryConfig;


      const {
        inline = true,
        attributes = {},
        validate,
        transform = (node, config, createTag) => {

          const { primary, ...rest } = node.transformAttributes(config)

          return createTag(render, [primary], rest)

        }
      } = secondaryConfig


      const generatePrimarySchema = getGeneratePrimarySchema<U,T,R>();


      return generatePrimarySchema(
        {
          render,
          type,
          description,
          selfClosing: true,
          inline,
        },
        {
          attributes,
          transform: (node, config)=>transform(node, config, createTag),
          validate
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
> = GenerateNonPrimarySchemaConfig<T, U, R>
    & {
        attributes: { data?: never }
        & Partial<SchemaAttributesWithNoPrimaryKey<T, U>
        >;
    };

type GenerateNonSecondarySchemaConfigThatDoesNotAllowTransformConfig<
    T extends ProperSchemaMatches,
    U extends RequiredSchemaAttribute,
    R extends string
> = Omit<GenerateNonPrimarySchemaSecondaryConfig<T, U, R>, 'transform' | 'validate'>;

export const getGenerateNonPrimarySchemaWithATransformThatGeneratesDataAttributes =
    <
        T extends ProperSchemaMatches,
        U extends RequiredSchemaAttribute,
        R extends string,
    >() => {

      return <
      const V extends GenerateNonPrimarySchemaConfigThatDoesNotAllowDataConfig<T, U, R>,
      const W extends  GenerateNonSecondarySchemaConfigThatDoesNotAllowTransformConfig<T,U,R>
      >(
        primaryConfig: V,
        secondaryConfig:W
        ) => {
              const { attributes, render } = primaryConfig;

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
                    { ...primaryConfig,
                    ...objectWithRenderPropertyDataAttributeFilledInAndOtherAttributesSpreadIn
}

            const generateNonPrimarySchema = getGenerateNonPrimarySchema<T,U,R>();


            const transformAndValidate = {

              validate(node:markdoc.Node, config: markdoc.Config) {
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

              transform<T extends string>(node:markdoc.Node, config:markdoc.Config, createTag:CreateTagFunction<T>) {

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
                      render,
                      node.transformChildren(config), {
                      ...attributes,
                      ...newAttributes,
                  });
              },

          }
            return generateNonPrimarySchema(
              primaryConfigWithDataAttributeInserted,
              {...secondaryConfig, ...transformAndValidate}
            );
        };
    };

//! Im doing this to avoid having to import everything again.
export const getNodes = () => markdoc.nodes
