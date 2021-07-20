import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import store from '@/store'
import { constRoutes } from "./constRoutes";
import { asyncRoutes } from "./asyncRoutes";
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { ElMessage } from 'element-plus'
import getPageTitle from '@/utils/get-page-title'
import { getToken } from '@/utils/auth'

const whiteList:Array<string> = [] // 白名单
let removeRouters: Array<() => void> = [];//


const router = createRouter({
  history: createWebHashHistory(),
  scrollBehavior: () => ({ top: 0,left:0 }),
  routes:[...asyncRoutes,...constRoutes],
});
store.commit('user/SET_ROUTES',[...asyncRoutes,...constRoutes]) //不做权限，临时方案
 router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()
  document.title = getPageTitle(to.meta.title)
  next()
  // set page title

  /* // determine whether the user has logged in
  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
        next()
      } else {
        try {
          // get user info
          const { roles } = await store.dispatch('user/getInfo')
          // 获取权限路由
          const accessRoutes = filterAsyncRoutes(asyncRoutes,roles)

          removeRouters = accessRoutes.map(route=>router.addRoute(route))
          store.commit('user/SET_ROUTES',[...accessRoutes,...constRoutes])

          next({ ...to, replace: true })
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          ElMessage.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  } */
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})

// 过滤路由
function filterAsyncRoutes(asyncRoutes:Array<any>,roles:Array<string>) {
  const res:Array<any> = []
  asyncRoutes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}
// 验证权限
function hasPermission(roles:Array<string>, route:any) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}
export function resetRouter() {
  removeRouters.map(val=>val())
}
export default router;
