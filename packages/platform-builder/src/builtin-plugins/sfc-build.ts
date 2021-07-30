import * as path from 'path'
import * as find from 'find'
import fs from 'fs-extra'
import _ from 'lodash/fp'
import {Worker} from 'worker_threads'

import {
  resolvePackagePath,
  filterPlatformedFiles,
  logWithSpinner,
  chalk,
  error
} from '../utils'

export default function (api, options) {
  const {projectOptions, pkgContext, platform, platformList} = options

  api.registerCommand('service-sfc', (args, rawArgv) => {
    const componentRoot = resolvePackagePath(projectOptions.componentPath, pkgContext)
    const distRoot = path.resolve(pkgContext, args.output || projectOptions.outputDir)

    const babelConfig = {
      plugins: [
        [
          path.resolve(__dirname, '../babel-plugins/babel-transform-platform'),
          { platform }
        ],
        path.resolve(__dirname, '../babel-plugins/babel-transform-memberExpression'),
      ]
    }
  
    const stylusConfig = {
      imports: [
        resolvePackagePath('~@mand-mobile/shared/lib/style/mixin/util.styl', pkgContext),
        resolvePackagePath('~@mand-mobile/shared/lib/style/mixin/theme.components.styl', pkgContext),
        resolvePackagePath('~@mand-mobile/shared/lib/style/mixin/theme.basic.styl', pkgContext)
      ],
      transformCss: args.transformCss
    }

    const spinner = logWithSpinner(`Building SFC for Platform: ${platform}...`).start()

    const files = filterPlatformedFiles(
      find.fileSync(componentRoot),
      platform,
      platformList,
      file => {
        return !new RegExp(`^${componentRoot}\/.*(test|demo)\/.*$`).test(file)
          && path.extname(file) !== '.md'
      }
    )

    fs.emptyDirSync(distRoot)

    let all = files.length

    const worker = new Worker(path.resolve(__dirname, '../worker/sfc-filepipe.js'), {
      workerData: JSON.stringify({
        files,
        componentRoot,
        distRoot,
        babelConfig,
        stylusConfig
      })
    })
    worker.on('message', data => {
      const {completed, file} = data
      if (completed === all) {
        return spinner.succeed(`Building SFC Completed! Checkout output at: ${chalk.dim(distRoot)}`)
      }
      spinner.text = `\n${chalk.yellow.bold((completed * 100/all).toFixed(0) + '%')} ${chalk.dim(file)}`
    })
    worker.on('error', (err: any) => {
      spinner.fail(`Building SFC Failed! ${err.message}`)
      error(JSON.stringify(err.info))
      process.exit(1)
    })
  })
}