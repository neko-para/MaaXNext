import { defineConfig } from 'vite'
import { resolve } from 'path'

// https://vitejs.dev/config
export default defineConfig({
  root: __dirname,
  build: {
    lib: {
      entry: 'src/index.js',
      name: 'preload',
      formats: ['cjs'],
      fileName: () => '[name].js'
    },
    outDir: '../../dist/preload',
    emptyOutDir: true,
    rollupOptions: {
      external: ['electron']
    }
  }
})
