<script setup lang='ts'>
import { useHomeStore } from '@/store/modules/home'

const homeStore = useHomeStore()

const update = () => {
  homeStore.updateName()
}
</script>

<template>
  <div id="home">
    <p>{{ homeStore.name }}</p>
    <el-button type="danger" @click="update">update</el-button>
  </div>
</template>

<style lang='scss' scoped>
</style>