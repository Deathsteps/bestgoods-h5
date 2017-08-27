import Vue from 'vue'
import Router from 'vue-router'
import HomeView from '@/components/HomeView'
import ListView from '@/components/ListView'
import DetailView from '@/components/DetailView'
import CommentsView from '@/components/CommentsView'
import ShopcartView from '@/components/ShopcartView'
import OrderView from '@/components/OrderView'

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
    },
    {
      path: '/comments',
      name: 'CommentsView',
      component: CommentsView
    },
    {
      path: '/shopcart',
      name: 'ShopcartView',
      component: ShopcartView
    },
    {
      path: '/order',
      name: 'OrderView',
      component: OrderView
    }
  ]
})
