import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import {fetchToken} from '../functions'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/shopping-cart',
    name: 'Shopping-Cart',
    component: () => import('../views/Shopping-Cart.vue'),
    meta:{
      requiresAuth:true
    }
  },
  {
    path: '/check-out',
    name: 'Check-Out',
    component: () => import('../views/Check-Out.vue'),
    meta:{
      requiresAuth:true
    }
  },
  {
    path: '/Authentication',
    name: 'Authentication',
    component: () => import('../views/Authentication.vue'),
    beforeEnter(to,from,next){
      if(!!fetchToken()){
        alert('You Are Already Authenticated')
        next('/')
        return
      }
      next()
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/profile.vue')
  },
  {
    path:'/PageNotFound',
    name:'PageNotFound',
    component: () => import('../views/PageNotFound.vue')
  },
  {
    path:'*',
    redirect:'/PageNotFound'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to,from,next)=>{
  if(to.matched.some(route=>route.meta.requiresAuth)){
    if(!!fetchToken()){
      next()
    }else{
      alert('You Must Be Authenticated first then You Will Be Redirected Again')
      sessionStorage.setItem('fullPath',to.fullPath)
      next('/Authentication')
    }
    return
  }
  next()
})

export default router