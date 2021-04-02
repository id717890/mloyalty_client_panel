<template>
  <div class="form-group">
    <div class="row">
      <div class="col-12" v-if="label">
        <p class="text1">{{ label }}</p>
      </div>
      <div class="col-12 d-flex align-center">
        <MlInputCode
          ref="code1"
          v-model="number1OfCode"
          class="mr-2"
          @input="proccessNumber1"
        />
        <MlInputCode
          ref="code2"
          v-model="number2OfCode"
          @input="proccessNumber2"
          class="mr-2"
        />
        <MlInputCode
          ref="code3"
          v-model="number3OfCode"
          @input="proccessNumber3"
          class="mr-2"
        />
        <MlInputCode
          ref="code4"
          v-model="number4OfCode"
          @input="proccessNumber4"
          class="mr-2"
        />
      </div>
    </div>
  </div>
</template>

<script>
import MlInputCode from '@/components/UI/MlInputCode'
export default {
  components: {
    MlInputCode
  },
  props: {
    label: {
      type: String,
      default: null
    }
  },
  data: () => ({
    number1OfCode: null,
    number2OfCode: null,
    number3OfCode: null,
    number4OfCode: null
  }),
  methods: {
    change() {
      let code = parseInt(
        `${this.number1OfCode}${this.number2OfCode}${this.number3OfCode}${this.number4OfCode}`
      )
      if (!Number.isInteger(code)) {
        code = null
      }
      this.$emit('change', code)
    },
    proccessNumber1() {
      if (this.number1OfCode) {
        this.$refs.code2.$el.focus()
      }
      this.change()
    },
    proccessNumber2() {
      if (this.number2OfCode) {
        this.$refs.code3.$el.focus()
      }
      this.change()
    },
    proccessNumber3() {
      if (this.number3OfCode) {
        this.$refs.code4.$el.focus()
      }
      this.change()
    },
    proccessNumber4() {
      if (this.number4OfCode) {
        this.$refs.code4.$el.blur()
      }
      this.change()
    }
  }
}
</script>
