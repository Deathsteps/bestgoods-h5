import Vue from 'vue'
import Router from 'vue-router'
import HomeView from '@/components/HomeView'
import ListView from '@/components/ListView'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomeView',
      component: HomeView
    },
    {
      path: '/list',
      name: 'ListView',
      component: ListView
    }
  ]
})
