<template>
  <div class="ml-settings-field-wrapper">
    <div v-if="title" class="ml-text-14-16-700 mr-4">{{ title }}</div>
    <v-select
      v-bind="$attrs"
      :value="value"
      :items="items"
      class="ma-0 pa-0 ml-settings-field"
      :placeholder="placeholder"
      return-object
      item-text="name"
      @input="$emit('input', $event)"
    ></v-select>
  </div>
</template>

<script>
export default {
  name: 'MlSelect',
  inheritAttrs: false,
  model: {
    prop: 'value',
    event: 'input',
  },
  props: {
    title: {
      type: String,
      required: false,
      default: null,
    },
    items: {
      type: Array,
      required: true,
    },
    placeholder: {
      type: String,
      required: false,
      default: null,
    },
    value: {
      type: [String, Object],
      required: false,
      default: null,
    },
  },
}
</script>

<style lang="scss">
.v-select__selection {
  font-family: Inter;
  font-style: normal;
  font-weight: bold;
  font-size: 17px;
  line-height: 22px;
  letter-spacing: -0.408px;
  color: #4d4d4d !important;
  caret-color: #4d4d4d;
  text-align: right;
}
.v-select__selections {
  flex-direction: row-reverse;
}
</style>
