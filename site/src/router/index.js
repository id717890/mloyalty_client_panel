// import Home from '../views/Home.vue'
import MainPage from '../views/MainPage.vue'
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    // name: 'Home',
    component: MainPage,
    // components: {
    //   default: MainPage,
    //   main: Home
    // },
    children: [
      {
        path: '',
        name: 'Template',
        components: {
          main: () =>
            import(/* webpackChunkName: "about" */ '../views/Home.vue')
        },
        meta: {
          title: 'Функциональные виджеты'
        }
      }
      // {
      //   path: 'orders',
      //   name: 'Orders',
      //   components: {
      //     main: () =>
      //       import(/* webpackChunkName: "about" */ '../views/Order.vue')
      //   },
      //   meta: {
      //     title: 'MLoyalty - Заказы'
      //   }
      // },
      // {
      //   path: 'contact',
      //   name: 'Contact',
      //   components: {
      //     main: () =>
      //       import(/* webpackChunkName: "about" */ '../views/Contact.vue')
      //   },
      //   meta: {
      //     title: 'MLoyalty - Контакты'
      //   }
      // }
      // {
      //   path: 'preview',
      //   name: 'Preview',
      //   components: {
      //     main: () => import('../views/Preview.vue')
      //   },
      //   meta: {
      //     title: 'MLoyalty - Просмотр сертификата'
      //   }
      // }
    ]
  }
  // {
  //   path: '/example',
  //   name: 'Example',
  //   component: Template,
  //   meta: {
  //     title: 'MLoyalty - Пример страницы'
  //   }
  // },
  // {
  //   path: '/preview',
  //   name: 'Preview',
  //   component: () => import('../views/Preview.vue'),
  //   meta: {
  //     title: 'Получение подарочного сертификата'
  //   }
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  // This goes through the matched routes from last to first, finding the closest route with a title.
  // eg. if we have /some/deep/nested/route and /some, /deep, and /nested have titles, nested's will be chosen.
  const nearestWithTitle = to.matched
    .slice()
    .reverse()
    .find(r => r.meta && r.meta.title)
  if (nearestWithTitle) document.title = nearestWithTitle.meta.title
  next()
})

export default router
