<template>
  <div class="ml-numeric2">
    <span>В корзине {{ value }} шт.</span>
    <div>
      <button @click.stop="decrement" class="mr-3">
        <v-icon>mdi-minus</v-icon>
      </button>
      <button @click.stop="increment">
        <v-icon>mdi-plus</v-icon>
      </button>
    </div>
  </div>
</template>

<script>
const MIN_VALUE = 0

export default {
  name: 'MlNumeric2',
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
