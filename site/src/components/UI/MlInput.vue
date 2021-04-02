<template>
  <div class="form-group " :class="{ 'is-invalid': invalid }">
    <label class="form-label">
      {{ label }}
      <span v-if="required" class="text-pink">*</span>
    </label>
    <input
      v-bind="$attrs"
      class="form-control"
      :type="type"
      :disabled="disabled"
      :value="value"
      @input="$emit('input', $event.target.value)"
    />
    <div class="form-invalid">
      <slot name="invalid" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'MlInput',
  inheritAttrs: false,
  props: {
    value: {
      type: null,
      required: true
    },
    label: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    required: {
      type: Boolean
    },
    disabled: {
      type: Boolean
    },
    invalid: {
      type: Boolean
    }
  }
}
</script>
