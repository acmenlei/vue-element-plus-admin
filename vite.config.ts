import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from "path"
import importToCDN from 'vite-plugin-cdn-import'// 使用CDN的方式按需导入
import fs from "fs"

const TRUE = 'true' // 常量

export default ({ mode, command }) => {
  const ENV = loadEnv(mode, process.cwd()) // 加载指定模式(dev || prod)的环境变量
  // 读取全局scss文件
  const scssResources = []
  fs.readdirSync(`src/assets/scss`).map(file => {
    if (fs.statSync(`src/assets/scss/${file}`).isFile()) {
      scssResources.push(`@import "src/assets/scss/${file}";`)
    }
  })
  // vite配置
  return defineConfig({
    base: "./",
    plugins: [
      vue({
        reactivityTransform: true // 启用响应式语法糖
      }),
      importToCDN({
        modules: [
          {
            path: "https://unpkg.com/element-plus",
            // css: "https://unpkg.com/element-plus/dist/index.css",
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
      open: true,
      proxy: {
        '/proxy': {
          target: ENV.VITE_BASE_URL,
          changeOrigin: command === 'serve' && ENV.VITE_OPEN_PROXY == TRUE, // 是否需要跨域,
          rewrite: (path) => path.replace(/\/proxy/, '')
        }
      }
    },
    build: {
      outDir: mode === 'production' ? 'dist' : `dist-${mode}`,
      sourcemap: ENV.VITE_BUILD_SOURCEMAP == TRUE,
      minify: "terser",
      // 简洁配置选项
      terserOptions: {
        compress: {
          drop_console: ENV.VITE_BUILD_DROP_CONSOLE == TRUE, // 生产环境删除console输出
          drop_debugger: ENV.VITE_BUILD_DROP_DEBUGGER == TRUE, // 生产环境删除debugger调试
        }
      }
    },
    css: {
      // 预加载样式文件
      preprocessorOptions: {
        scss: {
          additionalData: scssResources.join("")
        }
      }
    }
  })
}
