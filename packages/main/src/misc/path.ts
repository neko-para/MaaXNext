import path from 'path'
import { app } from 'electron'

export function getAppBaseDir(): string {
  return path.join(app.getPath('appData'), app.getName())
}
