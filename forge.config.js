module.exports = {
  packagerConfig: {
    extraResource: ['./koffi']
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-zip'
    }
  ],
  plugins: [
    {
      name: '@electron-forge/plugin-vite',
      config: {
        // `build` can specify multiple entry builds, which can be Main process, Preload scripts, Worker process, etc.
        // If you are familiar with Vite configuration, it will look really familiar.
        build: [
          {
            entry: 'packages/main/src/index.js',
            config: 'packages/main/vite.config.ts'
          },
          {
            entry: 'packages/preload/src/index.js',
            config: 'packages/preload/vite.config.ts'
          }
        ],
        renderer: [
          {
            name: 'main_window',
            config: 'packages/renderer/vite.config.ts'
          }
        ]
      }
    }
  ]
}
