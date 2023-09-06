import { defineConfig } from 'vite'
import { builtinModules } from 'module'

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
      external: ['electron', ...builtinModules]
    },
    commonjsOptions: {
      ignoreDynamicRequires: true
    },
    sourcemap: true
  }
})
