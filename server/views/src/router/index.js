import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
// import Site from '@/components/Modules/Site'
// import SearchEngine from '@/components/Modules/SearchEngine'
// import Wallpaper from '@/components/Modules/Wallpaper'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/site'
    },
    {
      path: '/',
      name: 'Home',
      component: Home,
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
