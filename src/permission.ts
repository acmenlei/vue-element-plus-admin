import router from "@/router";
import { USERNAME } from '@/store/modules/user';
import { getCookie } from "./common/cookie";

router.beforeEach((to, from, next) => {
  let username  = getCookie(USERNAME)
  if(to.path == '/home') {
    username != null ? next() : router.replace('/login');
  } else {
    if(to.path == '/login') {
      username != null ? next({...from}) : next();
    } else {
      next()
    }
  }
})

export default router;