<template>
  <div class="ml-settings-field-wrapper">
    <div v-if="title" class="ml-text-14-16-700 mr-4">{{ title }}</div>
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      :nudge-right="40"
      transition="scale-transition"
      offset-y
      min-width="auto"
    >
      <template #activator="{ on }">
        <v-text-field
          v-model="formatedDate"
          v-bind="$attrs"
          class="ma-0 pa-0 ml-settings-field"
          readonly
          :placeholder="placeholder"
          v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker
        no-title
        :header-date-format="yearFormat"
        :weekday-format="days"
        :month-format="monthes"
        :value="value"
        :first-day-of-week="1"
        @input="changeDate"
      ></v-date-picker>
    </v-menu>
  </div>
</template>

<script>
import { format, parseISO } from 'date-fns'

const monthes = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
]
export default {
  name: 'MlInputDate',
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
    placeholder: {
      type: String,
      required: false,
      default: null,
    },
    value: {
      type: String,
      required: false,
      default: null,
    },
  },
  data: () => ({
    menu: false,
  }),
  computed: {
    formatedDate() {
      if (!this.value) return null
      const result = format(new Date(parseISO(this.value)), 'dd.MM.yyyy')
      return result
    },
  },
  methods: {
    monthes(item) {
      const now = new Date(item)
      const month = now.getMonth(item)
      return `${monthes[month]}`
    },
    days(item) {
      return this.$const?.DAY_OF_WEEK[new Date(item).getDay(item)]?.short
    },
    yearFormat(item) {
      const now = new Date(item)
      const year = now.getFullYear(item)
      const month = now.getMonth(item)
      return `${monthes[month]} ${year} `
    },
    changeDate(value) {
      this.menu = false
      this.$emit('input', value)
    },
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
