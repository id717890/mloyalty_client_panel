<template>
  <div class="ml-numeric">
    <button @click.stop="decrement">
      <v-icon>mdi-minus</v-icon>
    </button>
    <!-- <div>{{ value }}</div> -->
    <input
      max="10"
      type="number"
      v-bind="$attrs"
      :value="value"
      @input="change"
    />
    <button @click.stop="increment">
      <v-icon>mdi-plus</v-icon>
    </button>
  </div>
</template>

<script>
const MIN_VALUE = 0

export default {
  name: 'MlNumeric',
  inheritAttrs: false,
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    value: {
      type: Number,
      default: 1
    }
  },
  methods: {
    change(v) {
      this.$emit('input', Number(v.target.value))
    },
    increment() {
      const n = this.value + 1
      this.$emit('input', n)
      this.$forceUpdate()
    },
    decrement() {
      if (this.value > MIN_VALUE) {
        let n = this.value - 1
        this.$emit('input', n)
        this.$forceUpdate()
      }
    }
  }
}
</script>
