<script lang="ts">
export default {
  inheritAttrs: false // 禁止组件上的属性传递到当前根节点上
}
</script>

<script setup lang='ts'>
import { MESSAGE } from "@/common/inject-keys";
import { inject, defineProps, defineEmits } from "vue"
// props 
defineProps<{ title: number, modelValue: string }>()
// // 解构后的props是不具备响应式的 需要使用torefs包裹
// const { title } = toRefs(props);
// 定义emits
/* const Emiter = */defineEmits<{
  (e: 'changeTitle', id: number): void,
  (e: 'update:modelValue', val: string): void,
}>()
// 逻辑
// const changeTitle = () => {
//   Emiter('changeTitle', 1)
// }
// 依赖注入
const message = inject(MESSAGE)
</script>

<template>
  <div id="test">
    透穿：{{ $attrs }}
    <br />
    <input
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
    <p>{{ message }}</p>
    <!-- <br />
    <p>{{ title }}</p>
    <el-button type="primary" @click="changeTitle">改变Title</el-button>-->
  </div>
</template>

<style lang='scss' scoped>
</style>