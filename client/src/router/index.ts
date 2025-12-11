import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Dashboard from '../views/Dashboard.vue'
import { useAuthStore } from '../stores/auth'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/login', component: Login },
    { 
      path: '/dashboard', 
      component: Dashboard,
      meta: { requiresAuth: true }
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const auth = useAuthStore()
  if (!auth.initialized) await auth.checkAuth()
  
  if (to.meta.requiresAuth && !auth.user) {
    next('/login')
  } else {
    next()
  }
})

export default router

