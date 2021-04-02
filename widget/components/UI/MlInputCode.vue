<template>
  <input
    v-if="any"
    v-bind="$attrs"
    class="form-control ml-input-code"
    :class="{ invalid }"
    :value="value"
    maxlength="1"
    @input="$emit('input', $event.target.value)"
  />
  <input
    v-else
    v-mask="currentMask"
    v-bind="$attrs"
    class="form-control ml-input-code"
    :class="{ invalid }"
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
    currentMask() {
      if (this.type === 'text') {
        return ''
      }
      return '#'
    },
  },
}
</script>
