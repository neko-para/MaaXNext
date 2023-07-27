import { defineConfig } from 'vite'
import { resolve } from 'path'

// https://vitejs.dev/config
export default defineConfig({
  root: __dirname,
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'main',
      formats: ['cjs'],
      fileName: () => '[name].js'
    },
    outDir: '../../dist/main',
    emptyOutDir: true,
    rollupOptions: {
      external: ['electron']
    }
  }
})
