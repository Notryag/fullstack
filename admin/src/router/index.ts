import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Main from '../views/Main.vue'
Vue.use(VueRouter)

const routes: RouteConfig[] = [
  {
    path: '/',
    component: Main,
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/views/Home.vue')
      },
      {
        name: 'courses-crud',
        path: '/:resource/list',
        component: () => import('@/views/ResourceCrud.vue'),
        props: true
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
