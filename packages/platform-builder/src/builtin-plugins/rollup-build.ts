import * as path from 'path'
import {rollup} from 'rollup'
import type {ModuleFormat} from 'rollup'

import {
  logWithSpinner,
  chalk,
  error
} from '../utils'

export default function (api, options) {
  const {context, platform, pkgContext, projectDir, projectOptions} = options

  api.registerCommand('service-bundle', async (args, rawArgv) => {
    const componentRoot = `${pkgContext}/${projectDir}`
    const distRoot = path.resolve(pkgContext, args.output || projectOptions.outputDir)
    const spinner = logWithSpinner(`Building BUNDLE for Platform: ${platform}...`).start()
    try {
      const builder = await rollup({
        ...projectOptions.rollupOptions,
        input: `${componentRoot}/index.js`,
      })
      await Promise.all((['umd', 'esm'] as ModuleFormat[]).map(module => {
        return builder.write({
          ...projectOptions.rollupOptions.output,
          file: path.resolve(distRoot, `mand-mobile.${module}.js`),
          format: module,
        })
      }))
      spinner.succeed(`Building BUNDLE Completed! Checkout output at: ${chalk.dim(distRoot)}`)
    } catch (err) {
      spinner.fail(`Building BUNDLE Failed! ${err.message}`)
      error(JSON.stringify(err.info))
      process.exit(1)
    }
  })
}