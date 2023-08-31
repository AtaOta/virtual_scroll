import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  // base: '/virtual_scroll/',  // COMMENT-OUT DURING DEVELOPMENT
  plugins: [vue()],
  // resolve: { // COMMENT-OUT DURING DEVELOPMENT
  //   alias: {
  //     '@': fileURLToPath(new URL('./src', import.meta.url))
  //   }
  // }
})
