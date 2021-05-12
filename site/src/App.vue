<template>
  <router-view />
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      isTest: state => state?.app?.testMode ?? true
    })
  },
  methods: {
    async setInitialize() {
      if (this.isTest) {
        console.log('TEST MODE')
        await this.loadLocalZoid()
      } else {
        this.initPanel()
      }
    },
    async loadLocalZoid() {
      return new Promise(resolve => {
        let zoid = document.createElement('script')
        let zoidComponent = document.createElement('script')
        zoid.async = false
        zoidComponent.async = false
        zoid.setAttribute('src', '/js/zoid.js')
        zoidComponent.setAttribute('src', '/js/zoid_component.js')
        document.head.appendChild(zoid)
        document.head.appendChild(zoidComponent)
        resolve()
      })
    },
    initPanel() {
      ;(function(w, i, d, g, e, t) {
        t = i.createElement(d)
        t.async = 1
        t.src = g
        t.onload = function() {
          if (document.readyState !== 'loading') {
            MloyaltyWidget.init(e)
          } else {
            document.addEventListener('DOMContentLoaded', function() {
              MloyaltyWidget.init(e)
            })
          }
        }
        i.head.insertBefore(t, i.head.firstElementChild)
      })(
        window,
        document,
        'script',
        'https://mloyalty-widget.s3-eu-west-1.amazonaws.com/0.4.1/mloyalty-widget.bundle.min.js',
        { code: '*', url: 'http://lkvidget.lctest.ru/' }
      )
    }
  },
  async mounted() {
    await this.setInitialize()
  }
}
</script>
