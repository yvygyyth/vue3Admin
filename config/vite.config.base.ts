import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
export default defineConfig({
  plugins: [
    vue(), 
    vueJsx({
      transformOn: true
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('../src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/assets/style/mixins.scss" as *;`,
      }
    },
  },
  base: '/'
})
