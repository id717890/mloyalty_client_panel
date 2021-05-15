<template>
  <div>
    <h3>ERROR</h3>
    <div v-if="message" class="mb-4">{{ message }}</div>
    <div v-if="subMessage">{{ subMessage }}</div>
  </div>
</template>

<script>
export default {
  layout: 'error',
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
