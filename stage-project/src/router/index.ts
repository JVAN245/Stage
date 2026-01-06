import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/:root/:page',
      name: 'Service',
      component: () => import('../components/pages.vue'),
      beforeEnter: (to) => {
        to.meta.root = to.params.root;
        to.meta.page = to.params.page;
      }
    },
  ],
})

export default router