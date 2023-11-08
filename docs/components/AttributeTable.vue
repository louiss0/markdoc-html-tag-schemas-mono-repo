<script setup lang="ts">
type Attribute =  {
      attribute: string;
      type: {
        href: string;
        text: string;
      } | string ;
      required?: "true";
      errorLevel?:string;
      reference?:{
        href: string;
        text: string;
      };
      matches?: Array<string> | undefined;
    };

const {attributeList} = defineProps<{
  attributeList: Array<Attribute>;
}>();

const someValuesAreErrorLevels = attributeList
  .some(attribute => "errorLevel" in attribute )

const someValuesAreReferences = attributeList
  .some(attribute => "reference" in attribute )

</script>

<template>
  <table>
    <caption>
      Attributes
    </caption>

    <thead>
      <th>attribute</th>
      <th>type</th>
      <th>required</th>
      <th v-if="someValuesAreErrorLevels">error level</th>
      <th v-if="someValuesAreReferences">reference</th>
      <th>matches</th>
    </thead>

    <tbody>
      <template
        v-for="{ attribute, type, required='false',
          reference,
         errorLevel, matches } of attributeList"
        :key="attribute"
      >
        <tr>
          <td>{{ attribute }}</td>

          <template v-if="typeof type === 'string'">
            <td>{{ type }}</td>
          </template>

          <template v-else>
            <td>
              <a :href="type.href">
                {{ type.text }}
              </a>
            </td>
          </template>

          <td>{{ required }}</td>

          <td v-if="someValuesAreErrorLevels">
            
            {{ errorLevel }}
          
          </td>
          <td v-if="someValuesAreReferences">
            
            <a :href="reference?.href">

              {{ reference?.text }}
            </a>
          
          </td>

          <td>
            <template v-if="matches">
              <template v-for="match of matches">
                <div>{{ match }}</div>
              </template>
            </template>
          </td>
        </tr>
      </template>
    </tbody>
  </table>
</template>
