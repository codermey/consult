import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

/** 组件自动引入 */
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'

/** svg图片打包成精灵图使用 */
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'

/** props结构保持响应式  */
import ReactivityTransform from '@vue-macros/reactivity-transform/vite'

/**  */
import { createHtmlPlugin } from 'vite-plugin-html'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [
    vue(),
    ReactivityTransform(),
    Components({
      dts: false,
      resolvers: [VantResolver()]
    }),
    createSvgIconsPlugin({
      // 指定图标文件夹，绝对路径（NODE代码）
      iconDirs: [path.resolve(__dirname, 'src/assets/icons')]
    }),
    createHtmlPlugin()
  ],
  server: {
    proxy: {
      '/api': {
        target: 'https://consult-api.itheima.net',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
      '/socket.io': {
        target: 'https://consult-api.itheima.net',
        changeOrigin: true
      }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
