<template>
  <div>
    <MlHeaderPage title="Частые вопросы" />
    <div class="px-12 py-4">
      <MlLoading v-if="loading" class="mb-4" />
      <div
        v-for="(faq, index) in faqs"
        v-else
        :ref="'ml-faq-item-' + index"
        :key="index"
        class="ml-faq-item"
      >
        <div class="ml-faq-item_question" @click="toggleFaq(index)">
          {{ faq.question }}
          <img
            class="ml-faq-item_arrow-right"
            src="/image/faq-arrow-right.png"
          />
          <img class="ml-faq-item_arrow-down" src="/image/faq-arrow-down.png" />
        </div>
        <div
          :ref="'answer-' + index"
          v-linkified:options="{ className: 'ml-link' }"
          class="ml-faq-item_answer"
        >
          {{ faq.answer }}
        </div>
      </div>
      <div v-if="!loading" class="text2">
        Не нашли ответ на свой вопрос? <br />
        <a href="#" @click.prevent="goToSupport"><u>Свяжитесь с нами</u></a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import faqTypes from '@/store/faq/types'

export default {
  name: 'FAQPage',
  layout: 'dashboard',
  props: {
    isInit: {
      type: Boolean,
      require: false,
      default: false,
    },
    isOwner: {
      type: Boolean,
      require: false,
      default: false,
    },
  },
  data: () => ({
    loading: false,
  }),
  computed: {
    ...mapState({
      faqs: (state) => state?.faq?.faqs,
    }),
  },
  mounted() {
    this.setInitialize()
  },
  methods: {
    ...mapActions('faq', [faqTypes.GET_FAQS]),
    setInitialize() {
      if (this.isInit === false) {
        this.loading = true
        this[faqTypes.GET_FAQS]({
          isWidgetBurger: true,
          isWidgetPreview: false,
          isSertOwnerSite: false,
        })
          .finally(() => {
            this.loading = false
          })
          .catch((e) => {
            console.log('error', e)
          })
      }
    },
    goToSupport() {},
    toggleFaq(id) {
      const elFaq = this.$refs['ml-faq-item-' + id][0]
      elFaq.classList.toggle('active')
      const el = this.$refs['answer-' + id][0]
      if (el.style.maxHeight) {
        el.style.maxHeight = null
        el.style.paddingTop = '0px'
      } else {
        el.style.maxHeight = el.scrollHeight + 10 + 'px'
        el.style.paddingTop = '10px'
      }
    },
  },
}
</script>
