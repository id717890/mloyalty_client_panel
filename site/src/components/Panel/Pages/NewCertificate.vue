<template>
  <div class="d-flex flex-column h100">
    <div class="wrapper-alert" v-if="alert">
      <div class="black-alert">
        <v-icon>mdi-check</v-icon> Изменения сохранены
      </div>
    </div>
    <div class="pb flex-grow-1">
      <div class="row">
        <div class="col-12 pt-0">
          <div class="section">1. Выберите дизайн</div>
          <design-carousel
            :items="options.certificates"
            :current="this.form.certificate"
            class="design-carousel"
            @change-certificate="changeCertificate"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-12 pt-0">
          <div class="section">2. Номинал</div>
          <div class="d-flex flex-row flex-wrap">
            <par
              :readonly="false"
              @input="selectedPar = null"
              v-model="customPar"
              :active="customPar !== null"
            />
            <par
              @change-par="changePar"
              v-for="(par, index) in options.pars"
              :value="par"
              :key="index"
              :active="par == selectedPar"
            />
          </div>
        </div>
        <div class="col-12 pt-0">
          <div class="section">3. Поздравление</div>
          <MlTextarea
            :rows="3"
            v-model="form.congratulation"
            placeholder="Ваше поздравление (необязательно)"
          />

          <div class="d-flex flex-row align-center justify-content-between">
            <a href="#" @click.prevent="openPreview">
              <img src="~@/assets/img/eye.png" alt="" />
              <span class="ml-text-14-20-500 ml-2">Предпросмотр</span>
            </a>
            <a
              href="#"
              v-if="isUpdate"
              @click.prevent="removeCertificate"
              class="ml-text-14-20-500 ml-text-red"
              >Удалить из корзины</a
            >
          </div>
        </div>
        <div class="col-12" v-if="isUpdate && currentCerificate">
          <MlNumeric2
            ref="numeric"
            v-model="currentCerificate.count"
            @input="changeCount"
          />
        </div>
      </div>
    </div>
    <div class="controlls" v-if="!isUpdate">
      <button
        :disabled="isAllowContinue"
        @click.prevent="nextPage"
        class="ml-black-btn"
        style="width: 100%"
      >
        {{ titleNextBtn }}
      </button>
    </div>
    <div class="controlls" v-if="isUpdate">
      <button @click.prevent="save" class="ml-black-btn" style="width: 100%">
        Сохранить изменения
      </button>
    </div>
  </div>
</template>

<script>
import { SENDING_PAGE, PREVIEW_PAGE } from '@/helpers/const/widgetPage'
import designCarousel from '../DesignCarousel'
import par from '../Par'
import MlTextarea from '@/components/UI/MlTextarea'
import MlNumeric2 from '@/components/UI/MlNumeric2'
import MixinChangePanelPage from '@/helpers/mixins/panel/changePage'
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'
import certificateTypes from '@/store/certificate/types'
import basketTypes from '@/store/basket/types'
import { debounce } from 'lodash'
import { BASKET_PAGE, CONFIRMING_PAGE } from '../../../helpers/const/widgetPage'

export default {
  mixins: [MixinChangePanelPage],
  components: {
    designCarousel,
    par,
    MlTextarea,
    MlNumeric2
  },
  data: () => ({
    alert: false,
    selectedPar: null,
    customPar: null,
    form: {
      certificate: null,
      congratulation: null
    }
  }),
  watch: {
    currentCerificate(value) {
      if (!value) {
        this.changePanelPage(BASKET_PAGE)
      }
    }
  },
  computed: {
    ...mapState({
      options: state => state.certificate.options
    }),
    ...mapGetters([
      'verificationCode/isVerified',
      'basket/allPositions',
      'basket/currentCertificate'
    ]),
    isUpdate() {
      return this['basket/currentCertificate'] ? true : false
    },
    currentCerificate() {
      return this['basket/currentCertificate']
    },
    isAllowContinue() {
      const price = this.customPar ?? this.selectedPar
      return !this.form.certificate || !this.form.congratulation || !price
    },
    titleNextBtn() {
      const count = this['basket/allPositions']?.count
      return count ? 'Продолжить' : 'Добавить в корзину'
    }
  },
  created() {
    const DEBOUNCE_TIMEOUT = process.env.VUE_APP_DEBOUNCE_TIMEOUT ?? 2000
    this.debounced = {
      storeCertificate: debounce(this.storeCertificate, DEBOUNCE_TIMEOUT)
    }
  },
  mounted() {
    if (this.isUpdate) {
      this.loadCertificateFromStore()
    }
  },
  methods: {
    ...mapMutations('basket', [
      basketTypes.ADD_CERTIFICATE,
      basketTypes.UPDATE_CERTIFICATE
    ]),
    openPreview() {
      // this.$router.push('/preview')
      this.changePanelPage(PREVIEW_PAGE)
    },
    // ...mapMutations('certificate', [certificateTypes.STORE_CURRENT_CERIFICATE]),
    save() {
      let certificate = this.form
      certificate.price = this.customPar ?? this.selectedPar ?? null
      certificate.count = this.currentCerificate.count
      this[basketTypes.UPDATE_CERTIFICATE](certificate)
      this.alert = true
      setTimeout(() => {
        this.alert = false
      }, 3000)
    },
    changeCount() {
      this[basketTypes.UPDATE_CERTIFICATE](this['basket/currentCertificate'])
    },
    removeCertificate() {
      let certificate = this.currentCerificate
      certificate.count = 0
      this[basketTypes.UPDATE_CERTIFICATE](certificate)
    },
    loadCertificateFromStore() {
      this.form.congratulation = this.currentCerificate.congratulation
      this.form.certificate = this.currentCerificate.certificate
      const price = this.currentCerificate.price
      if (price) {
        if (this.options.pars.includes(price)) {
          this.selectedPar = price
        } else {
          this.customPar = price
        }
      }
    },
    changeCertificate(value) {
      this.form.certificate = value
    },
    storeCertificate() {
      let certificate = this.form
      certificate.price = this.customPar ?? this.selectedPar ?? null
      certificate.count = 1
      this[basketTypes.ADD_CERTIFICATE](certificate)
    },
    changePar(value) {
      this.selectedPar = value
      this.customPar = null
    },
    nextPage() {
      this.storeCertificate()
      if (this['verificationCode/isVerified']) {
        this.changePanelPage(CONFIRMING_PAGE)
      } else {
        this.changePanelPage(SENDING_PAGE)
      }
      // this[panelTypes.CURRENT_PAGE_SET](SENDING_PAGE)
    },
    beforeDestroy() {
      console.log(1234)
    }
  }
}
</script>
