<template>
  <div class="ml-settings-field-wrapper">
    <div v-if="title" class="ml-text-14-16-700 mr-4">{{ title }}</div>
    <v-text-field
      v-if="maskField && value"
      ref="maskedField"
      v-mask="maskField"
      v-bind="$attrs"
      :value="value"
      class="ma-0 pa-0 ml-settings-field"
      :placeholder="placeholder"
      @input="$emit('input', $event)"
    ></v-text-field>
    <v-text-field
      v-else
      v-bind="$attrs"
      :value="value"
      class="ma-0 pa-0 ml-settings-field"
      :placeholder="placeholder"
      @input="$emit('input', $event)"
    ></v-text-field>
  </div>
</template>

<script>
import { mask } from 'vue-the-mask'

export default {
  name: 'MlInputText',
  directives: { mask },
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
    maskField: {
      type: String,
      required: false,
      default: null,
    },
    placeholder: {
      type: String,
      required: false,
      default: null,
    },
    value: {
      type: [String, Number],
      required: false,
      default: null,
    },
  },
  mounted() {
    const el = this.$refs.maskedField
    if (el) {
      console.log('element', el.$el.focus())
    }
  },
}
</script>

<style lang="scss">
.ml-settings-field-wrapper {
  border-bottom: 1px solid #e6e6e6;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
}

.ml-settings-field {
  .v-input__control .v-input__slot:before,
  .v-input__control .v-input__slot:after {
    border: none !important;
  }
}

.ml-settings-field {
  input {
    font-style: normal;
    font-weight: bold;
    font-size: 17px;
    line-height: 22px;
    letter-spacing: -0.408px;
    color: #4d4d4d !important;
    caret-color: #4d4d4d;
    text-align: right;
  }

  .v-text-field__details {
    display: none;
  }

  .v-input__slot {
    margin-bottom: 0;
  }
}

.ml-settings-field.v-input--is-focused {
  .v-input__control .v-input__slot:before,
  .v-input__control .v-input__slot:after {
    border: none !important;
  }
}
</style>
