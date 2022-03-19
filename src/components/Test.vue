<script lang="ts">
export default {
  inheritAttrs: false // 禁止组件上的属性传递到当前根节点上
}
</script>

<script setup lang='ts'>
import { uploadSingleFile, uploadBase64File } from '@/service/home';
import { ref } from 'vue';
// import { MESSAGE } from "@/common/inject-keys";
// import { inject, defineProps, defineEmits } from "vue"
// // props 
// defineProps<{ title: number, modelValue: string }>()
// // // 解构后的props是不具备响应式的 需要使用torefs包裹
// // const { title } = toRefs(props);
// // 定义emits
// /* const Emiter = */defineEmits<{
//   (e: 'changeTitle', id: number): void,
//   (e: 'update:modelValue', val: string): void,
// }>()
// // 逻辑
// // const changeTitle = () => {
// //   Emiter('changeTitle', 1)
// // }
// // 依赖注入
// const message = inject(MESSAGE)

let file = ref<HTMLInputElement | null>(null)
let base64file = ref<HTMLInputElement | null>(null)
// console.log(file.value)

function selectFile() {
  file.value?.click()
}

function fileChange() {
  let fd = new FormData
  // console.log(file.value?.files)
  fd.append('file', (file.value as any).files[0])
  fd.append('filename', (file.value as any).files[0].name)

  uploadSingleFile(fd).then(res => {
    console.log(res)
  })
}
function select2File() {
  base64file.value?.click()
}

function genBase64URL(target: File) {
  return new Promise(resolve => {
    let fileReader = new FileReader
    fileReader.readAsDataURL(target)
    fileReader.onload = ev => {
      resolve(ev.target?.result)
    }
  })
}

async function base64fileChange() {
  let curr_file = (base64file.value as any).files[0]
  let base64URL: any = await genBase64URL(curr_file)
  let data = await uploadBase64File({ file: encodeURIComponent(base64URL), name: curr_file.name })
  console.log(data)
}

</script>

<template>
  <div class="upload">
    <ul>
      <li>
        <p>单个文件上传</p>
        <el-button type="primary" @click="selectFile">formdata上传</el-button>
        <input @change="fileChange" type="file" style="display:none" ref="file" />
      </li>
      <li>
        <p>base64上传</p>
        <el-button type="warning" @click="select2File">base64上传</el-button>
        <input @change="base64fileChange" type="file" style="display:none" ref="base64file" />
      </li>
    </ul>
  </div>
</template>