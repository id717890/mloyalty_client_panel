<template>
  <div>
    <h3 v-if="message" class="mb-4">{{ message }}</h3>
    <h4 v-if="subMessage" class="mb-4">{{ subMessage }}</h4>
  </div>
</template>

<script>
export default {
  layout: 'throw',
  computed: {
    message() {
      return this.$route.params?.message
    },
    subMessage() {
      return this.$route.params?.subMessage
    },
  },
  mounted() {
    console.log(this.$route)
  },
}
</script>
