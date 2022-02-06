import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from "path"
// 使用CDN的方式按需导入
import importToCDN from 'vite-plugin-cdn-import'

export default defineConfig({
  base: "./",
  plugins: [
    vue(),
    importToCDN({
      modules: [
        {
          path: "https://unpkg.com/element-plus",
          css: "https://unpkg.com/element-plus/dist/index.css",
          name: "element-plus",
          var: "ElementPlus"
        }
      ],
    })
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, resolve("src"))
    }
  },
  server: {
    open: true
  },
  build: {
    minify: "terser",
    // 简洁配置选项
    terserOptions: {
      compress: {
        drop_console: true, // 生产环境删除console输出
        drop_debugger: true // 生产环境删除debugger调试
      }
    }
  },
})
