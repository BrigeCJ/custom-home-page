import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/Site'
    },
    {
      path: '/login',
      name: 'Login',
      component: resolve => require(['../components/Login.vue'], resolve)
    },
    {
      path: '/',
      name: 'Home',
      component: resolve => require(['../components/Home.vue'], resolve),
      children: [
        {
          path: '/site',
          name: 'Site',
          component: resolve => require(['../components/modules/Site.vue'], resolve)
        },
        {
          path: '/searchEngine',
          name: 'SearchEngine',
          component: resolve => require(['../components/modules/SearchEngine.vue'], resolve)
        },
        {
          path: '/wallpapers',
          name: 'Wallpaper',
          component: resolve => require(['../components/Modules/Wallpaper.vue'], resolve)
        }
      ]
    }
  ]
})
