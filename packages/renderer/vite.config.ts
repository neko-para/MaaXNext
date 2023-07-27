import { defineConfig } from 'vite'

// https://vitejs.dev/config
export default defineConfig({
  root: __dirname,
  server: {
    host: '127.0.0.1',
    port: 5173
  },
  build: {
    outDir: '../../dist/renderer'
  }
})
