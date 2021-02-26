// window.MloyaltyWidget = zoid.create({
//   // The html tag used to render my component

//   tag: 'mloyalty-side-panel-widget-content',

//   // The url that will be loaded in the iframe or popup, when someone includes my component on their page

//   url: ({ props }) => props.url || 'http://localhost:8081/',
//   // url: ({ props }) => props.url || 'https://vidget.lctest.ru/',
//   // url: 'http://localhost:8081/',
//   // url: 'https://vidget.lctest.ru/',

//   dimensions: {
//     width: '100%',
//     height: '100%'
//   },

//   props: {
//     code: {
//       type: 'string',
//       required: true
//     },
//     url: {
//       type: 'string',
//       required: false
//     }
//     // isMobile: {
//     //   type: 'boolean',
//     //   required: false
//     // },
//     // onHideClose: {
//     //   type: 'function',
//     //   required: true
//     // }
//   }
// })

// start component
// eslint-disable-next-line
const widget = zoid.create({
  tag: 'mloyalty-side-panel-widget-content',
  // url: ({ props }) => props.url || 'https://vidget.lctest.ru/',
  url: ({ props }) => props.url || 'http://localhost:3000/',
  dimensions: {
    width: '100%',
    height: '100%',
  },

  props: {
    code: {
      type: 'string',
      required: true,
    },
    url: {
      type: 'string',
      required: false,
    },
    onHide: {
      type: 'function',
      required: true,
    },
  },
})
// end component
