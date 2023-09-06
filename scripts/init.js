const { cpSync } = require('fs')

cpSync('node_modules/koffi/build/koffi', 'koffi', { recursive: true })
