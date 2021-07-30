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

  api.registerCommand('service-lib', (args, rawArgv) => {
    const componentRoot = resolvePackagePath(projectOptions.componentPath, pkgContext)
    const distRoot = path.resolve(pkgContext, args.output || projectOptions.outputDir)

    const babelConfig = {
      presets: [
        ['@babel/preset-env', {
          // 'modules': 'umd',
          // 'targets': {
          //   'browsers': ['iOS >= 8', 'Android >= 4']
          // }
        }],
      ],
      plugins: [
        [
          path.resolve(__dirname, '../babel-plugins/babel-transform-platform'),
          { platform }
        ],
        path.resolve(__dirname, '../babel-plugins/babel-transform-memberExpression'),
      ]
    }

    const babelConfigVue = {
      ...babelConfig,
      plugins: [
        [
          path.resolve(__dirname, '../babel-plugins/babel-transform-import-style'),
          { filePath: '_FILE_PATH_', globalStyle: '_GLOBAL_STYLE_' }
        ],
        ...babelConfig.plugins
      ]
    }
  
    const stylusConfig = {
      imports: [
        resolvePackagePath('~@mand-mobile/shared/lib/style/mixin/util.styl', pkgContext),
        resolvePackagePath('~@mand-mobile/shared/lib/style/mixin/theme.components.styl', pkgContext),
        resolvePackagePath('~@mand-mobile/shared/lib/style/mixin/theme.basic.styl', pkgContext)
      ]
    }

    const postcssConfig = {
      plugins: [
        ['postcss-url', { url: 'inline' }],
        ['cssnano', {
          preset: ['default', {
            zindex: false,
            mergeIdents: false,
            discardUnused: false,
            autoprefixer: false,
            reduceIdents: false,
          }]
        }],
        args.unit === 'vw' ? ['postcss-pixel-to-viewport', {
          viewportWidth: 750,
          viewportUnit: 'vw',
          minPixelValue: 2,
        }] : ''
      ]
    }

    const spinner = logWithSpinner(`Building LIB for Platform: ${platform}...`).start()

    const files = filterPlatformedFiles(
      find.fileSync(componentRoot),
      platform,
      platformList,
      file => {
        return !new RegExp(`^${componentRoot}\/.*(test|demo)\/.*$`).test(file)
          && !new RegExp(`^${componentRoot}\/.*(component)\.js$`).test(file)
          && path.extname(file) !== '.md'
      }
    )

    fs.emptyDirSync(distRoot)

    let all = files.length
    const worker = new Worker(path.resolve(__dirname, '../worker/vueify-filepipe.js'), {
      workerData: JSON.stringify({
        pkgContext,
        files,
        componentRoot,
        distRoot,
        babelConfig,
        babelConfigVue,
        stylusConfig,
        postcssConfig
      })
    })
    worker.on('message', data => {
      const {completed, file} = data
      if (completed === all) {
        return spinner.succeed(`Building LIB Completed! Checkout output at: ${chalk.dim(distRoot)}`)
      }
      spinner.text = `\n${chalk.yellow.bold((completed * 100/all).toFixed(0) + '%')} ${chalk.dim(file)}\n`
    })
    worker.on('error', (err: any) => {
      spinner.fail(`Building LIB Failed! ${err.message}`)
      error(JSON.stringify(err.info))
      process.exit(1)
    })
  })
}