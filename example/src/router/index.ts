import { createRouter, createWebHashHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import Home from '@/views/home/home.vue';

const routes: RouteRecordRaw[] = [
  {
    name: 'Home',
    path: '/',
    component: Home
  },
  {
    name: 'TableMerge',
    path: '/table-merge',
    component: () => import('@/views/table-merge/table-merge.vue')
  }
];

export default createRouter({
  history: createWebHashHistory(),
  routes
});
