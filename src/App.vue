<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { queryUserListAction } from '@/service/home';
import logo from '@/assets/logo.png'
import Test from "@/components/Test.vue"

const counter = ref(0)

const increament = () => counter.value++
// Test request
onMounted(async () => {
  const data: any = await queryUserListAction()
  console.log(data)
})
// 给外界暴露increament使用
defineExpose({ increament })

</script>
<template>
  <Test/> 
  <el-card>
    <el-image :src="logo" alt="vue logo" />
    <h2>Integrated Element-Plus scaffolding</h2>
    <p>vite.config.ts Basic configuration integration: Alias, Elemnt-Plus, terserOptions...</p>
    <p>counter: {{ counter }}</p>
    <el-button type="primary" @click="increament">++</el-button>
  </el-card>
  <router-view/>
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
