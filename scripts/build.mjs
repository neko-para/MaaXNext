import { build } from 'vite'
import { existsSync, symlinkSync } from 'fs'

await build({ configFile: 'packages/main/vite.config.ts' })
await build({ configFile: 'packages/preload/vite.config.ts' })
await build({ configFile: 'packages/renderer/vite.config.ts' })

if (!existsSync('dist/main/koffi')) {
  symlinkSync('../../koffi', 'dist/main/koffi', 'dir')
}
