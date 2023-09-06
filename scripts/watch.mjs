import { spawn } from 'child_process'
import { createServer, build } from 'vite'
import electron from 'electron'
import { existsSync, symlinkSync } from 'fs'

let quitTimer = null

function startQuit() {
  quitTimer = setTimeout(() => {
    process.exit(0)
  }, 1000)
}

function stopQuit() {
  if (quitTimer) {
    clearTimeout(quitTimer)
    quitTimer = null
  }
}

/**
 * @type {(server: import('vite').ViteDevServer) => Promise<import('rollup').RollupWatcher>}
 */
function watchMain(server) {
  /**
   * @type {import('child_process').ChildProcessWithoutNullStreams | null}
   */
  let electronProcess = null

  const address = server.httpServer.address()
  const env = Object.assign(process.env, {
    VITE_DEV_SERVER_HOST: address.address,
    VITE_DEV_SERVER_PORT: address.port
  })
  return build({
    configFile: 'packages/main/vite.config.ts',
    mode: 'development',
    plugins: [
      {
        name: 'electron-main-watcher',
        writeBundle() {
          stopQuit()

          if (electronProcess) {
            electronProcess.kill()
          }

          if (!existsSync('dist/main/koffi')) {
            symlinkSync('../../koffi', 'dist/main/koffi', 'dir')
          }

          electronProcess = spawn(electron, ['.', '--inspect'], {
            stdio: 'inherit',
            env
          })

          electronProcess.on('exit', () => {
            startQuit()
          })
        }
      }
    ],
    build: {
      watch: true
    }
  })
}

/**
 * @type {(server: import('vite').ViteDevServer) => Promise<import('rollup').RollupWatcher>}
 */
function watchPreload(server) {
  return build({
    configFile: 'packages/preload/vite.config.ts',
    mode: 'development',
    plugins: [
      {
        name: 'electron-preload-watcher',
        writeBundle() {
          server.ws.send({ type: 'full-reload' })
        }
      }
    ],
    build: {
      watch: true
    }
  })
}

// bootstrap
const server = await createServer({
  configFile: 'packages/renderer/vite.config.ts'
})

await server.listen()
await watchPreload(server)
await watchMain(server)
