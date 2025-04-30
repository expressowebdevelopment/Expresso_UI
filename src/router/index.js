/* eslint-disable */
import { createRouter, createWebHashHistory } from 'vue-router';
import { $global } from '@/main';
import services from '@/services/service';
const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: () => import(/* webpackChunkName: "HomePage" */ '../views/layouts/HomePage.vue')
  },
  {
    path: '/CommonErrorPage',
    name: 'CommonErrorPage',
    component: () => import(/* webpackChunkName : "CommonErrorPage" */ '../components/CommonErrorPage.vue')
  },
  {
    path: '/ServerDown',
    name: 'ServerDown',
    component: () => import(/* webpackChunkName : "ServerDown" */ '../components/ServerDown.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
})

router.beforeEach(async (to, from, next) => {
  next()
});
export default router
