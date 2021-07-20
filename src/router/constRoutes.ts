import { RouteRecordRaw,NewRecordRaw } from "vue-router";
import Layout from '@/layout/index.vue'

export const constRoutes: Array<RouteRecordRaw&NewRecordRaw> = [
  {
    path: '/404',
    component: () => import('@/views/404.vue'),
  },


  // 404 page must be placed at the end !!!
  { path: '/:pathMatch(.*)*', redirect: '/404', hidden: true }
];