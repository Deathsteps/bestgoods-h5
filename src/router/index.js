import Vue from 'vue'
import Router from 'vue-router'
import HomeView from '@/components/HomeView'
import ListView from '@/components/ListView'
import DetailView from '@/components/DetailView'
import CommentsView from '@/components/CommentsView'
import ShopcartView from '@/components/ShopcartView'
import OrderView from '@/components/OrderView'
import PayView from '@/components/PayView'
import ProfileView from '@/components/ProfileView'
import SignView from '@/components/SignView'
import AddressView from '@/components/AddressView'
import AddressList from '@/components/Address/AddressList'
import AddressEdit from '@/components/Address/AddressEdit'
import auth from '@/store/auth'

Vue.use(Router)

const router = new Router({
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
      component: OrderView,
      meta: { requiresAuth: true }
    },
    {
      path: '/pay',
      name: 'PayView',
      component: PayView,
      meta: { requiresAuth: true }
    },
    {
      path: '/profile',
      name: 'ProfileView',
      component: ProfileView
    },
    {
      path: '/sign',
      name: 'SignView',
      component: SignView
    },
    {
      path: '/address',
      // name: 'AddressView',
      component: AddressView,
      meta: { requiresAuth: true },
      children: [
        { path: '', component: AddressList },
        { path: 'create', component: AddressEdit },
        { path: 'edit', component: AddressEdit }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!auth.isLogin()) {
      next({
        path: '/sign',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
})

export default router
