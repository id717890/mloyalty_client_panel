<template>
  <input
    v-if="any"
    v-bind="$attrs"
    :class="currentStyle"
    :value="value"
    maxlength="1"
    @input="$emit('input', $event.target.value)"
  />
  <input
    v-else
    v-mask="currentMask"
    v-bind="$attrs"
    :class="currentStyle"
    :value="value"
    maxlength="1"
    @input="$emit('input', $event.target.value)"
  />
</template>

<script>
import { mask } from 'vue-the-mask'

export default {
  name: 'MlInputCode',
  directives: { mask },
  inheritAttrs: false,
  model: {
    prop: 'value',
    event: 'input',
  },
  props: {
    istyle: {
      type: String,
      default: 'ml-input-code',
    },
    value: {
      type: null,
      required: true,
    },
    invalid: {
      type: Boolean,
    },
    type: {
      type: String,
      required: false,
      default: 'number',
    },
    any: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  computed: {
    currentStyle() {
      let result = `form-control ${this.istyle}`
      if (this.invalid) result += ' invalid'
      return result
    },
    currentMask() {
      if (this.type === 'text') {
        return ''
      }
      return '#'
    },
  },
}
</script>
