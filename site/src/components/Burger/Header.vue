<template>
  <div class="mloyalty-panel-burger-header" :class="{ 'wo-border': !show }">
    <template v-if="show">
      <a
        href="#"
        class="ml-title-14-20 d-flex align-items-center ml-text-grey"
        @click.prevent="goHome"
      >
        <img src="@/assets/img/arrow-left.png" alt="" class="mr-2" />
        Назад
      </a>
      <div class="ml-text-16-24-600 flex-grow-1">{{ title }}</div>
    </template>
  </div>
</template>

<script>
import MixinChagePage from '@/helpers/mixins/burger/changePage'
import MixinHeader from '@/helpers/mixins/burger/header'
import { HOME_PAGE } from '@/helpers/const/widgetPage'

export default {
  name: 'Burger-Header',
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  mixins: [MixinChagePage, MixinHeader],
  methods: {
    goHome() {
      this.changePanelBurgerPage(HOME_PAGE)
    }
  }
}
</script>

<style></style>
