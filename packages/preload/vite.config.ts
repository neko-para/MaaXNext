import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config
export default defineConfig({
  root: __dirname,
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'preload',
      formats: ['cjs'],
      fileName: () => '[name].js'
    },
    outDir: '../../dist/preload',
    emptyOutDir: true,
    rollupOptions: {
      external: ['electron']
    },
    sourcemap: true
  },
  plugins: [vue()]
})
