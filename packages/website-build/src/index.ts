import { Command } from 'commander'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const { name, version } = require('../package.json')

const program = new Command()

program.version(`${name} ${version}`)

program
  .command('dev')
  .description('Run dev server')
  .action(async () => {
    const { dev } = await import('./commands/dev.js')
    return dev()
  })

program
  .command('build')
  .description('Run build')
  .action(async () => {
    const { build } = await import('./commands/build.js')
    return build()
  })

program.parse()
