import { RouteRecordRaw,NewRecordRaw } from "vue-router";
import Layout from '@/layout/index.vue'

/*
hidden: true // (默认 false)
redirect: 'noRedirect'//当设置 noRedirect 的时候该路由在面包屑导航中不可被点击
alwaysShow: true//一直显示根路由
name: 'router-name' // 设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
meta: {
  roles: ['admin', 'editor'] // 设置该路由进入的权限，支持多个权限叠加
  title: 'title' // 设置该路由在侧边栏和面包屑中展示的名字
  icon: 'svg-name' // 设置该路由的图标，支持 svg-class，也支持 el-icon-x element-ui 的 icon
  breadcrumb: false //  如果设置为false，则不会在breadcrumb面包屑中显示(默认 true)
  activeMenu: '/article/list'// 当路由设置了该属性，则会高亮相对应的侧边栏。
} */
export const asyncRoutes: Array<RouteRecordRaw & NewRecordRaw> = [
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    meta:{title:'首页',icon:'el-icon-s-unfold'},
    children: [
      {
      path: '/home',
      name: 'home',
      component: () => import('@/views/Home/index.vue'),
      meta: { title: '首页', icon: 'el-icon-user' }
      }
    ]
  },
  {
    path: '/center',
    name:'center',
    component: Layout,
    redirect: '/center/index',
    meta: { title: '个人中心', icon: 'product'},
    children: [
      {
        path: '/center/index',
        name: 'center',
        component: () => import('@/views/Center/index.vue'),
        meta: { title: '个人中心', icon: 'product'}
      },
      {
        path: '/center/index2',
        name: 'center2',
        component: () => import('@/views/Center/index2.vue'),
        meta: { title: '个人中心2', icon: 'el-icon-user' },
        children: [
          {
            path: '/center/index3',
            name: 'center3',
            component: () => import('@/views/Center/index3.vue'),
            meta: { title: '个人中心3', icon: 'product'}
          },
          {
            path: '/center/index4',
            name: 'center4',
            component: () => import('@/views/Center/index4.vue'),
            meta: { title: '个人中心4', icon: 'el-icon-user'}
          }
        ]
      }
    ]
  },

];