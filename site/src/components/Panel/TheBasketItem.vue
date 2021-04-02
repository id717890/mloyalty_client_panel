<template>
  <div class="row">
    <div class="col-12">
      <div class="ml-basket-item">
        <div class="image">
          <v-img
            :aspect-ratio="16 / 11"
            class="ml-img-rounded"
            :src="require('@/assets/img/example/design1.png')"
          >
            <div class="ml-basket-price-label">{{ certificate.price }}₽</div>
          </v-img>
        </div>
        <div class="content">
          <div class="first ml-title-14-20 ml-text-grey1">
            {{ shortText(certificate.congratulation) }}
          </div>
          <div class="second">
            <MlNumeric
              ref="numeric"
              v-model="certificate.count"
              @input="change"
            >
            </MlNumeric>
          </div>
        </div>
        <div class="d-flex align-center">
          <a href="#" @click.prevent="edit">
            <img
              class="btn-go-detail"
              src="~@/assets/img/arrow-right.png"
              alt=""
            />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MlNumeric from '@/components/UI/MlNumeric'
import { mapMutations } from 'vuex'
import basketTypes from '@/store/basket/types'
import MixinChangePanelPage from '@/helpers/mixins/panel/changePage'
import { START_PAGE } from '@/helpers/const/widgetPage'

export default {
  name: 'TheBasketItem',
  props: {
    certificate: {
      type: Object,
      require: true
    },
    index: {
      type: Number,
      require: true
    }
  },
  components: {
    MlNumeric
  },
  mixins: [MixinChangePanelPage],
  methods: {
    ...mapMutations('basket', [
      basketTypes.UPDATE_CERTIFICATE,
      basketTypes.SET_CURRENT_CERTIFICATE
    ]),
    change() {
      this[basketTypes.UPDATE_CERTIFICATE](this.certificate)
    },
    edit() {
      this[basketTypes.SET_CURRENT_CERTIFICATE](this.index)
      this.changePanelPage(START_PAGE)
    },
    shortText(str) {
      if (str && str.length > 50) {
        return `${str.substring(0, 50)}...`
      }
      return str
    }
  }
}
</script>
