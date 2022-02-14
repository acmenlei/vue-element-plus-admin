<script setup lang="ts">
import { provide, ref } from 'vue';
import { MESSAGE } from "@/common/inject-keys"
// 规定注入的值的类型必须为string类型
const message = ref('我正在使用依赖注入')
provide(MESSAGE, message)

const changeMessage = () => {
  message.value += 1
  console.log(message.value)
}
</script>
<template>
  <router-view />
  <el-button @click="changeMessage">changeMessage</el-button>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
