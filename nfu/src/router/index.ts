import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeViews.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },

    { path: '/student', name: 'student', component: () => import('@/views/Student/studentHome.vue') },
    { path: '/teacher', name: 'teacher', component: () => import('@/views/Teacher/teacherHome.vue') },
    { path: '/admin', name: 'admin', component: () => import('@/views/admin/admin.vue') }
  ]
})

export default router