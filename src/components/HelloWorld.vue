<script setup lang='ts'>
import logo from '@/assets/logo.png'
import { ref, onMounted } from 'vue';
import { queryUserListAction } from '@/service/home';

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
  <el-card shadow="none">
    <el-image :src="logo" alt="vue logo" />
    <h2>Integrated Element-Plus scaffolding</h2>
    <p>vite.config.ts Basic configuration integration: Alias, Elemnt-Plus, terserOptions...</p>
    <p>counter: {{ counter }}</p>
    <el-button type="primary" @click="increament">++</el-button>
  </el-card>
</template>

<style lang='scss' scoped>

</style>