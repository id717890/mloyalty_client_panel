<template>
  <div class="form-group">
    <label class="form-label">
      {{ label }}
      <span v-if="required" class="text-pink">*</span>
    </label>
    <textarea
      :placeholder="placeholder"
      :maxlength="maxlength"
      v-bind="$attrs"
      class="ml-textarea form-control"
      :value="value"
      :rows="rows"
      @input="$emit('input', $event.target.value)"
    >
    </textarea>
    <p class="text-right ml-textarea-length mb-0">{{ length }}</p>
  </div>
</template>

<script>
export default {
  name: 'MlTextarea',
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
    placeholder: {
      type: String,
      default: ''
    },
    rows: {
      type: Number,
      default: 5
    },
    required: {
      type: Boolean
    },
    maxlength: {
      type: Number,
      default: 360
    }
  },
  computed: {
    length() {
      const textLength = this.value ? this.value.length : 0
      return `${textLength}/${this.maxlength}`
    }
  }
}
</script>
