export default {
  name: '首页',
  meta: {
    icon: 'iconfont-xxx',
  },
  path: '/home',
  component: () => import("@/views/home.vue"),
}