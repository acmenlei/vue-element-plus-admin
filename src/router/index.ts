import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"

/* 统一导入路由 */
const routeFiles = import.meta.globEager('./modules/*.ts')
const routeConfiguras: RouteRecordRaw[] = []

Object.keys(routeFiles).forEach(routeModule => {
  routeFiles[routeModule].default &&
    routeConfiguras.push(routeFiles[routeModule].default)
})

/* 默认路由 */
const defaultRouteConfiguras = [
  {
    path: '/',
    exact: true,
    redirect: '/home'
  },
  {
    path: '/login',
    name: '登录',
    component: () => import("@/views/login.vue")
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import("@/views/404.vue")
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes: routeConfiguras.concat(defaultRouteConfiguras)
})

export default router