<script setup lang='ts'>
import { defineAsyncComponent, ref } from "vue"

// import Test from '@/components/Test.vue';
const Test = defineAsyncComponent(() => import('@/components/Test.vue'))
// 响应性语法糖
let title = $ref(10)
const changeTitle = (step: number) => {
  title += step
}
const searchText = ref('')

</script>
<template>
  <el-card shadow id="home">
    {{ searchText }}
    <Test class="coderlei" v-model="searchText" :title="title" @change-title="changeTitle" />
  </el-card>
</template>

<style lang='scss' scoped>
</style>