import { defineStore } from "pinia";
import piniaInstance from "@/store"

interface User {
  username: string;
  password: string;
}

export const users = defineStore('users', {
  state: () => ({ users: [] as User[] })
})

export const useUserStore = () => users(piniaInstance)