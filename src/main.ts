import { createApp } from 'vue'
import ElementPlus from "element-plus"
import "element-plus/dist/index.css"

import pinia from "@/store"
import router from "@/permission"

import App from './App.vue'

createApp(App).use(pinia).use(router).use(ElementPlus).mount('#app')