import fse from 'fs-extra'
import { downloadWithCheck } from 'gdl'
import { join } from 'path'

const BASE = 'https://github.com/deepnight/gameBase'

const OUT = join(__dirname, '../dump/')

const sync = async () => {
  console.log('> Sync src/')
  fse.copySync(join(OUT, 'src/'), join(__dirname, '../src/'))
  console.log('> Sync res/')
  fse.copySync(join(OUT, 'res/'), join(__dirname, '../res/'))
}

const main = async () => {
  await downloadWithCheck(BASE, OUT)

  await sync()

  console.log('> Sync done')
}


main()


