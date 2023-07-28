import fs from 'fs'

// koffi

const version = JSON.parse(fs.readFileSync('package-lock.json')).packages['node_modules/koffi'].version

function copy(name, to) {
  fs.mkdirSync(`${to}/${version}/${name}`, { recursive: true })
  fs.copyFileSync(`node_modules/koffi/build/${version}/${name}/koffi.node`, `${to}/${version}/${name}/koffi.node`)
}

const host = `${process.platform}_${process.arch}`
copy(host, 'dist/build')

const archs = ['x64', 'arm64']
const plats = ['win32', 'linux', 'darwin']
for (const a of archs) {
  for (const p of plats) {
    copy(`${p}_${a}`, 'koffi')
  }
}
