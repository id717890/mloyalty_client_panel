<template>
  <router-view />
</template>

<script>
import { mapState } from 'vuex'
// import config from '@/config'
export default {
  data: () => ({
    panelCfg: {
      code: '*',
      url: 'http://lkvidget.lctest.ru/',
      debug: true,
      metadata: { client_mloyalty: 2, client_ishop: 1234 }
      // sourceurl: 'http://lk.lctest.ru/'
    }
  }),
  computed: {
    ...mapState({
      isTest: state => state?.app?.testMode ?? true
    })
  },
  methods: {
    async setInitialize() {
      await fetch(process.env.BASE_URL + 'config.json').then(response => {
        response.json().then(async x => {
          this.panelCfg = x
          // this.$set(this, 'panelCfg', x)
          console.log('JSON CFG', x)
          if (this.isTest) {
            console.log('TEST MODE')
            await this.loadLocalZoid()
            await this.loadLocalZoidComponent()
          } else {
            this.initPanel()
          }
        })
      })
    },
    async loadLocalZoidComponent() {
      return new Promise(resolve => {
        // let zoid = document.createElement('script')
        let zoidComponent = document.createElement('script')
        // zoid.async = false
        zoidComponent.async = false
        // zoid.setAttribute('src', '/js/zoid.js')
        zoidComponent.setAttribute('src', '/js/zoid_component.js')
        // document.head.appendChild(zoid)
        document.head.appendChild(zoidComponent)
        resolve()
      })
    },
    async loadLocalZoid() {
      return new Promise(resolve => {
        let zoid = document.createElement('script')
        // let zoidComponent = document.createElement('script')
        zoid.async = false
        // zoidComponent.async = false
        zoid.setAttribute('src', '/js/zoid.js')
        // zoidComponent.setAttribute('src', '/js/zoid_component.js')
        document.head.appendChild(zoid)
        // document.head.appendChild(zoidComponent)
        resolve()
      })
    },
    initPanel() {
      // console.log('panel')
      const panel = this.panelCfg
      console.log('panel', panel)
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
        'https://mloyalty-widget.s3-eu-west-1.amazonaws.com/0.6.0/mloyalty-widget.bundle.min.js',
        // {
        //   // code: '*',
        //   // url: 'http://lkvidget.lctest.ru/',
        //   // debug: true,
        //   // metadata: { client_mloyalty: 2, client_ishop: 1234 },
        //   // sourceurl: 'http://lk.lctest.ru/'
        //   // ...config
        //   ...this.panelCfg
        // }
        panel
      )
    }
  },
  async mounted() {
    await this.setInitialize()
  }
}
</script>
