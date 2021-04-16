// @ts-nocheck
import WebpackBar, {Reporter} from 'webpackbar'
import Consola from 'consola'

export const consola = Consola.withTag('Mand Mobile Next')

export default function (platform) {
  return new WebpackBar({
    name: platform,
    reporters: [{
      start (context) {
        consola.info(`Compiling ${context.state.name}`)
      },
    
      change (context, { shortPath }) {
        consola.debug(`${shortPath} changed.`, `Rebuilding ${context.state.name}`)
      },
    
      done (context) {
        const { hasError, message, name } = context.state
        consola[hasError ? 'error' : 'success'](`${name}: ${message}`)
      }
    }],
  })
}