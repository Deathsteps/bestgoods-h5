import Vue from 'vue'
import Router from 'vue-router'
import HomeView from '@/components/HomeView'
import ListView from '@/components/ListView'
import DetailView from '@/components/DetailView'

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
    },
    {
      path: '/detail/:id',
      name: 'DetailView',
      component: DetailView
    }
  ]
})
