import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: () => import('./../views/Dashboard')
  },
  {
    path: '/news',
    name: 'news',
    component: () => import('./../views/News')
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('./../views/User')
  },
  {
    path: '/my-profile',
    name: 'my-profile',
    component: () => import('./../views/MyProfile')
  },
  {
    path: '/faq',
    name: 'faq',
    component: () => import('./../views/Faq')
  },
  {
    path: '/typefaq',
    name: 'typefaq',
    component: () => import('./../views/Typefaq')
  },
  {
    path: '/comment',
    name: 'comment',
    component: () => import('./../views/comment')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('./../views/Login')
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('./../views/Contact')
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
