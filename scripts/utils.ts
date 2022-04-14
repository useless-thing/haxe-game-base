import { join } from 'path'
import fs from 'fs'
import prettyBytes from 'pretty-bytes'
import chokidar from 'chokidar'

export const ROOT = join(__dirname, '..')
export const SRC = join(ROOT, 'src')
export const WEB = join(ROOT, 'out/web')
export const ASSETS = join(__dirname, 'assets')

export const HAXE_SERVER_PORT = 60000
export const DEV_SERVER_PORT = 3000
export const DEV_WEBSOCKET_PORT = 30000


export const formatTime = (t: number) => {
  return Math.floor(t) + 'ms'
}

export const startWatch = () => chokidar.watch(SRC)


type File = {
  name: string,
  size: string
}

export const fileTree = (dir: string) => {
  const files: File[] = []

  if (fs.existsSync(dir)) {
    fs.readdirSync(dir).forEach(file => {
      const stat = fs.statSync(`${dir}/${file}`)
      if (stat.isFile()) {
        files.push({
          name: file,
          size: prettyBytes(stat.size)
        })
      }
    })
  }

  const maxLen = files.reduce((max, file) => Math.max(max, file.name.length), 0)

  console.log(`${'File'.padEnd(maxLen, ' ')}    Size`)
  files.forEach(file => {
    console.log(`${file.name.padEnd(maxLen, ' ')}    ${file.size}`)
  })
  console.log('...')
}