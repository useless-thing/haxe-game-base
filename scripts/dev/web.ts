import fs from 'fs'
import { join } from 'path'
import { exec, execSync, spawn } from 'child_process'
import { performance } from 'perf_hooks'
import ora from 'ora'
import ansi from 'ansi-escapes'
import { WebSocketServer } from 'ws'
import handler from 'serve-handler'
import http from 'http'

import {
  ROOT,
  startWatch,
  SRC,
  WEB,
  ASSETS,
  HAXE_SERVER_PORT,
  DEV_SERVER_PORT,
  DEV_WEBSOCKET_PORT,
  formatTime
} from '../utils'

const server = http.createServer((request, response) => {
  return handler(request, response, {
    public: WEB
  });
})

server.listen(DEV_SERVER_PORT, () => {
  console.log('Running at http://localhost:3000');
});

const wss = new WebSocketServer({
  port: DEV_WEBSOCKET_PORT
})



const buildWeb = (tag: string) => {
  const spinner = ora('building').start()
  const t1 = performance.now()
  try {
    // Build with haxe compilation server
    execSync(`haxe build.web.hxml --connect ${HAXE_SERVER_PORT}`, { cwd: ROOT })
  } catch (e) {
    console.log(e)
    spinner.fail('build failed')
  }
  spinner.succeed(tag + ' ' + formatTime(performance.now() - t1))
}

startWatch()
  .on('ready', () => {
    /** 
     * Start haxe compilation server
     * Thanks: https://stackoverflow.com/questions/41948499/haxe-how-to-speed-up-compilation-choosing-fastest-target
     * https://haxe.org/manual/cr-completion-server.html
     */
    exec(`haxe --wait ${HAXE_SERVER_PORT}`, { cwd: ROOT })

    fs.copyFileSync(join(ASSETS, './dev.js'), join(WEB, 'dev.js'))
    fs.copyFileSync(join(ASSETS, './index.html'), join(WEB, 'index.html'))
    console.log(`watching ${SRC}...`)
    buildWeb('ready in')
  })
  .on('change', () => {
    console.log(ansi.clearScreen)
    buildWeb('changed in')
    wss.clients.forEach(client => client.send('reload'))
  })