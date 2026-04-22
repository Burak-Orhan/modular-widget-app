import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import LiveViewer from '../views/LiveViewer.vue'

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/viewer',
    name: 'LiveViewer',
    component: LiveViewer
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router