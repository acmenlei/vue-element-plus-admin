import { defineStore } from "pinia";
import piniaInstance from "@/store"
import { getCookie, removeCookie, setCookie } from "@/common/cookie"
import { TodoItem } from "@/components/todo/scripts";
import { successNotification } from "@/common/message";
import router from "@/router";

export const USERNAME = 'USERNAME'

interface User {
  username: string;
  password: string;
  tasks: Array<TodoItem>
}

export const users = defineStore('users', {
  state: () => ({ 
    users: [] as User[],
    username: getCookie(USERNAME) as (string | undefined)
   }),
   actions: {
     updateUsers(users: User[]) {
       this.users = users;
     },
     login(username: string, users: User[]) {
      setCookie(USERNAME, username)
      this.username = username;
      this.users = users;
     },
     logout() {
       removeCookie(USERNAME);
       this.username = '';
       successNotification('提示', '退出登陆成功！')
       router.replace('/login')
     }
   }
})

export const useUserStore = () => users(piniaInstance)