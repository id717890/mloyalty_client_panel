<template>
  <router-view />
</template>

<script>
export default {
  methods: {
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
  mounted() {
    this.initPanel()
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
