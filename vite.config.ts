import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      // 设置 @ 为 src 目录的别名
      '@': path.resolve(__dirname, 'src')
    }
  },
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
});
