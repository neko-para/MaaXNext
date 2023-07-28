import { app, BrowserWindow } from 'electron'
import * as path from 'path'
import sms from 'source-map-support'

import { MaaFrameworkLoader } from '@maax/loader'
import { logger } from '@maax/logger'

import useDebug from './misc/debug'
import { initLogger } from './misc/logger'

sms.install()

initLogger()

const mfl = new MaaFrameworkLoader()
mfl.load('./maa/bin')

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600
    // webPreferences: {
    //   preload: path.join(__dirname, 'preload.js')
    // }
  })

  if (app.isPackaged) {
    mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'))
  } else {
    mainWindow.loadURL(`http://${process.env.VITE_DEV_SERVER_HOST}:${process.env.VITE_DEV_SERVER_PORT}`)
    mainWindow.webContents.on('did-frame-finish-load', () => {
      useDebug(mainWindow)
    })
  }
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
