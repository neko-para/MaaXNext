import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config
export default defineConfig({
  root: __dirname,
  server: {
    host: '127.0.0.1',
    port: 5173
  },
  build: {
    outDir: '../../dist/renderer',
    sourcemap: true
  },
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src')
    }
  },
  plugins: [vue()]
})
