import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"

/* 统一导入路由 */
const routeFiles = import.meta.globEager('./modules/*')
const routeConfiguras: RouteRecordRaw[] = []

Object.keys(routeFiles).forEach(routeModule => {
  routeFiles[routeModule].default && 
  routeConfiguras.push(routeFiles[routeModule].default)
})

/* 默认路由 */
const defaultRouteConfiguras = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    name: '登录',
    path: '/login',
    component: () => import("@/views/login.vue")
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import("@/views/404.vue")
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes: routeConfiguras.concat(defaultRouteConfiguras)
})

export default router