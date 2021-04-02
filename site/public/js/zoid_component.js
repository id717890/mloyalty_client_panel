window.MloyaltyWidget = zoid.create({
  // The html tag used to render my component

  tag: 'mloyalty-side-panel-widget-content',

  // The url that will be loaded in the iframe or popup, when someone includes my component on their page

  url: ({ props }) => props.url || 'http://localhost:3000/',
  // url: ({ props }) => props.url || 'https://vidget.lctest.ru/',
  // url: 'http://localhost:8081/',
  // url: 'https://vidget.lctest.ru/',

  dimensions: {
    height: '100%',
    width: '100%'
  },

  props: {
    code: {
      type: 'string',
      required: true
    },
    url: {
      type: 'string',
      required: false
    },
    // isMobile: {
    //   type: 'boolean',
    //   required: false
    // },
    onHide: {
      type: 'function',
      required: true
    }
  }
})
