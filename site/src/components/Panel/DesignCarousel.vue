<template>
  <v-carousel
    @change="$emit('change-certificate', items[$event])"
    height="210"
    hide-delimiter-background
    show-arrows-on-hover
    class="mb-0"
  >
    <v-carousel-item v-for="(item, i) in itemsData" :key="i">
      <v-img
        height="210"
        :aspect-ratio="16 / 9"
        class="ml-img-rounded"
        :src="require('@/assets/img/example/design1.png')"
      ></v-img>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true
    },
    current: {
      type: Object,
      default: null
    }
  },
  computed: {
    itemsData() {
      if (!this.current) return this.items
      return [
        this.current,
        ...this.items.filter(item => item.id !== this.current.id)
      ]
    }
  }
}
</script>
