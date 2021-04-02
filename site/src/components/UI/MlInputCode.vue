<template>
  <input
    v-bind="$attrs"
    class="form-control  ml-input-code"
    :class="{ invalid }"
    :value="value"
    @input="$emit('input', $event.target.value)"
    maxlength="1"
    v-mask="'#'"
  />
</template>

<script>
import { mask } from 'vue-the-mask'

export default {
  name: 'MlInputCode',
  inheritAttrs: false,
  model: {
    prop: 'value',
    event: 'input'
  },
  directives: { mask },
  props: {
    value: {
      type: null,
      required: true
    },
    invalid: {
      type: Boolean
    }
  },
  methods: {
    isNumber(evt) {
      console.log('isNumber')
      // return true
      evt = evt ? evt : window.event
      var charCode = evt.which ? evt.which : evt.keyCode
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46
      ) {
        evt.preventDefault()
      } else {
        return true
      }
    }
  }
}
</script>
