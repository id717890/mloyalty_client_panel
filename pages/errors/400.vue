<template>
  <div>
    <h3>ERROR</h3>
    <div>{{ message }}</div>
  </div>
</template>

<script>
export default {
  layout: 'error',
  computed: {
    message() {
      return this.$route.params?.message
    },
  },
  mounted() {
    console.log(this.$route)
  },
}
</script>
