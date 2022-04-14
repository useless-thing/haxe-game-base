import { execSync } from 'child_process'
import fs from 'fs'
import { join } from 'path'
import esbuild from 'esbuild'
import { nanoid } from 'nanoid'
import { performance } from 'perf_hooks'
import ora from 'ora'

import { ASSETS, fileTree, ROOT } from '../utils'

const WEB = join(ROOT, 'out/web')

const t1 = performance.now()

const hash = nanoid(8).toLocaleLowerCase()

const spinner = ora('Building...').start()

fs.rmSync(WEB, { recursive: true })

if (fs.existsSync(join(WEB, 'dev.js'))) {
  fs.rmSync(join(WEB, 'dev.js'))
}

execSync("haxe build.web.hxml", { cwd: ROOT })

esbuild.build({
  entryPoints: [join(WEB, 'index.js')],
  minify: true,
  allowOverwrite: true,
  outfile: join(WEB, `index.${hash}.js`),
}).then(() => {
  fs.rmSync(join(WEB, 'index.js'))
})

const indexContent = fs.readFileSync(join(ASSETS, './index.html'), 'utf8')

const rewriteContent = indexContent
  .replace('index.js', `index.${hash}.js`)
  .replace('<script type="text/javascript" src="dev.js"></script>', '')

fs.writeFileSync(join(WEB, 'index.html'), rewriteContent, { encoding: 'utf-8' })

spinner.succeed('Build complete!' + ' Time: ' + (performance.now() - t1).toFixed(2) + 'ms')

console.log('\nAt', WEB, '\n')
fileTree(WEB)
console.log()