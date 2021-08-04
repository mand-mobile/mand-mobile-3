// @ts-nocheck
import WebpackBar from 'webpackbar'
import Consola from 'consola'
import chalk from 'chalk'
import {logWithSpinner} from '../utils'

export const consola = Consola.withTag('Mand Mobile')

let spinner
export default function (platform) {
  return new WebpackBar({
    name: platform,
    reporters: [{
      start (context) {
        spinner = logWithSpinner(`Compiling: ${context.state.name}`).start()
      },

      progress (context) {
        if (!context.state) {
          return
        }
        const file = context.state.request ? context.state.request.file : ''
        spinner.text = `\n${chalk.yellow.bold(context.state.progress + '%')} ${chalk.dim(file)}\n`
      },
    
      change (context, { shortPath }) {
        consola.debug(`${shortPath} changed.`, `Rebuilding ${context.state.name}`)
      },
    
      done (context) {
        setImmediate(() => {
          spinner.stop()
          const { hasError, message, name } = context.state
          consola[hasError ? 'error' : 'success'](`${name}: ${message}`)
        })
      }
    }],
  })
}