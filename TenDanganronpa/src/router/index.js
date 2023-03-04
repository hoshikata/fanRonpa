import { createRouter, createWebHashHistory } from 'vue-router';
import Index from '../views/Index.vue';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
    },
    {
      path: '/prediction',
      name: 'prediction',
      component: () => import('../views/Prediction.vue'),
    },
    // {
    //   path: '/',
    //   name: 'home',
    //   component: HomeView,
    // },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue'),
    // },
  ],
  scrollBehavior(to) {
    if (to.hash) {
      return { el: to.hash };
    }
  },
});

export default router;
