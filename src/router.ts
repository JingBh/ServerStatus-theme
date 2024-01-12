import { createRouter, createWebHashHistory } from 'vue-router'

import PageIndex from './pages/Index.vue'
import PageScript from './pages/Script.vue'

const routes = [
  {
    path: '/',
    component: PageIndex
  },
  {
    path: '/script',
    component: PageScript
  },
  {
    // fallback
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
