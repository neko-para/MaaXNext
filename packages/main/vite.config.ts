import { defineConfig } from 'vite'
import { builtinModules } from 'module'
import { resolve } from 'path'
import native from 'vite-plugin-native'

// https://vitejs.dev/config
export default defineConfig({
  plugins: [
    native({
      outDir: '../../dist/main',
      map(mapping) {
        if (mapping.id === 'koffi.node') {
          const m = /\/([^/]+)\/koffi.node$/.exec(mapping.native)
          if (m) {
            mapping.output = mapping.output.replace('koffi.node', `${m[1]}.node`)
            // mapping.id = `./${m[1]}.node`
            mapping.id = `./darwin_x64.node`
          }
        }
        return mapping
      },
      target: 'cjs'
    })
  ],
  root: __dirname,
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'main',
      formats: ['cjs'],
      fileName: () => '[name].js'
    },
    outDir: '../../dist/main',
    // emptyOutDir: true,
    rollupOptions: {
      external: ['electron', ...builtinModules]
    },
    commonjsOptions: {
      ignoreDynamicRequires: true
    },
    sourcemap: true
  }
})
