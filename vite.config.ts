import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 3000,
    // 代理解决跨域问题
    proxy: {
      '/api': {
        target: 'http://localhost:9527',
        changeOrigin: true,
        // rewrite: (path: string) => path.replace(/^\/api/, '')
      }
    }
  }
})
