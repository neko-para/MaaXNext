import path from 'path'
import fs from 'fs'
import { format } from 'date-fns'

import { Logger, type TLogger } from '@maax/logger'

import { getAppBaseDir } from './path'

export let mainLogger: Logger
export let rendererLogger: Logger

export let logger: TLogger

function init() {
  Logger.init()

  const logDir = path.join(getAppBaseDir(), 'logs')

  const date = format(new Date(), 'yyyyMMdd')
  const filePath = path.join(logDir, `MaaX-${date}.log`)

  fs.mkdirSync(logDir, { recursive: true })
  const ws = fs.createWriteStream(filePath, { flags: 'a' })

  mainLogger = new Logger('main', ws)
  rendererLogger = new Logger('renderer', ws)
  logger = mainLogger.logger
}

init()
